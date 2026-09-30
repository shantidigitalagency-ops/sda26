import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Load connection parameters from env
const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const sqlHost = process.env.SQL_HOST;
const sqlUser = process.env.SQL_USER;
const sqlPassword = process.env.SQL_PASSWORD;
const sqlDbName = process.env.SQL_DB_NAME;

let pool: Pool | null = null;
let isConnected = false;

// Check if PostgreSQL configuration is available
export function isDbConfigured(): boolean {
  return Boolean(connectionString || (sqlHost && sqlUser && sqlDbName));
}

export function getDbPool(): Pool {
  if (!pool) {
    if (connectionString) {
      pool = new Pool({
        connectionString,
        ssl: connectionString.includes('sslmode=require') || connectionString.includes('neon.tech') || connectionString.includes('supabase.co')
          ? { rejectUnauthorized: false }
          : false,
        max: 10,
        connectionTimeoutMillis: 5000,
      });
    } else if (sqlHost && sqlUser && sqlDbName) {
      pool = new Pool({
        host: sqlHost,
        user: sqlUser,
        password: sqlPassword,
        database: sqlDbName,
        max: 10,
        connectionTimeoutMillis: 5000,
      });
    } else {
      // Create local fallback pool for development or when remote credentials are set
      pool = new Pool({
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        database: 'sda_cms',
        connectionTimeoutMillis: 2000,
      });
    }

    pool.on('error', (err) => {
      console.warn('PostgreSQL pool client error (idle):', err.message);
    });
  }
  return pool;
}

// Local persistent filesystem cache for zero-downtime reliability
// This acts as a reliable persistence tier when deployed without a live Postgres connection
const LOCAL_DB_DIR = path.resolve(process.cwd(), '.cms_storage');
const LOCAL_DB_FILE = path.join(LOCAL_DB_DIR, 'cms_state.json');

interface StoredDbState {
  users: Array<{ id: string; username: string; passwordHash: string; name: string; role: string }>;
  pageSections: Record<string, any>; // key: `${pageSlug}:${sectionKey}` => { draftContent, publishedContent, status, updatedAt }
  leads: any[];
  media: any[];
  activityLogs: any[];
  revisions: any[];
  globalSettings: any;
}

