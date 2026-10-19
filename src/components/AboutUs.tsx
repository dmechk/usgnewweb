import React from 'react';
import { Language, SaccoContactInfo, ManagerMessage, AboutContentConfig, AboutValueItem } from '../types';
import { SACCO_INFO, INITIAL_ABOUT_CONTENT } from '../data/saccoData';
import {
  ShieldCheck,
  Target,
  HeartHandshake,
  Award,
  Landmark,
  CheckCircle2,
  Users,
  Edit2,
  Plus,
  Trash2,
  Sparkles,
  Camera,
} from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';
import { ManagerMessageCard } from './ManagerMessageCard';

interface AboutUsProps {
  currentLang: Language;
  saccoInfo?: SaccoContactInfo;
  aboutContent?: AboutContentConfig;
  managerMessage?: ManagerMessage;
  isAdmin?: boolean;
  onOpenAdminConsole?: (tab?: string) => void;
  onUpdateManagerMessage?: (id: string, updated: Partial<ManagerMessage>) => void;
  onDeleteValue?: (id: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  currentLang,
  saccoInfo = SACCO_INFO,
  aboutContent = INITIAL_ABOUT_CONTENT,
  managerMessage,
  isAdmin = false,
  onOpenAdminConsole,
  onUpdateManagerMessage,
  onDeleteValue,
}) => {
  const getValueIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'heart':
      case 'solidarity':
        return HeartHandshake;
      case 'shield':
      case 'compliance':
        return ShieldCheck;
      case 'target':
      case 'goal':
        return Target;
      case 'award':
        return Award;
      case 'users':
        return Users;
      default:
        return CheckCircle2;
    }
  };

  const badgeTitle = currentLang === 'en' ? aboutContent.badgeTitleEn : aboutContent.badgeTitleRw;
  const mainTitle = currentLang === 'en' ? aboutContent.mainTitleEn : aboutContent.mainTitleRw;
  const subtitle = currentLang === 'en' ? aboutContent.subtitleEn : aboutContent.subtitleRw;
  const regulationNotice =
    currentLang === 'en' ? aboutContent.regulationNoticeEn : aboutContent.regulationNoticeRw;
  const storyP1 = currentLang === 'en' ? aboutContent.storyP1En : aboutContent.storyP1Rw;
  const storyP2 = currentLang === 'en' ? aboutContent.storyP2En : aboutContent.storyP2Rw;
  const imageCaption =
    currentLang === 'en' ? aboutContent.imageCaptionEn : aboutContent.imageCaptionRw;
  const assemblyImage =
    aboutContent.imageUrl || '/src/assets/images/community_governance_1791989970347.jpg';

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Admin Bar */}
        {isAdmin && onOpenAdminConsole && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-950 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>About Us &amp; Cooperative Heritage (Admin Management Active)</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenAdminConsole('about')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit About Content &amp; Values (CRUD)</span>
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <Landmark className="w-4 h-4" />
            <span>{badgeTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            {mainTitle}
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            {subtitle}
          </p>
        </div>

        {/* 2-Column Story and Assembly Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
              <Award className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Regulated &amp; Audited Cooperative Institution</span>
                <p className="text-emerald-800 text-xs mt-0.5 font-mono-numbers">
                  {regulationNotice}
                </p>
              </div>
            </div>

            <p className="whitespace-pre-line">{storyP1}</p>
            {storyP2 && <p className="whitespace-pre-line">{storyP2}</p>}

            {/* Core Values Dynamic List with CRUD */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Core Cooperative Principles' : 'Amahame n\'Indangagaciro'}
                </span>
                {isAdmin && onOpenAdminConsole && (
                  <button
                    type="button"
                    onClick={() => onOpenAdminConsole('about')}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Value</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {(aboutContent.values || []).map((val) => {
                  const Icon = getValueIcon(val.iconName);
                  const title = currentLang === 'en' ? val.titleEn : val.titleRw;
                  const desc = currentLang === 'en' ? val.descEn : val.descRw;

                  return (
                    <div
                      key={val.id}
                      className="relative group p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-emerald-700 mb-1" />
                      <span className="font-bold text-slate-900 block truncate">{title}</span>
                      <span className="text-slate-500 text-[11px] line-clamp-2 mt-0.5">{desc}</span>

                      {/* Admin Quick Action Button on Value Item */}
                      {isAdmin && (
                        <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 bg-white rounded shadow-xs border border-slate-200 p-0.5">
                          <button
                            type="button"
                            onClick={() => onOpenAdminConsole?.('about')}
                            className="p-1 text-slate-600 hover:text-emerald-700 rounded cursor-pointer"
                            title="Edit Values in Admin Console"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                          {onDeleteValue && (aboutContent.values || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => onDeleteValue(val.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                              title="Delete Value"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-300 shadow-xl bg-slate-900 aspect-[4/3] group">
              <img
                src={assemblyImage}
                alt="UBUMWE SACCO Gakenke General Assembly"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Admin Change Picture Floating Button */}
              {isAdmin && onOpenAdminConsole && (
                <button
                  type="button"
                  onClick={() => onOpenAdminConsole('about')}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-slate-950/85 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-lg transition-all cursor-pointer z-20"
                  title="Change Picture in Admin Console"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Picture</span>
                </button>
              )}
            </div>
            <div className="mt-3 text-xs text-slate-500 text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{imageCaption}</span>
            </div>
          </div>
        </div>

        {/* Manager / Institutional Leadership Message in About Page */}
        {managerMessage && managerMessage.active && (
          <div className="pt-6">
            <ManagerMessageCard
              message={managerMessage}
              currentLang={currentLang}
              isAdmin={isAdmin}
              onEdit={() => onOpenAdminConsole && onOpenAdminConsole('messages')}
              onUpdateImage={(newUrl) => onUpdateManagerMessage && onUpdateManagerMessage(managerMessage.id, { imageUrl: newUrl })}
              variant="about"
            />
          </div>
        )}
      </div>

      {/* Imigongo skeleton ribbon connecting to services */}
      <div className="mt-16">
        <ImigongoRibbon height={16} variant="light" bordered={true} />
      </div>
    </section>
  );
};

