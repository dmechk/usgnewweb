import React from 'react';
import { Language, SaccoContactInfo, HeroContentConfig } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { SACCO_INFO, SACCO_IMAGES } from '../data/saccoData';
import {
  ArrowRight,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Phone,
  MessageSquare,
  Mail,
  Camera,
  Edit2,
  Sparkles,
} from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';

interface HeroProps {
  currentLang: Language;
  onOpenMembershipModal: () => void;
  onScrollToCalculator: () => void;
  onOpenMomoModal: () => void;
  onScrollToContact: () => void;
  saccoInfo?: SaccoContactInfo;
  heroImage?: string;
  heroContent?: HeroContentConfig;
  isAdmin?: boolean;
  onOpenAdminConsole?: (tab?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenMembershipModal,
  onScrollToCalculator,
  onOpenMomoModal,
  onScrollToContact,
  saccoInfo = SACCO_INFO,
  heroImage = SACCO_IMAGES.heroBanking,
  heroContent,
  isAdmin = false,
  onOpenAdminConsole,
}) => {
  const t = TRANSLATIONS[currentLang];

  const districtBadge =
    currentLang === 'en'
      ? heroContent?.districtBadgeEn || `${saccoInfo.district} Cooperative`
      : heroContent?.districtBadgeRw || `Koperative y'Akarere ka ${saccoInfo.district}`;

  const headlinePrefix =
    currentLang === 'en'
      ? heroContent?.headlinePrefixEn ?? t.hero.headlinePrefix
      : heroContent?.headlinePrefixRw ?? t.hero.headlinePrefix;

  const headlineFocus =
    currentLang === 'en'
      ? heroContent?.headlineFocusEn ?? t.hero.headlineFocus
      : heroContent?.headlineFocusRw ?? t.hero.headlineFocus;

  const headlineSuffix =
    currentLang === 'en'
      ? heroContent?.headlineSuffixEn ?? t.hero.headlineSuffix
      : heroContent?.headlineSuffixRw ?? t.hero.headlineSuffix;

  const subheading =
    currentLang === 'en'
      ? heroContent?.subheadingEn ?? t.hero.subheading
      : heroContent?.subheadingRw ?? t.hero.subheading;

  const ctaJoin =
    currentLang === 'en'
      ? heroContent?.ctaJoinEn ?? t.hero.ctaJoin
      : heroContent?.ctaJoinRw ?? t.hero.ctaJoin;

  const ctaCalculator =
    currentLang === 'en'
      ? heroContent?.ctaCalculatorEn ?? t.hero.ctaCalculator
      : heroContent?.ctaCalculatorRw ?? t.hero.ctaCalculator;

  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Admin Fast Bar */}
      {isAdmin && onOpenAdminConsole && (
        <div className="bg-emerald-950/90 border-b border-emerald-800/80 px-4 py-2 text-xs flex items-center justify-between text-emerald-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold">Home Hero Section (Admin Control Active)</span>
          </div>
          <button
            type="button"
            onClick={() => onOpenAdminConsole('home-hero')}
            className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit Hero Headlines &amp; Text</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Proposition and Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Regulatory trust indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-emerald-400">
              <span className="text-amber-300 font-semibold">{districtBadge}</span>
              {isAdmin && onOpenAdminConsole && (
                <button
                  type="button"
                  onClick={() => onOpenAdminConsole('home-hero')}
                  className="text-[11px] underline text-emerald-300 hover:text-white cursor-pointer ml-2"
                >
                  (Edit)
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              <span>{headlinePrefix} </span>
              <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-wavy decoration-1 underline-offset-8">
                {headlineFocus}
              </span>
              <span> {headlineSuffix}</span>
            </h1>

            {/* Narrative Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {subheading}
            </p>

            {/* Left Column Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onOpenMembershipModal}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 active:scale-98 transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-2 cursor-pointer"
              >
                <span>{ctaJoin}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onScrollToCalculator}
                className="px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>{ctaCalculator}</span>
              </button>

              <button
                type="button"
                onClick={onOpenMomoModal}
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-amber-300 hover:text-amber-200 flex items-center gap-1.5 transition-colors font-mono-numbers cursor-pointer"
              >
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>USSD {saccoInfo.ussdCode}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Anchor & Banking Hall Photo (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 group">
              <img
                src={heroImage}
                alt="UBUMWE SACCO GAKENKE Cooperative Team"
                className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Admin Change Picture Floating Button */}
              {isAdmin && onOpenAdminConsole && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenAdminConsole('pictures')}
                    className="px-3 py-1.5 bg-slate-950/85 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-lg transition-all cursor-pointer z-20"
                    title="Change Hero Banking Photo as Admin"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Picture</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Imigongo Skeleton Trim */}
      <ImigongoRibbon height={16} variant="light" bordered={false} />
    </section>
  );
};

