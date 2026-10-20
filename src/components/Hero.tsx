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
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';


interface HeroProps {
  currentLang: Language;
  onOpenMembershipModal: () => void;
  onScrollToCalculator: () => void;
  onOpenMomoModal: () => void;
  onScrollToContact: () => void;
  saccoInfo?: SaccoContactInfo;
  heroImage?: string;
  heroSlides?: string[];
  heroContent?: HeroContentConfig;
  isAdmin?: boolean;
  onOpenAdminConsole?: (tab?: string) => void;
  onUpdateSlides?: (slides: string[]) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenMembershipModal,
  onScrollToCalculator,
  onOpenMomoModal,
  onScrollToContact,
  saccoInfo = SACCO_INFO,
  heroImage,
  heroSlides = [],
  heroContent,
  isAdmin = false,
  onOpenAdminConsole,
  onUpdateSlides,
}) => {
  const t = TRANSLATIONS[currentLang];

  // Resolve slides list: use heroSlides if non-empty, otherwise fallback to heroImage or default banking photo
  const rawSlides = (heroSlides && heroSlides.length > 0)
    ? heroSlides
    : (heroImage ? [heroImage] : ['/src/assets/images/mbitsemunda_phocas_desk.jpg']);

  // Ensure heroImage is included if provided and not in the list
  const slides = (heroImage && !rawSlides.includes(heroImage))
    ? [heroImage, ...rawSlides]
    : rawSlides;

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Compress image on the fly to avoid exceeding browser localStorage quota
  const compressHeroImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 1280;
          const maxHeight = 800;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdateSlides) return;
    try {
      setIsUploading(true);
      const compressed = await compressHeroImage(file);
      const updated = [...slides, compressed];
      onUpdateSlides(updated);
      setCurrentIndex(updated.length - 1);
    } catch (err) {
      console.error('Failed to process image upload', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteCurrentSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onUpdateSlides || slides.length <= 1) return;
    if (window.confirm('Delete this welcome slide image?')) {
      const updated = slides.filter((_, i) => i !== currentIndex);
      onUpdateSlides(updated);
      setCurrentIndex((prev) => (prev >= updated.length ? updated.length - 1 : prev));
    }
  };

  // Auto-advance slide to the left every 3 seconds (as requested)
  React.useEffect(() => {
    if (slides.length <= 1 || isPaused || isUploading) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused, isUploading]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const districtBadge =
    currentLang === 'fr'
      ? `Coopérative du District de ${saccoInfo.district}`
      : currentLang === 'rw'
      ? heroContent?.districtBadgeRw || `Koperative y'Akarere ka ${saccoInfo.district}`
      : heroContent?.districtBadgeEn || `${saccoInfo.district} Cooperative`;

  const headlinePrefix =
    currentLang === 'fr'
      ? t.hero.headlinePrefix
      : currentLang === 'rw'
      ? heroContent?.headlinePrefixRw ?? t.hero.headlinePrefix
      : heroContent?.headlinePrefixEn ?? t.hero.headlinePrefix;

  const headlineFocus =
    currentLang === 'fr'
      ? t.hero.headlineFocus
      : currentLang === 'rw'
      ? heroContent?.headlineFocusRw ?? t.hero.headlineFocus
      : heroContent?.headlineFocusEn ?? t.hero.headlineFocus;

  const headlineSuffix =
    currentLang === 'fr'
      ? t.hero.headlineSuffix
      : currentLang === 'rw'
      ? heroContent?.headlineSuffixRw ?? t.hero.headlineSuffix
      : heroContent?.headlineSuffixEn ?? t.hero.headlineSuffix;

  const subheading =
    currentLang === 'fr'
      ? t.hero.subheading
      : currentLang === 'rw'
      ? heroContent?.subheadingRw ?? t.hero.subheading
      : heroContent?.subheadingEn ?? t.hero.subheading;

  const ctaJoin =
    currentLang === 'fr'
      ? t.hero.ctaJoin
      : currentLang === 'rw'
      ? heroContent?.ctaJoinRw ?? t.hero.ctaJoin
      : heroContent?.ctaJoinEn ?? t.hero.ctaJoin;

  const ctaCalculator =
    currentLang === 'fr'
      ? t.hero.ctaCalculator
      : currentLang === 'rw'
      ? heroContent?.ctaCalculatorRw ?? t.hero.ctaCalculator
      : heroContent?.ctaCalculatorEn ?? t.hero.ctaCalculator;

  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Admin Fast Bar */}
      {isAdmin && onOpenAdminConsole && (
        <div className="bg-emerald-950/90 border-b border-emerald-800/80 px-4 py-2 text-xs flex items-center justify-between text-emerald-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold">Home Hero Section (Admin Control Active · {slides.length} Welcome Slides)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenAdminConsole('pictures')}
              className="px-3 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Camera className="w-3 h-3" />
              <span>Manage Slides &amp; Pictures</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenAdminConsole('home-hero')}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Headlines</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Proposition and Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
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
              <span className="text-emerald-400">
                {headlineFocus}
              </span>
              <span> {headlineSuffix}</span>
            </h1>

            {/* Narrative Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {subheading}
            </p>

            {/* Left Column Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenMomoModal}
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-amber-300 bg-slate-800/90 hover:bg-slate-700 hover:text-amber-200 rounded-xl border border-slate-700/80 flex items-center gap-2 transition-all font-mono-numbers cursor-pointer shadow-sm"
              >
                <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>USSD Digital Banking: <strong>{saccoInfo.ussdCode}</strong></span>
              </button>
            </div>
          </div>

          {/* Right Column: Left-Moving Sliding Carousel (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-950/60 bg-slate-800 group transition-all duration-500 hover:border-emerald-500/60 ring-1 ring-white/10 select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Left-Moving Carousel Track */}
              <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[560px] overflow-hidden bg-slate-950">
                <div
                  className="flex h-full transition-transform duration-700 ease-out will-change-transform"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {slides.map((slideUrl, idx) => (
                    <div
                      key={`slide-${idx}-${slideUrl}`}
                      className="min-w-full h-full relative shrink-0"
                    >
                      <img
                        src={slideUrl}
                        alt={`UBUMWE SACCO GAKENKE Slide ${idx + 1}`}
                        className="w-full h-full object-cover select-none"
                        referrerPolicy="no-referrer"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </div>

                {/* Subtle gradient overlay at bottom for cinematic readability */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent pointer-events-none" />

                {/* Left Slide Arrow */}
                {slides.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer shadow-lg z-20"
                  >
                    <span className="text-lg font-bold leading-none">&#8249;</span>
                  </button>
                )}

                {/* Right Slide Arrow */}
                {slides.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer shadow-lg z-20"
                  >
                    <span className="text-lg font-bold leading-none">&#8250;</span>
                  </button>
                )}

                {/* Bottom Navigation Indicators (Dots & Slide Count) */}
                {slides.length > 1 && (
                  <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15">
                      {slides.map((_, i) => (
                        <button
                          key={`dot-${i}`}
                          type="button"
                          onClick={() => setCurrentIndex(i)}
                          aria-label={`Jump to slide ${i + 1}`}
                          className={`transition-all rounded-full cursor-pointer ${
                            currentIndex === i
                              ? 'w-7 h-2 bg-emerald-400 shadow-sm'
                              : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                          }`}
                        />
                      ))}
                      <span className="text-[10px] text-slate-300 font-mono ml-1.5 pl-1.5 border-l border-white/20">
                        {currentIndex + 1}/{slides.length}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden File Input for Direct Local Image Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Admin Change Picture / Manage Slides Floating Controls */}
              {isAdmin && (
                <div className="absolute top-4 right-4 flex flex-wrap items-center justify-end gap-2 z-30">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/85 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold backdrop-blur-md">
                    {slides.length} Slides Active
                  </span>

                  {/* Direct Add Image button */}
                  {onUpdateSlides && (
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold backdrop-blur-md border border-emerald-400/40 flex items-center gap-1.5 shadow-xl transition-all cursor-pointer"
                      title="Upload and add another image to the welcome slideshow"
                    >
                      {isUploading ? (
                        <span>Uploading...</span>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Slide</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Delete Current Slide button */}
                  {onUpdateSlides && slides.length > 1 && (
                    <button
                      type="button"
                      onClick={handleDeleteCurrentSlide}
                      className="p-1.5 bg-rose-950/80 hover:bg-rose-600 text-rose-200 hover:text-white rounded-xl text-xs font-bold backdrop-blur-md border border-rose-500/40 flex items-center shadow-xl transition-all cursor-pointer"
                      title={`Delete current slide #${currentIndex + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Open Full Admin Console */}
                  {onOpenAdminConsole && (
                    <button
                      type="button"
                      onClick={() => onOpenAdminConsole('pictures')}
                      className="px-3.5 py-1.5 bg-slate-950/90 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-xl transition-all cursor-pointer"
                      title="Open full admin pictures manager"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-300" />
                      <span>All Controls</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