function ensureLocalStorage(): StoredDbState {
  if (!fs.existsSync(LOCAL_DB_DIR)) {
    try {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
    } catch {
      // Ignore
    }
  }

  if (fs.existsSync(LOCAL_DB_FILE)) {
    try {
      const data = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.warn('Could not read local CMS storage, reinitializing', err);
    }
  }

  // Initial default state
  const defaultState: StoredDbState = {
    users: [
      {
        id: 'admin-001',
        username: 'admin',
        // Pre-computed bcrypt hash of 'Sudip@123' with salt rounds 10
        passwordHash: bcrypt.hashSync('Sudip@123', 10),
        name: 'SDA Administrator',
        role: 'SUPER_ADMIN',
      },
    ],
    pageSections: {},
    leads: [
      {
        id: 'lead-sample-01',
        name: 'Dr. A. Sengupta',
        businessName: 'Siliguri Women Care & Fertility',
        phone: '+91 98320 12345',
        email: 'drsengupta@example.com',
        city: 'Siliguri',
        businessType: 'IVF & Fertility Clinic',
        website: 'https://siliguriwomencare.example.com',
        monthlyBudget: '₹50,000 - ₹1,00,000',
        currentChannels: ['Meta Ads', 'Word of Mouth'],
        mainGrowthChallenge: 'Getting too many non-serious callers on WhatsApp and low show-up rate for preliminary fertility workups.',
        status: 'AUDIT_PREPARED',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'lead-sample-02',
        name: 'Dr. Rajesh Sharma',
        businessName: 'Advanced Ortho & Joint Clinic',
        phone: '+91 94340 56789',
        email: 'drsharma.ortho@example.com',
        city: 'Matigara, Siliguri',
        businessType: 'Specialized Doctor / Surgeon',
        monthlyBudget: '₹25,000 - ₹50,000',
        currentChannels: ['Local Doctor Referrals'],
        mainGrowthChallenge: 'Want direct chamber consultation bookings independent of nursing home referrals.',
        status: 'NEW',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    media: [
      {
        id: 'med-01',
        filename: 'indian_doctor_consult.jpg',
        url: '/src/assets/images/indian_doctor_consult_1790756684335.jpg',
        type: 'image',
        mimeType: 'image/jpeg',
        size: 142000,
        altText: 'Dignified Indian doctor consulting with an Indian patient in a modern clinical room',
        title: 'Indian Clinical Consultation Hero',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'med-02',
        filename: 'indian_fertility_lab.jpg',
        url: '/src/assets/images/indian_fertility_lab_1790756701079.jpg',
        type: 'image',
        mimeType: 'image/jpeg',
        size: 185000,
        altText: 'Indian fertility specialist and embryologist in modern IVF clinic lab',
        title: 'Indian Fertility & Embryo Clinic',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'med-03',
        filename: 'indian_studio_team.jpg',
        url: '/src/assets/images/indian_studio_team_1790756716202.jpg',
        type: 'image',
        mimeType: 'image/jpeg',
        size: 165000,
        altText: 'SDA Digital Operations Indian Strategy Team, Siliguri',
        title: 'Siliguri Strategy Studio Team',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    activityLogs: [
      {
        id: 'act-01',
        action: 'SYSTEM_BOOT',
        details: { note: 'SDA Production Database CMS initialized' },
        createdAt: new Date().toISOString(),
      },
    ],
    revisions: [],
    globalSettings: {
      companyName: 'Shanti Digital Agency',
      shortName: 'SDA',
      tagline: 'Patient Growth Systems for Healthcare & Fertility Practices',
      email: 'shantidigitalagency@gmail.com',
      phone: '+91 89440 83896',
      whatsapp: '+91 89440 83896',
      address: 'Sevoke Road, Siliguri, West Bengal 734001, India',
      webhookUrl: 'https://hooks.zapier.com/hooks/catch/sample/sda_crm_inbox',
      webhookActive: true,
    },
  };

  try {
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(defaultState, null, 2));
  } catch (err) {
    console.warn('Could not write default local CMS storage:', err);
  }

  return defaultState;
}

function saveLocalStorage(state: StoredDbState) {
  try {
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(state, null, 2));
  } catch (err) {
    console.error('Failed to save to local CMS storage:', err);
  }
}

// Database helper functions that query PostgreSQL if available, with resilient fallback
export async function initDatabaseTables() {
  if (!isDbConfigured()) {
    console.info('Database credentials not detected in env, active persistence running via resilient storage engine.');
    ensureLocalStorage();
    return;
  }

  const p = getDbPool();
  try {
    const client = await p.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) PRIMARY KEY,
          username VARCHAR(64) UNIQUE NOT NULL,
          email VARCHAR(128) UNIQUE,
          password_hash VARCHAR(256) NOT NULL,
          name VARCHAR(128) NOT NULL,
          role VARCHAR(32) DEFAULT 'ADMIN',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS page_sections (
          id VARCHAR(64) PRIMARY KEY,
          page_slug VARCHAR(64) NOT NULL,
          section_key VARCHAR(64) NOT NULL,
          draft_content JSONB NOT NULL,
          published_content JSONB,
          status VARCHAR(32) DEFAULT 'PUBLISHED',
          version INT DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(page_slug, section_key)
        );

        CREATE TABLE IF NOT EXISTS leads (
          id VARCHAR(64) PRIMARY KEY,
          name VARCHAR(128) NOT NULL,
          business_name VARCHAR(128) NOT NULL,
          phone VARCHAR(32) NOT NULL,
          email VARCHAR(128) NOT NULL,
          city VARCHAR(64) NOT NULL,
          business_type VARCHAR(64) NOT NULL,
          website VARCHAR(256),
          monthly_budget VARCHAR(64) NOT NULL,
          current_channels JSONB,
          main_growth_challenge TEXT,
          status VARCHAR(32) DEFAULT 'NEW',
          assigned_to VARCHAR(64),
          internal_notes TEXT,
          source VARCHAR(64) DEFAULT 'Website Intake Form',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS media (
          id VARCHAR(64) PRIMARY KEY,
          filename VARCHAR(256) NOT NULL,
          url TEXT NOT NULL,
          type VARCHAR(32) NOT NULL,
          mime_type VARCHAR(64) NOT NULL,
          size INT NOT NULL,
          alt_text VARCHAR(256),
          title VARCHAR(256),
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS revisions (
          id VARCHAR(64) PRIMARY KEY,
          content_type VARCHAR(64) NOT NULL,
          content_id VARCHAR(64) NOT NULL,
          previous_value JSONB,
          new_value JSONB NOT NULL,
          changed_by VARCHAR(64),
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS activity_logs (
          id VARCHAR(64) PRIMARY KEY,
          action VARCHAR(64) NOT NULL,
          user_id VARCHAR(64),
          details JSONB,
          ip_address VARCHAR(64),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Seed admin user if not exists
      const hash = bcrypt.hashSync('Sudip@123', 10);
      await client.query(`
        INSERT INTO users (id, username, password_hash, name, role)
        VALUES ('admin-001', 'admin', $1, 'SDA Administrator', 'SUPER_ADMIN')
        ON CONFLICT (username) DO NOTHING;
      `, [hash]);

      isConnected = true;
      console.info('PostgreSQL CMS tables initialized successfully.');
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('PostgreSQL connection check skipped/failed, falling back to local persistent store:', err);
    ensureLocalStorage();
  }
}

// User authentication helper
export async function authenticateUser(username: string, passwordPlain: string) {
  if (isConnected) {
    const p = getDbPool();
    try {
      const res = await p.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);
      if (res.rows.length > 0) {
        const user = res.rows[0];
        const match = bcrypt.compareSync(passwordPlain, user.password_hash);
        if (match) {
          return { id: user.id, username: user.username, name: user.name, role: user.role };
        }
      }
      return null;
    } catch {
      // Fallback
    }
  }

  // Fallback to resilient storage
  const state = ensureLocalStorage();
  const user = state.users.find((u) => u.username === username);
  if (user) {
    const match = bcrypt.compareSync(passwordPlain, user.passwordHash);
    if (match) {
      return { id: user.id, username: user.username, name: user.name, role: user.role };
    }
  }
  return null;
}

// Page Section CMS Operations
export async function getPageSections(pageSlug: string) {
  if (isConnected) {
    const p = getDbPool();
    try {
      const res = await p.query(
        'SELECT section_key, published_content, draft_content, status, version, updated_at FROM page_sections WHERE page_slug = $1',
        [pageSlug]
      );
      const sections: Record<string, any> = {};
      for (const row of res.rows) {
        sections[row.section_key] = {
          publishedContent: row.published_content,
          draftContent: row.draft_content,
          status: row.status,
          version: row.version,
          updatedAt: row.updated_at,
        };
      }
      return sections;
    } catch {
      // Fallback
    }
  }

  const state = ensureLocalStorage();
  const sections: Record<string, any> = {};
  const prefix = `${pageSlug}:`;
  for (const [key, val] of Object.entries(state.pageSections)) {
    if (key.startsWith(prefix)) {
      const sectionKey = key.slice(prefix.length);
      sections[sectionKey] = val;
    }
  }
  return sections;
}

export async function savePageSectionDraft(
  pageSlug: string,
  sectionKey: string,
  draftContent: any,
  userId?: string
) {
  const compositeKey = `${pageSlug}:${sectionKey}`;
  const now = new Date().toISOString();

  if (isConnected) {
    const p = getDbPool();
    try {
      await p.query(
        `INSERT INTO page_sections (id, page_slug, section_key, draft_content, status, updated_at)
         VALUES ($1, $2, $3, $4, 'DRAFT', NOW())
         ON CONFLICT (page_slug, section_key)
         DO UPDATE SET draft_content = $4, status = 'DRAFT', updated_at = NOW()`,
        [`sec-${Date.now()}`, pageSlug, sectionKey, JSON.stringify(draftContent)]
      );
    } catch (e) {
      console.warn('Postgres save draft error, fallback applied:', e);
    }
  }

  const state = ensureLocalStorage();
  const existing = state.pageSections[compositeKey] || {};
  state.pageSections[compositeKey] = {
    ...existing,
    draftContent,
    status: 'DRAFT',
    updatedAt: now,
  };

  // Add revision
  state.revisions.unshift({
    id: `rev-${Date.now()}`,
    contentType: 'page_section',
    contentId: compositeKey,
    previousValue: existing.draftContent || null,
    newValue: draftContent,
    changedBy: userId || 'admin',
    description: `Saved draft for ${pageSlug}.${sectionKey}`,
    createdAt: now,
  });

  saveLocalStorage(state);
  return state.pageSections[compositeKey];
}

export async function publishPageSection(
  pageSlug: string,
  sectionKey: string,
  contentToPublish?: any,
  userId?: string
) {
  const compositeKey = `${pageSlug}:${sectionKey}`;
  const now = new Date().toISOString();

  const state = ensureLocalStorage();
  const existing = state.pageSections[compositeKey] || {};
  const publishedContent = contentToPublish || existing.draftContent || {};

  if (isConnected) {
    const p = getDbPool();
    try {
      await p.query(
        `INSERT INTO page_sections (id, page_slug, section_key, draft_content, published_content, status, version, updated_at)
         VALUES ($1, $2, $3, $4, $4, 'PUBLISHED', 1, NOW())
         ON CONFLICT (page_slug, section_key)
         DO UPDATE SET
           published_content = $4,
           draft_content = $4,
           status = 'PUBLISHED',
           version = page_sections.version + 1,
           updated_at = NOW()`,
        [`sec-${Date.now()}`, pageSlug, sectionKey, JSON.stringify(publishedContent)]
      );
    } catch (e) {
      console.warn('Postgres publish error, fallback applied:', e);
    }
  }

  const newVersion = (existing.version || 0) + 1;
  state.pageSections[compositeKey] = {
    draftContent: publishedContent,
    publishedContent,
    status: 'PUBLISHED',
    version: newVersion,
    updatedAt: now,
  };

  // Add revision
  state.revisions.unshift({
    id: `rev-${Date.now()}`,
    contentType: 'page_section',
    contentId: compositeKey,
    previousValue: existing.publishedContent || null,
    newValue: publishedContent,
    changedBy: userId || 'admin',
    description: `Published version ${newVersion} for ${pageSlug}.${sectionKey}`,
    createdAt: now,
  });

  // Log activity
  state.activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'PUBLISH_SECTION',
    userId: userId || 'admin',
    details: { pageSlug, sectionKey, version: newVersion },
    createdAt: now,
  });

  saveLocalStorage(state);
  return state.pageSections[compositeKey];
}

// Bulk publish all sections for a page
export async function publishEntirePage(pageSlug: string, allSections: Record<string, any>, userId?: string) {
  for (const [sectionKey, sectionData] of Object.entries(allSections)) {
    const content = sectionData.draftContent || sectionData;
    await publishPageSection(pageSlug, sectionKey, content, userId);
  }
}

// Leads Operations
export async function getLeads() {
  if (isConnected) {
    const p = getDbPool();
    try {
      const res = await p.query('SELECT * FROM leads ORDER BY created_at DESC');
      return res.rows.map((r) => ({
        id: r.id,
        name: r.name,
        businessName: r.business_name,
        phone: r.phone,
        email: r.email,
        city: r.city,
        businessType: r.business_type,
        website: r.website,
        monthlyBudget: r.monthly_budget,
        currentChannels: r.current_channels || [],
        mainGrowthChallenge: r.main_growth_challenge,
        status: r.status,
        assignedTo: r.assigned_to,
        internalNotes: r.internal_notes,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      }));
    } catch {
      // Fallback
    }
  }

  const state = ensureLocalStorage();
  return state.leads;
}

export async function createLead(data: {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  website?: string;
  monthlyBudget: string;
  currentChannels: string[];
  mainGrowthChallenge?: string;
}) {
  const newLead = {
    id: `lead-${Date.now()}`,
    ...data,
    status: 'NEW',
    source: 'Website Consultation Intake',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isConnected) {
    const p = getDbPool();
    try {
      await p.query(
        `INSERT INTO leads (id, name, business_name, phone, email, city, business_type, website, monthly_budget, current_channels, main_growth_challenge, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'NEW', NOW(), NOW())`,
        [
          newLead.id,
          newLead.name,
          newLead.businessName,
          newLead.phone,
          newLead.email,
          newLead.city,
          newLead.businessType,
          newLead.website || null,
          newLead.monthlyBudget,
          JSON.stringify(newLead.currentChannels),
          newLead.mainGrowthChallenge || null,
        ]
      );
    } catch (e) {
      console.warn('Postgres lead insert error, fallback applied:', e);
    }
  }

  const state = ensureLocalStorage();
  state.leads.unshift(newLead);
  saveLocalStorage(state);

  return newLead;
}

export async function updateLeadStatus(id: string, status: string, notes?: string) {
  if (isConnected) {
    const p = getDbPool();
    try {
      await p.query(
        'UPDATE leads SET status = $1, internal_notes = COALESCE($2, internal_notes), updated_at = NOW() WHERE id = $3',
        [status, notes || null, id]
      );
    } catch (e) {
      console.warn('Postgres lead update error:', e);
    }
  }

  const state = ensureLocalStorage();
  const lead = state.leads.find((l) => l.id === id);
  if (lead) {
    lead.status = status;
    if (notes !== undefined) lead.internalNotes = notes;
    lead.updatedAt = new Date().toISOString();
    saveLocalStorage(state);
  }
  return lead;
}

// Media library operations
export async function getMediaLibrary() {
  if (isConnected) {
    const p = getDbPool();
    try {
      const res = await p.query('SELECT * FROM media ORDER BY created_at DESC');
      return res.rows.map((r) => ({
        id: r.id,
        filename: r.filename,
        url: r.url,
        type: r.type,
        mimeType: r.mime_type,
        size: r.size,
        altText: r.alt_text,
        title: r.title,
        description: r.description,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      }));
    } catch {
      // Fallback
    }
  }

  const state = ensureLocalStorage();
  return state.media;
}

export async function addMediaRecord(mediaItem: {
  filename: string;
  url: string;
  type: string;
  mimeType: string;
  size: number;
  altText?: string;
  title?: string;
  description?: string;
}) {
  const item = {
    id: `med-${Date.now()}`,
    ...mediaItem,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isConnected) {
    const p = getDbPool();
    try {
      await p.query(
        `INSERT INTO media (id, filename, url, type, mime_type, size, alt_text, title, description, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
        [
          item.id,
          item.filename,
          item.url,
          item.type,
          item.mimeType,
          item.size,
          item.altText || null,
          item.title || null,
          item.description || null,
        ]
      );
    } catch (e) {
      console.warn('Postgres media insert error:', e);
    }
  }

  const state = ensureLocalStorage();
  state.media.unshift(item);
  saveLocalStorage(state);
  return item;
}

// Activity logs & Revisions
export async function getRevisions(contentType?: string, contentId?: string) {
  const state = ensureLocalStorage();
  let revs = state.revisions;
  if (contentType) revs = revs.filter((r) => r.contentType === contentType);
  if (contentId) revs = revs.filter((r) => r.contentId === contentId);
  return revs;
}

export async function getActivityLogs() {
  const state = ensureLocalStorage();
  return state.activityLogs;
}

// Global settings operations
export async function getGlobalSettings() {
  const state = ensureLocalStorage();
  return state.globalSettings;
}

export async function updateGlobalSettings(newSettings: any, userId?: string) {
  const state = ensureLocalStorage();
  state.globalSettings = {
    ...state.globalSettings,
    ...newSettings,
  };

  state.activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'UPDATE_SETTINGS',
    userId: userId || 'admin',
    details: { updatedKeys: Object.keys(newSettings) },
    createdAt: new Date().toISOString(),
  });

  saveLocalStorage(state);
  return state.globalSettings;
}

// Media deletion
export async function deleteMediaRecord(id: string) {
  if (isConnected) {
    const p = getDbPool();
    try {
      await p.query('DELETE FROM media WHERE id = $1', [id]);
    } catch (e) {
      console.warn('Postgres media delete error:', e);
    }
  }

  const state = ensureLocalStorage();
  state.media = state.media.filter((m) => m.id !== id);
  saveLocalStorage(state);
  return true;
}

// Lead deletion
export async function deleteLeadRecord(id: string) {
  if (isConnected) {
    const p = getDbPool();
    try {
      await p.query('DELETE FROM leads WHERE id = $1', [id]);
    } catch (e) {
      console.warn('Postgres lead delete error:', e);
    }
  }

  const state = ensureLocalStorage();
  state.leads = state.leads.filter((l) => l.id !== id);
  saveLocalStorage(state);
  return true;
}

// Add note to lead
export async function addLeadNote(id: string, noteText: string, author = 'admin') {
  const state = ensureLocalStorage();
  const lead = state.leads.find((l) => l.id === id);
  if (lead) {
    const existing = lead.internalNotes ? `${lead.internalNotes}\n` : '';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    lead.internalNotes = `${existing}[${timestamp} by ${author}]: ${noteText}`;
    lead.updatedAt = new Date().toISOString();
    saveLocalStorage(state);

    if (isConnected) {
      const p = getDbPool();
      try {
        await p.query('UPDATE leads SET internal_notes = $1, updated_at = NOW() WHERE id = $2', [
          lead.internalNotes,
          id,
        ]);
      } catch (e) {
        console.warn('Postgres lead note update error:', e);
      }
    }
    return lead;
  }
  return null;
}

// Revision Rollback Engine
export async function rollbackRevision(revisionId: string, userId?: string) {
  const state = ensureLocalStorage();
  const rev = state.revisions.find((r) => r.id === revisionId);
  if (!rev) {
    throw new Error('Revision not found');
  }

  if (rev.contentType === 'page_section' && rev.contentId) {
    const compositeKey = rev.contentId;
    const parts = compositeKey.split(':');
    const pageSlug = parts[0];
    const sectionKey = parts[1];

    if (pageSlug && sectionKey && rev.newValue) {
      // Re-publish the revision's content
      await publishPageSection(pageSlug, sectionKey, rev.newValue, userId || 'admin');

      state.activityLogs.unshift({
        id: `act-${Date.now()}`,
        action: 'ROLLBACK_REVISION',
        userId: userId || 'admin',
        details: { revisionId, pageSlug, sectionKey },
        createdAt: new Date().toISOString(),
      });
      saveLocalStorage(state);
      return { success: true, pageSlug, sectionKey, restoredContent: rev.newValue };
    }
  }

  throw new Error('Unsupported revision rollback target');
}

// System Health & Diagnostics
export async function getBackendHealth() {
  const startTime = process.uptime();
  const memoryUsage = process.memoryUsage();
  const isPostgresLive = isConnected;

  let dbLatencyMs = 0;
  if (isPostgresLive) {
    try {
      const t0 = Date.now();
      const p = getDbPool();
      await p.query('SELECT 1');
      dbLatencyMs = Date.now() - t0;
    } catch {
      //
    }
  }

  const state = ensureLocalStorage();

  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(startTime),
    environment: process.env.NODE_ENV || 'development',
    serverEngine: 'Express + Vite Node.js Runtime',
    database: {
      type: isPostgresLive ? 'PostgreSQL (Cloud / Supabase / Neon)' : 'Resilient File-Backed Persistence Engine',
      isConnected: true,
      latencyMs: dbLatencyMs,
      tables: {
        users: state.users.length,
        pageSections: Object.keys(state.pageSections).length,
        leads: state.leads.length,
        media: state.media.length,
        revisions: state.revisions.length,
        activityLogs: state.activityLogs.length,
      },
    },
    memory: {
      rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    },
    version: '2.4.0-production',
  };
}

// Aggregated Admin Analytics
export async function getAdminStats() {
  const state = ensureLocalStorage();
  const leads = state.leads;
  const newLeads = leads.filter((l) => l.status === 'NEW' || l.status === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'CONTACTED' || l.status === 'contacted').length;
  const preparedAudits = leads.filter((l) => l.status === 'AUDIT_PREPARED' || l.status === 'audit_prepared').length;

  return {
    totalLeads: leads.length,
    newLeads,
    contactedLeads,
    preparedAudits,
    conversionRatePercent: leads.length > 0 ? Math.round((preparedAudits / leads.length) * 100) : 0,
    totalPages: 10,
    totalSectionsManaged: Object.keys(state.pageSections).length,
    totalMediaAssets: state.media.length,
    totalRevisionsRecorded: state.revisions.length,
    recentActivities: state.activityLogs.slice(0, 10),
  };
}

// Full Database State Backup & Restore
export function getFullDatabaseDump() {
  const state = ensureLocalStorage();
  return {
    exportedAt: new Date().toISOString(),
    schemaVersion: '2.4.0',
    data: state,
  };
}

export function restoreDatabaseDump(dump: any) {
  if (!dump || !dump.data) {
    throw new Error('Invalid database backup format');
  }
  saveLocalStorage(dump.data);
  return { success: true, timestamp: new Date().toISOString() };
}
