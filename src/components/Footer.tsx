import React from 'react';
import { Language, ThemeColor, SaccoContactInfo, NavItemConfig } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { SACCO_INFO, THEME_OPTIONS, INITIAL_NAV_ITEMS } from '../data/saccoData';
import {
  Landmark,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Smartphone,
  Lock,
  Settings,
  LogOut,
  Palette,
  Check,
  ShieldAlert,
  MessageSquare,
  KeyRound,
  ImageIcon,
  Compass,
} from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';
interface FooterProps {
  currentLang: Language;
  onNavigateToSection: (sectionId: string) => void;
  onOpenMembershipModal: () => void;
  isManagerLoggedIn: boolean;
  managerName?: string;
  onOpenManagerLogin: () => void;
  onOpenAdminConsole: (tab?: string) => void;
  onManagerLogout: () => void;
  onManagerLoginSuccess?: (user?: { name: string; email: string; role: string }) => void; // optional callback with optional user
  currentTheme: ThemeColor;
  onThemeChange: (theme: ThemeColor) => void;
  saccoInfo?: SaccoContactInfo;
  navItems?: NavItemConfig[];
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigateToSection,
  onOpenMembershipModal,
  isManagerLoggedIn,
  managerName,
  onOpenManagerLogin,
  onOpenAdminConsole,
  onManagerLogout,
  onManagerLoginSuccess,
  currentTheme,
  onThemeChange,
  saccoInfo = SACCO_INFO,
  navItems = INITIAL_NAV_ITEMS,
}) => {
  const t = TRANSLATIONS[currentLang];

  const cleanWhatsapp = saccoInfo.whatsapp.replace(/[^0-9]/g, '') || '250786422080';
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    saccoInfo.whatsappMessage ||
    (currentLang === 'en'
      ? 'Hello UBUMWE SACCO GAKENKE, I would like to inquire about cooperative services.'
      : 'Muraho UBUMWE SACCO GAKENKE, nifuzaga kubaza amakuru kuri serivisi zanyu.')
  )}`;

  const visibleNavs = navItems.filter((i) => i.visible);

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 relative">
      {/* Top Imigongo Skeleton Ribbon (Dark Variant) */}
      <ImigongoRibbon height={18} variant="dark" bordered={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16 space-y-12">
        {/* Main 3-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Regulatory Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigateToSection('hero')}
              className="flex items-center gap-2.5 text-left cursor-pointer group transition-all"
              title="Return to Home / Top"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-700 group-hover:bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 transition-colors shadow-sm">
                <Landmark className="w-4 h-4 text-emerald-100" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                {saccoInfo.name}
              </span>
            </button>

            <p className="text-slate-400 text-xs leading-relaxed">
              Financial cooperative dedicated to the socio-economic prosperity of farmers, merchants, and families across the 19 sectors of Gakenke District.
            </p>

            <div className="pt-2 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>RCA Microfinance Registration: {saccoInfo.rcaRegistration}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Certified Financial Cooperative Institution</span>
              </div>
            </div>
          </div>

          {/* Direct Contact Details: WhatsApp, Phone, Email (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {currentLang === 'en' ? 'Direct Contact & Helpline' : 'Itumanaho & Ubufasha'}
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: <strong>{saccoInfo.whatsapp || saccoInfo.phone}</strong> (+250)</span>
              </a>

              <a
                href={`tel:${saccoInfo.phone}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors font-mono-numbers"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Helpline: <strong>{saccoInfo.phone}</strong></span>
              </a>

              <a
                href={`mailto:${saccoInfo.email}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Email: <strong className="text-slate-200">{saccoInfo.email}</strong></span>
              </a>

              <div className="flex items-center gap-2 text-amber-300 font-mono-numbers">
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>Official USSD: <strong>{saccoInfo.ussdCode}</strong></span>
              </div>

              <div className="flex items-start gap-2 text-slate-400 text-[11px] pt-1">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{saccoInfo.headquarters}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigational Links (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {visibleNavs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigateToSection(item.targetSection)}
                  className={`text-left text-xs transition-all flex items-center gap-1.5 py-1 px-1.5 rounded-lg cursor-pointer group ${
                    item.isPrimary
                      ? 'text-emerald-400 font-bold hover:text-emerald-300'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80 hover:translate-x-1'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors shrink-0" />
                  <span className="truncate">{currentLang === 'en' ? item.labelEn : item.labelRw}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              {currentLang === 'en'
                ? (saccoInfo.operatingHoursEn || 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM')
                : (saccoInfo.operatingHoursRw || 'Kuwa Mbere - Kuwa Gatanu: Saa 8:00 - 17:00 | Kuwa Gatandatu: Saa 8:00 - 13:00')}
            </p>
          </div>
        </div>

        {/* Dedicated Leadership Sign In & Portal Theme Controls Box */}
        <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Leadership & Manager Authentication Access */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                <Lock className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-bold text-white tracking-tight">
                {currentLang === 'en'
                  ? 'Official Staff & Board Login'
                  : 'Kwinjira kw\'Abakozi & Inama y\'Ubutegetsi'}
              </h4>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {currentLang === 'en'
                ? 'Authorized portal for Management (Mbitsemunda Phocas), Board Directors (Wellarse, Bartazal), and cooperative staff. Manage website contents, contacts, working hours, and media.'
                : 'Uyu mwanya wagenewe gusa Abakozi ba SACCO, Ubuyobozi Bukuru bw\'Imirimo (Mbitsemunda Phocas), n\'Inama y\'Ubutegetsi (Wellarse, Bartazal).'}
            </p>

            {/* Default Official Credentials Note */}
            {!isManagerLoggedIn && (
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">
                <KeyRound className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Staff Login: <strong className="text-amber-300 font-sans">{saccoInfo.email}</strong> | PIN: <strong className="text-amber-300">gakenke2026</strong>
                </span>
              </div>
            )}
          </div>

          {/* Right: Auth Action Buttons & Status */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            {isManagerLoggedIn ? (
              <div className="w-full sm:w-auto flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    Staff Active: <strong>{managerName || saccoInfo.email}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenAdminConsole()}
                    className="flex-1 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Admin Hub</span>
                  </button>
                  <button
                    type="button"
                    onClick={onManagerLogout}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer border border-slate-700"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenManagerLogin}
                className="w-full sm:w-auto px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-200" />
                <span>
                  {currentLang === 'en'
                    ? 'Staff Login'
                    : 'Kwinjira kw\'Abakozi (Staff)'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Imigongo Skeleton Trim */}
        <ImigongoRibbon height={12} variant="dark" bordered={false} />

        {/* Copyright & Disclaimer */}
        <div className="pt-2 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 {saccoInfo.name}. All Rights Reserved. Developed by &amp; DmechTech Ltd.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>District: {saccoInfo.district}</span>
            <span>·</span>
            <span>USSD: {saccoInfo.ussdCode}</span>
            <span>·</span>
            <a href={`tel:${saccoInfo.phone}`} className="hover:text-emerald-400 font-mono-numbers">
              {saccoInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
