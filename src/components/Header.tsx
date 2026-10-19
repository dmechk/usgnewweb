import React, { useState } from 'react';
import { Language, ThemeColor, SaccoContactInfo, NavItemConfig, SystemImagesConfig } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { SACCO_INFO, THEME_OPTIONS, INITIAL_NAV_ITEMS } from '../data/saccoData';
import {
  Phone,
  Smartphone,
  Globe,
  Menu,
  X,
  Landmark,
  UserCheck,
  Mail,
  Shield,
  LogOut,
  Settings,
  Palette,
  Check,
  MessageSquare,
  ImageIcon,
  Compass,
  Users,
} from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenMembershipModal: () => void;
  onNavigateToSection: (sectionId: string) => void;
  isManagerLoggedIn: boolean;
  managerName?: string;
  onOpenAdminConsole: (tab?: string) => void;
  onManagerLogout: () => void;
  currentTheme: ThemeColor;
  onThemeChange: (theme: ThemeColor) => void;
  saccoInfo?: SaccoContactInfo;
  navItems?: NavItemConfig[];
  systemImages?: SystemImagesConfig;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenMembershipModal,
  onNavigateToSection,
  isManagerLoggedIn,
  managerName,
  onOpenAdminConsole,
  onManagerLogout,
  currentTheme,
  onThemeChange,
  saccoInfo = SACCO_INFO,
  navItems = INITIAL_NAV_ITEMS,
  systemImages,
  activeSection = 'all',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setMobileMenuOpen(false);
  };

  const visibleNavs = navItems.filter((i) => i.visible);
  // Loan calculator is embedded inside Our Services; Contact Us is a standalone CTA button — both excluded from the nav link list
  const headerNavs = visibleNavs.filter(
    (item) => item.targetSection !== 'calculator' && item.targetSection !== 'contact'
  );
  // Mobile nav shows everything (including contact) except the calculator
  const mobileNavs = visibleNavs.filter((item) => item.targetSection !== 'calculator');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Imigongo Skeleton Ribbon */}
      <ImigongoRibbon height={14} variant="light" bordered={false} />

      {/* Admin Status Ribbon (Only visible when Manager is logged in) */}
      {isManagerLoggedIn && (
        <div className="bg-emerald-900 text-white text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              Manager Mode: <strong>{managerName || saccoInfo.email}</strong> (Full CRUD &amp; Upload Permissions)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Quick-jump shortcut buttons for admin */}
            <button
              type="button"
              onClick={() => onOpenAdminConsole('contact')}
              className="text-[11px] bg-emerald-800 hover:bg-emerald-700 px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Edit Phone, Email, WhatsApp"
            >
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>Contacts</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenAdminConsole('pictures')}
              className="text-[11px] bg-emerald-800 hover:bg-emerald-700 px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Change / Upload Pictures"
            >
              <ImageIcon className="w-3 h-3 text-emerald-300" />
              <span>Pictures</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenAdminConsole('navigation')}
              className="text-[11px] bg-emerald-800 hover:bg-emerald-700 px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Manage What Is Inside Navs"
            >
              <Compass className="w-3 h-3 text-emerald-300" />
              <span>Navs</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenAdminConsole('leaders')}
              className="text-[11px] bg-emerald-800 hover:bg-emerald-700 px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Manage Leaders & Directors"
            >
              <Users className="w-3 h-3 text-emerald-300" />
              <span>Leaders</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenAdminConsole('job-applicants')}
              className="text-[11px] bg-emerald-700 hover:bg-emerald-600 px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer text-white shadow-xs"
              title="Manage Job Applicants (Status, Deliberation Comments, Dossiers)"
            >
              <Users className="w-3 h-3 text-emerald-300" />
              <span>Applicants</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenAdminConsole()}
              className="text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Settings className="w-3 h-3" />
              <span>Full Admin</span>
            </button>

            <button
              type="button"
              onClick={onManagerLogout}
              className="text-[11px] text-emerald-300 hover:text-white flex items-center gap-1 transition-colors ml-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Utility Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${saccoInfo.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono-numbers font-semibold">{saccoInfo.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`mailto:${saccoInfo.email}`}
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{saccoInfo.email}</span>
            </a>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-amber-300 font-bold font-mono-numbers">
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>USSD: {saccoInfo.ussdCode}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px] hidden lg:inline">
              UBUMWE SACCO · {saccoInfo.district}
            </span>

            {/* Theme Color Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
                title="Switch Theme Color"
              >
                <Palette className="w-3 h-3 text-amber-400" />
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/40"
                  style={{ backgroundColor: THEME_OPTIONS.find((t) => t.id === currentTheme)?.primaryHex || '#047857' }}
                />
                <span className="hidden sm:inline">Theme</span>
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-2 z-50 animate-in fade-in">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1 border-b border-slate-800">
                    Whole System Theme Color
                  </div>
                  <div className="space-y-1">
                    {THEME_OPTIONS.map((theme) => {
                      const isSelected = currentTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => {
                            onThemeChange(theme.id);
                            setThemeDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-slate-800 text-white font-bold'
                              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full border border-white/30"
                              style={{ backgroundColor: theme.primaryHex }}
                            />
                            <span>{currentLang === 'en' ? theme.nameEn : theme.nameRw}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center rounded-md bg-slate-800 p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                  currentLang === 'en'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('rw')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                  currentLang === 'rw'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                RW
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                  currentLang === 'fr'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-3 lg:gap-6">
        {/* Zone 1: SACCO Identity */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0 text-left"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-emerald-600/20 text-emerald-900 flex items-center justify-center font-bold shadow-sm group-hover:border-emerald-600 transition-all overflow-hidden p-1">
            {systemImages?.saccoLogo ? (
              <img src={systemImages.saccoLogo} alt="UBUMWE SACCO GAKENKE Logo" className="w-full h-full object-contain" />
            ) : (
              <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-black tracking-tight text-slate-900 leading-tight group-hover:text-emerald-800 transition-colors">
              UBUMWE SACCO
            </span>
            <span className="text-[10px] font-bold tracking-widest text-emerald-700 uppercase">
              GAKENKE
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links in Header (Excluding Contact Us so only one button exists) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs lg:text-sm font-semibold text-slate-700 flex-wrap justify-center">
          {headerNavs.map((item) => {
            const isActive =
              activeSection === item.targetSection ||
              (activeSection === 'hero' && item.targetSection === 'hero') ||
              (activeSection === 'all' && item.targetSection === 'hero');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetSection)}
                className={`transition-all whitespace-nowrap shrink-0 px-3 py-1.5 rounded-xl cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white font-extrabold shadow-xs hover:bg-emerald-800'
                    : item.isPrimary
                    ? 'text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50/80 font-bold'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {currentLang === 'en' ? item.labelEn : item.labelRw}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action - Working Contact Us */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold active:scale-95 transition-all rounded-xl shadow-xs cursor-pointer ${
              activeSection === 'contact'
                ? 'bg-emerald-900 text-white ring-2 ring-emerald-400'
                : 'text-white bg-emerald-700 hover:bg-emerald-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200" />
            <span>{currentLang === 'en' ? 'Contact Us' : 'Twandikire'}</span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Header Bottom Imigongo Skeleton Trim */}
      <ImigongoRibbon height={16} variant="light" bordered={true} />

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5 font-medium text-sm text-slate-800">
            {mobileNavs.map((item) => {
              const isActive =
                activeSection === item.targetSection ||
                (activeSection === 'hero' && item.targetSection === 'hero');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.targetSection)}
                  className={`text-left py-2 px-3 rounded-xl font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white font-bold'
                      : item.isPrimary
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {currentLang === 'en' ? item.labelEn : item.labelRw}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            {/* Mobile Theme Selector */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-500" />
                  <span>Portal Theme Color</span>
                </span>
                <span className="text-[11px] font-normal text-slate-500">
                  {THEME_OPTIONS.find((t) => t.id === currentTheme)?.nameEn}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = currentTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => onThemeChange(theme.id)}
                      className={`h-8 rounded-lg flex items-center justify-center transition-all ${
                        isSelected ? 'ring-2 ring-slate-900 ring-offset-1 scale-105' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: theme.primaryHex }}
                      title={theme.nameEn}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Authenticated Manager Actions */}
            {isManagerLoggedIn && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>Manager Session Active</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenAdminConsole('contact');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Edit Contacts</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenAdminConsole('pictures');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Change Pictures</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onOpenAdminConsole();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Open Full Admin Console</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
