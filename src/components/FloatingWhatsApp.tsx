import React, { useState } from 'react';

export const SDA_PHONE_NUMBER = '8944083896';
export const SDA_PHONE_DISPLAY = '+91 89440 83896';
export const SDA_WHATSAPP_LINK = `https://wa.me/918944083896?text=${encodeURIComponent(
  'Hello Shanti Digital Agency, I would like to inquire about the Patient Growth System for my healthcare/fertility practice.'
)}`;

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expandable Quick Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm">
                  SDA
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Shanti Digital Agency</h4>
                <p className="text-[11px] text-emerald-100">Healthcare Growth Desk · Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
              aria-label="Close chat bubble"
            >
              ✕
            </button>
          </div>

          <div className="p-4 bg-neutral-50 text-xs space-y-3">
            <div className="bg-white p-3 rounded-xl border border-neutral-200 text-neutral-800 shadow-xs">
              <p className="leading-relaxed">
                Hello doctor or clinic director! 👋 How can we help scale your patient consultations and fertility inquiries?
              </p>
              <span className="text-[10px] text-neutral-400 block text-right mt-1">Available now</span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href={SDA_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-xl text-xs transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                </svg>
                <span>Chat on WhatsApp ({SDA_PHONE_DISPLAY})</span>
              </a>

              <a
                href={`tel:${SDA_PHONE_NUMBER}`}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 font-medium rounded-xl text-xs transition-colors"
              >
                <span>Call Director: {SDA_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="flex items-center gap-2">
        <a
          href={SDA_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 group active:scale-95 border border-white/20"
          aria-label="Direct WhatsApp chat with Shanti Digital Agency"
        >
          {/* WhatsApp SVG Icon */}
          <div className="relative">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100 leading-none">
              WhatsApp
            </span>
            <span className="text-xs font-extrabold tracking-tight leading-tight">
              {SDA_PHONE_DISPLAY}
            </span>
          </div>
        </a>

        {/* Toggle details popover button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-900 hover:bg-neutral-800 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          title="Toggle Consultation Options"
          aria-label="Toggle consultation options"
        >
          {isOpen ? '✕' : '?'}
        </button>
      </div>
    </div>
  );
};
