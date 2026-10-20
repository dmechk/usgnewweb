import React, { useState, useEffect, useRef } from 'react';
import { Language, SaccoContactInfo, HomeMetricItem } from '../types';
import { SACCO_INFO, INITIAL_HOME_METRICS } from '../data/saccoData';
import {
  Users,
  PiggyBank,
  Landmark,
  Building2,
  ShieldCheck,
  TrendingUp,
  Award,
  Star,
  Sparkles,
  Edit2,
  Plus,
  Trash2,
} from 'lucide-react';

interface MetricsProps {
  currentLang: Language;
  saccoInfo?: SaccoContactInfo;
  metrics?: HomeMetricItem[];
  isAdmin?: boolean;
  onOpenAdminConsole?: (tab?: string) => void;
  onDeleteMetric?: (id: string) => void;
}

/**
 * Animated Number Counter triggered on scroll into view
 */
const AnimatedCounter: React.FC<{ valueStr: string; isVisible: boolean }> = ({ valueStr, isVisible }) => {
  // Parse value string: e.g. "18,640+", "4.85B RWF", "3.62B RWF", "6 Branches", "15 Years"
  const match = valueStr.match(/^([^\d.]*)(\d+(?:,\d+)*(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] || '' : '';
  const rawNum = match ? match[2] : '0';
  const suffix = match ? match[3] || '' : '';
  const hasComma = rawNum.includes(',');
  const cleanNum = parseFloat(rawNum.replace(/,/g, ''));
  const decimals = rawNum.includes('.') ? rawNum.split('.')[1].length : 0;
  const initialZero = hasComma ? '0' : decimals > 0 ? (0).toFixed(decimals) : '0';

  const [displayValue, setDisplayValue] = useState<string>(`${prefix}${initialZero}${suffix}`);

  useEffect(() => {
    if (!isVisible) {
      // Reset to 0 when out of view, so scrolling into view animates the numbers every time
      setDisplayValue(`${prefix}${initialZero}${suffix}`);
      return;
    }

    if (isNaN(cleanNum)) {
      setDisplayValue(valueStr);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1500; // ms smooth count-up
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNumber = cleanNum * easeOut;

      let formattedNumber: string;
      if (hasComma) {
        formattedNumber = Math.round(currentNumber).toLocaleString('en-US');
      } else if (decimals > 0) {
        formattedNumber = currentNumber.toFixed(decimals);
      } else {
        formattedNumber = Math.round(currentNumber).toString();
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(valueStr);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [valueStr, isVisible, cleanNum, decimals, hasComma, prefix, suffix, initialZero]);

  return <>{displayValue}</>;
};

export const Metrics: React.FC<MetricsProps> = ({
  currentLang,
  saccoInfo = SACCO_INFO,
  metrics = INITIAL_HOME_METRICS,
  isAdmin = false,
  onOpenAdminConsole,
  onDeleteMetric,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Triggers on scroll into view and resets when scrolling away
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'users':
        return Users;
      case 'piggy':
      case 'piggybank':
        return PiggyBank;
      case 'landmark':
        return Landmark;
      case 'building':
      case 'building2':
        return Building2;
      case 'shield':
      case 'shieldcheck':
        return ShieldCheck;
      case 'trending':
      case 'trendingup':
        return TrendingUp;
      case 'award':
        return Award;
      default:
        return Star;
    }
  };

  const oversightLabel =
    currentLang === 'fr'
      ? 'Supervision Coopérative :'
      : currentLang === 'rw'
      ? 'Ubugenzuzi bwa Koperative :'
      : 'Cooperative Oversight:';

  const licensedLabel =
    currentLang === 'fr'
      ? 'Coopérative Financière Agréée'
      : currentLang === 'rw'
      ? "Koperative y'Imari Yemewe n'Amategeko"
      : 'Licensed Financial Cooperative';

  const helpDeskLabel =
    currentLang === 'fr'
      ? 'Assistance :'
      : currentLang === 'rw'
      ? 'Ubufasha :'
      : 'Help Desk:';

  return (
    <section ref={sectionRef} className="bg-white border-b border-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-10">
        {/* Admin Section Control */}
        {isAdmin && onOpenAdminConsole && (
          <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>
                {currentLang === 'fr'
                  ? `Statistiques Clés de la Coopérative (${metrics.length} cartes actives)`
                  : currentLang === 'rw'
                  ? `Imibare y'Ingenzi ya Koperative (${metrics.length} zikora)`
                  : `Cooperative Key Metrics & Statistics (${metrics.length} cards active)`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenAdminConsole('home-metrics')}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {currentLang === 'fr'
                    ? 'Gérer les Métriques (CRUD)'
                    : currentLang === 'rw'
                    ? 'Gucunga Imibare (CRUD)'
                    : 'Add / Manage Metrics (CRUD)'}
                </span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {metrics.map((item) => {
            const IconComponent = getIcon(item.iconName);
            const label =
              currentLang === 'fr'
                ? item.labelFr || item.labelEn
                : currentLang === 'rw'
                ? item.labelRw
                : item.labelEn;
            const detail =
              currentLang === 'fr'
                ? item.detailFr || item.detailEn
                : currentLang === 'rw'
                ? item.detailRw
                : item.detailEn;

            // If this is the branches metric card, dynamically reflect saccoInfo.branchesCount
            const isBranchMetric =
              item.id === 'metric-4' ||
              item.labelEn.toLowerCase().includes('branch') ||
              item.labelEn.toLowerCase().includes('outpost');

            const branchSuffix =
              currentLang === 'fr'
                ? ' Agences'
                : currentLang === 'rw'
                ? ' Amashami'
                : ' Branches';

            const resolvedValue = isBranchMetric && saccoInfo?.branchesCount !== undefined
              ? `${saccoInfo.branchesCount}${branchSuffix}`
              : item.value;

            return (
              <div
                key={item.id}
                className="relative group flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 hover:border-emerald-500/50 transition-all bg-white shadow-xs hover:shadow-sm"
              >
                <div className={`p-2.5 rounded-lg ${item.bgClass || 'bg-emerald-50'} shrink-0`}>
                  <IconComponent className={`w-5 h-5 ${item.colorClass || 'text-emerald-700'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-lg sm:text-xl xl:text-2xl font-extrabold text-slate-900 font-mono-numbers tracking-tight whitespace-normal break-words leading-tight">
                    <AnimatedCounter valueStr={resolvedValue} isVisible={isInView} />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1 leading-snug">
                    {label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {detail}
                  </div>
                </div>

                {/* Admin Quick Action Button on Each Card */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/95 rounded-md p-1 shadow-xs border border-slate-200">
                    <button
                      type="button"
                      onClick={() => onOpenAdminConsole?.('home-metrics')}
                      className="p-1 text-slate-600 hover:text-emerald-700 rounded transition-colors cursor-pointer"
                      title="Edit Metric"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    {onDeleteMetric && metrics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onDeleteMetric(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="Delete Metric"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Regulatory reassurance footer strip with contact details */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-semibold text-slate-800">{oversightLabel}</span>
            <span className="font-mono-numbers">{saccoInfo.rcaRegistration}</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-emerald-800 font-medium">{licensedLabel}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-mono-numbers text-xs">
            <span>
              {helpDeskLabel} <strong className="text-slate-900">{saccoInfo.phone}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>
              USSD: <strong className="text-emerald-700">{saccoInfo.ussdCode}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
