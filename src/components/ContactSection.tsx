import React, { useState } from 'react';
import { Language, SaccoContactInfo } from '../types';
import { SACCO_INFO } from '../data/saccoData';
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Edit2,
} from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';

interface ContactSectionProps {
  currentLang: Language;
  saccoInfo?: SaccoContactInfo;
  isAdmin?: boolean;
  onOpenAdminConsole?: (tab?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  saccoInfo = SACCO_INFO,
  isAdmin = false,
  onOpenAdminConsole,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(saccoInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(saccoInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !contactNumber || !message) return;
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name: fullName,
      phone: contactNumber,
      subject,
      message,
      date: new Date().toLocaleString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem('ubumwe_contact_inquiries') || '[]');
      localStorage.setItem('ubumwe_contact_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch {}
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFullName('');
    setContactNumber('');
    setMessage('');
    setFormSubmitted(false);
  };

  const cleanWhatsapp = saccoInfo.whatsapp.replace(/[^0-9]/g, '') || '250786422080';
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    saccoInfo.whatsappMessage ||
      (currentLang === 'en'
        ? 'Hello UBUMWE SACCO GAKENKE, I would like to inquire about cooperative services.'
        : 'Muraho UBUMWE SACCO GAKENKE, nifuzaga kubaza amakuru kuri serivisi zanyu.')
  )}`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>{currentLang === 'en' ? 'Direct Communication Desk' : 'Ibiro by\'Itumanaho n\'Ubufasha'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'en'
              ? `Contact ${saccoInfo.name}`
              : `Tuvugishe kuri ${saccoInfo.shortName}`}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {currentLang === 'en'
              ? 'Reach our customer desk, Board Directors (Wellarse, Bartazal), or Manager (Mbitsemunda Phocas) via WhatsApp, telephone, email, or direct inquiry.'
              : 'Vugana n\'abayobozi bacu cyangwa itsinda ryita ku banyamuryango ukoresheje WhatsApp, telefone, imeri cyangwa ubutumwa bwihuse.'}
          </p>

          {/* Admin Edit Shortcut */}
          {isAdmin && onOpenAdminConsole && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenAdminConsole('contact')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-emerald-300 shadow-2xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Phone, Email &amp; WhatsApp as Admin</span>
              </button>
            </div>
          )}
        </div>

        {/* 3 Core Contact Cards: WhatsApp, Phone, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: WhatsApp (Primary digital chat) */}
          <div className="bg-gradient-to-b from-emerald-50/70 to-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group">
            <div className="absolute top-0 left-0 right-0">
              <ImigongoRibbon height={5} variant="light" bordered={false} />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {currentLang === 'en' ? 'Fast WhatsApp' : 'Kuri WhatsApp'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {currentLang === 'en' ? 'WhatsApp Direct Chat' : 'Twandikire kuri WhatsApp'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === 'en'
                    ? 'Instant text chat, loan guidance, USSD assistance, and account questions.'
                    : 'Kwandikirana ako kanya, kubaza ku nguzanyo no gufashwa gukoresha *541#.'}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 font-mono text-sm font-bold text-emerald-900 flex items-center justify-between">
                <span>{saccoInfo.whatsapp || saccoInfo.phone}</span>
                <span className="text-[11px] text-emerald-700 font-sans font-normal">(+250 Rwanda)</span>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 group-hover:bg-emerald-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'Open WhatsApp Chat' : 'Fungura WhatsApp'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Card 2: Phone Calling */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group">
            <div className="absolute top-0 left-0 right-0">
              <ImigongoRibbon height={5} variant="light" bordered={false} />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/20">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                  <Clock className="w-3 h-3" />
                  {currentLang === 'en' ? 'Direct Line' : 'Telefone'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {currentLang === 'en' ? 'Telephone Helpline' : 'Guhamagara kuri Telefone'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === 'en'
                    ? 'Speak directly with our central customer desk and loan advisors.'
                    : 'Vugana n\'abakozi bacu mu biro bikuru bya Ubumwe SACCO Gakenke.'}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>{saccoInfo.phone}</span>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-sans font-medium cursor-pointer"
                >
                  {copiedPhone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`tel:${saccoInfo.phone}`}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{currentLang === 'en' ? 'Call Now' : 'Hamagara Ako Kanya'}</span>
              </a>
            </div>
          </div>

          {/* Card 3: Official Email */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group">
            <div className="absolute top-0 left-0 right-0">
              <ImigongoRibbon height={5} variant="light" bordered={false} />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-800/20">
                  <Mail className="w-6 h-6 text-emerald-200" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  {currentLang === 'en' ? 'Official Inquiries' : 'Imeri ya Koperative'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {currentLang === 'en' ? 'Email Correspondence' : 'Kwandikira Imeri'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === 'en'
                    ? 'Formal cooperative inquiries, partnerships, audit requests, and management notices.'
                    : 'Ubusabe bwa dosiye, amabaruwa yemewe n\'itumanaho ry\'ubuyobozi.'}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs font-semibold text-slate-800 flex items-center justify-between truncate">
                <span className="truncate">{saccoInfo.email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-sans font-medium shrink-0 ml-2 cursor-pointer"
                >
                  {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`mailto:${saccoInfo.email}`}
                className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
              >
                <Mail className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'Send Official Email' : 'Ohereza Imeri'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive In-Page Message & Support Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Office Details */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {currentLang === 'en' ? 'Headquarters & Working Hours' : 'Ibiro Bikuru n\'Amasaha'}
              </span>

              <h3 className="text-2xl font-extrabold text-white">
                {saccoInfo.name}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{saccoInfo.headquarters}</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {currentLang === 'en'
                      ? (saccoInfo.operatingHoursEn || 'Monday – Friday: 8:00 AM – 5:00 PM | Saturday: 8:00 AM – 1:00 PM')
                      : (saccoInfo.operatingHoursRw || 'Kuwa Mbere – Kuwa Gatanu: 8:00 – 17:00 | Kuwa Gatandatu: 8:00 – 13:00')}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Smartphone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {currentLang === 'en'
                      ? `USSD Mobile Banking: Dial ${saccoInfo.ussdCode} (Active 24 Hours / 7 Days a Week)`
                      : `Koresha USSD: Kanda ${saccoInfo.ussdCode} (Amasaha 24/7 Ku Munsi)`}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  Manager: Mbitsemunda Phocas ({saccoInfo.managerPhone || saccoInfo.phone})
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  Board: Wellarse &amp; Bartazal
                </span>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/dir//Gakenke/@-1.7114734,29.617736,11z/data=!4m17!1m8!3m7!1s0x19dcf39e3202d463:0x1eceb378ea2a23e9!2sGakenke!3b1!8m2!3d-1.6924232!4d29.742604!16s%2Fm%2F02w93vh!4m7!1m0!1m5!1m1!1s0x19dcf39e3202d463:0x1eceb378ea2a23e9!2m2!1d29.742604!2d-1.6924232?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-98"
                >
                  <MapPin className="w-4 h-4 text-emerald-200" />
                  <span>{currentLang === 'en' ? 'Open in Google Maps (Directions)' : 'Reba Aho Duherereye kuri Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Fast Inquiry Form */}
            <div className="lg:col-span-7 bg-white text-slate-900 p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-100">
              {formSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {currentLang === 'en' ? 'Message Sent Successfully!' : 'Ubutumwa Bwoherejwe Neza!'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    {currentLang === 'en'
                      ? `Thank you ${fullName}. Our customer desk at ${saccoInfo.phone} or ${saccoInfo.email} will get back to you promptly.`
                      : `Murakoze ${fullName}. Ibiro bya koperative kuri ${saccoInfo.phone} cyangwa ${saccoInfo.email} biragusubiza vuba.`}
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 cursor-pointer"
                  >
                    {currentLang === 'en' ? 'Send Another Inquiry' : 'Ohereza Ubundi Butumwa'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {currentLang === 'en' ? 'Direct Member Inquiry Desk' : 'Twandikire Ubutumwa Bwihuse'}
                    </span>
                    <span className="text-[11px] text-slate-400">Response within 2h</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {currentLang === 'en' ? 'Full Name' : 'Amazina Yombi'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jean Damascene"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {currentLang === 'en' ? 'Telephone Number' : 'Nimero ya Telefone'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="078..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono-numbers"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-slate-700 mb-1">
                      {currentLang === 'en' ? 'Inquiry Topic / Reason' : 'Impamvu / Intego y\'Ubutumwa'}
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="general">
                        {currentLang === 'en' ? 'General Cooperative Inquiry' : 'Kubaza Amakuru Rusange'}
                      </option>
                      <option value="loan">
                        {currentLang === 'en' ? 'Loan Application & Terms' : 'Gusaba Inguzanyo & Amabwiriza'}
                      </option>
                      <option value="savings">
                        {currentLang === 'en' ? 'Fixed Term Deposit & Savings' : 'Kuzigama & Konti y\'Igihe Kirekire'}
                      </option>
                      <option value="ussd">
                        {currentLang === 'en' ? `USSD ${saccoInfo.ussdCode} & Mobile Banking Support` : `Ubufasha bwa USSD ${saccoInfo.ussdCode}`}
                      </option>
                      <option value="leadership">
                        {currentLang === 'en' ? 'Executive Desk (Manager / Board)' : 'Kuvugana n\'Ubuyobozi Bukuru'}
                      </option>
                    </select>
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-slate-700 mb-1">
                      {currentLang === 'en' ? 'Your Message' : 'Ubutumwa Bwawe'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        currentLang === 'en'
                          ? 'Explain how we can help you or ask your question...'
                          : 'Sobanura uko twagufasha cyangwa ubaze ikibazo cyawe...'
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? 'Submit Inquiry Now' : 'Ohereza Ubutumwa'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
