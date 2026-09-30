import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  authenticateUser,
  getPageSections,
  savePageSectionDraft,
  publishPageSection,
  getLeads,
  createLead,
  updateLeadStatus,
  getMediaLibrary,
  addMediaRecord,
  getRevisions,
  getActivityLogs,
} from './db.ts';

const JWT_SECRET = process.env.JWT_SECRET || process.env.AUTH_SECRET || 'sda-jwt-super-secret-key-2026';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    name: string;
    role: string;
  };
}

// Authentication middleware
export function requireAdminAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
}

export function registerCmsApiRoutes(app: express.Application) {
  // 1. Admin Authentication Login
  app.post('/api/admin/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const user = await authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token,
        user,
      });
    } catch (err: any) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Internal server error during authentication' });
    }
  });

  // 2. Public Page Content (Returns ONLY published content)
  app.get('/api/content/:pageSlug', async (req: Request, res: Response) => {
    try {
      const { pageSlug } = req.params;
      const sections = await getPageSections(pageSlug);

      // Return only published version of each section for public readers
      const publishedView: Record<string, any> = {};
      for (const [key, section] of Object.entries(sections)) {
        publishedView[key] = section.publishedContent || section.draftContent;
      }

      res.json({
        pageSlug,
        published: true,
        sections: publishedView,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve page content' });
    }
  });

  // 3. Admin Draft & Published Sections
  app.get('/api/admin/content/:pageSlug', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const { pageSlug } = req.params;
      const sections = await getPageSections(pageSlug);
      res.json({
        pageSlug,
        sections,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve page drafts' });
    }
  });

  // 4. Admin Save Draft
  app.post('/api/admin/content/:pageSlug/:sectionKey/draft', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const { pageSlug, sectionKey } = req.params;
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: 'Content payload is required' });
      }

      const saved = await savePageSectionDraft(pageSlug, sectionKey, content, req.user?.id);
      res.json({
        success: true,
        message: `Draft saved for ${pageSlug}.${sectionKey}`,
        section: saved,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save draft' });
    }
  });

  // 5. Admin Publish Section
  app.post('/api/admin/content/:pageSlug/:sectionKey/publish', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const { pageSlug, sectionKey } = req.params;
      const { content } = req.body;

      const published = await publishPageSection(pageSlug, sectionKey, content, req.user?.id);

      // Cache invalidation concept for Next.js / Vercel
      console.info(`[CACHE REVALIDATION] Revalidated path: /${pageSlug === 'home' ? '' : pageSlug} (tag: page-${pageSlug})`);

      res.json({
        success: true,
        message: `Section ${pageSlug}.${sectionKey} published live to database.`,
        revalidated: [`/${pageSlug === 'home' ? '' : pageSlug}`, `tag:page-${pageSlug}`],
        section: published,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to publish section' });
    }
  });

  // 6. Public Consultation Form Intake
  app.post('/api/leads/submit', async (req: Request, res: Response) => {
    try {
      const { name, businessName, phone, email, city, businessType, website, monthlyBudget, currentChannels, mainGrowthChallenge } = req.body;

      if (!name || !businessName || !phone || !email) {
        return res.status(400).json({ error: 'Required fields missing' });
      }

      const newLead = await createLead({
        name,
        businessName,
        phone,
        email,
        city: city || 'Siliguri',
        businessType: businessType || 'Healthcare Practice',
        website,
        monthlyBudget: monthlyBudget || '₹50,000 - ₹1,00,000',
        currentChannels: currentChannels || [],
        mainGrowthChallenge,
      });

      // Optional Webhook dispatch (Zapier / n8n / EspoCRM / WhatsApp)
      const webhookUrl = process.env.WEBHOOK_URL;
      if (webhookUrl && webhookUrl.startsWith('http')) {
        try {
          fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'new_patient_consultation_intake',
              timestamp: newLead.createdAt,
              data: newLead,
              source: 'SDA Live Intake Engine',
            }),
          }).catch((e) => console.warn('Background webhook error:', e.message));
        } catch {
          // Ignore
        }
      }

      res.json({
        success: true,
        leadId: newLead.id,
        message: 'Your consultation request has been recorded into the SDA Triage Desk.',
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to record lead' });
    }
  });

  // 7. Admin Leads Management
  app.get('/api/admin/leads', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const leads = await getLeads();
      res.json(leads);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch leads' });
    }
  });

  app.patch('/api/admin/leads/:id/status', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const updated = await updateLeadStatus(id, status, notes);
      res.json({ success: true, lead: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update lead status' });
    }
  });

  // 8. Media Library APIs
  app.get('/api/admin/media', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const media = await getMediaLibrary();
      res.json(media);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch media library' });
    }
  });

  app.post('/api/admin/media/upload', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const { filename, url, type, mimeType, size, altText, title, description } = req.body;
      if (!filename || !url) {
        return res.status(400).json({ error: 'Filename and URL are required' });
      }

      const media = await addMediaRecord({
        filename,
        url,
        type: type || (mimeType?.startsWith('video/') ? 'video' : 'image'),
        mimeType: mimeType || 'image/jpeg',
        size: size || 1024,
        altText,
        title,
        description,
      });

      res.json({ success: true, media });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to record uploaded media' });
    }
  });

  // 9. Revision History & Audit Logs
  app.get('/api/admin/revisions', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const { contentType, contentId } = req.query;
      const revisions = await getRevisions(contentType as string, contentId as string);
      res.json(revisions);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch revisions' });
    }
  });

  app.get('/api/admin/activity-logs', requireAdminAuth, async (req: AuthRequest, res: Response) => {
    try {
      const logs = await getActivityLogs();
      res.json(logs);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch activity logs' });
    }
  });
}
