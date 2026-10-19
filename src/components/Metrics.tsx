import React from 'react';
import { Language, SaccoContactInfo, HomeMetricItem } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
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
import { ImigongoRibbon } from './ImigongoPattern';

interface MetricsProps {
  currentLang: Language;
  saccoInfo?: SaccoContactInfo;
  metrics?: HomeMetricItem[];
  isAdmin?: boolean;
  onOpenAdminConsole?: (tab?: string) => void;
  onDeleteMetric?: (id: string) => void;
}

export const Metrics: React.FC<MetricsProps> = ({
  currentLang,
  saccoInfo = SACCO_INFO,
  metrics = INITIAL_HOME_METRICS,
  isAdmin = false,
  onOpenAdminConsole,
  onDeleteMetric,
}) => {
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

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-10">
        {/* Admin Section Control */}
        {isAdmin && onOpenAdminConsole && (
          <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Cooperative Key Metrics &amp; Statistics ({metrics.length} cards active)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenAdminConsole('home-metrics')}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add / Manage Metrics (CRUD)</span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((item) => {
            const IconComponent = getIcon(item.iconName);
            const label = currentLang === 'en' ? item.labelEn : item.labelRw;
            const detail = currentLang === 'en' ? item.detailEn : item.detailRw;

            return (
              <div
                key={item.id}
                className="relative group flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 hover:border-emerald-500/50 transition-colors bg-white shadow-xs"
              >
                <div className={`p-3 rounded-lg ${item.bgClass || 'bg-emerald-50'} shrink-0`}>
                  <IconComponent className={`w-6 h-6 ${item.colorClass || 'text-emerald-700'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-mono-numbers tracking-tight truncate">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5 truncate">
                    {label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">
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
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold text-slate-800">Cooperative Oversight:</span>
            <span>{saccoInfo.rcaRegistration}</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-emerald-800 font-medium">Licensed Financial Cooperative</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-mono-numbers">
            <span>Help Desk: <strong className="text-slate-900">{saccoInfo.phone}</strong></span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>USSD: <strong className="text-emerald-700">{saccoInfo.ussdCode}</strong></span>
          </div>
        </div>
      </div>

      {/* Imigongo skeleton ribbon connecting to next section */}
      <ImigongoRibbon height={16} variant="light" bordered={true} />
    </section>
  );
};

