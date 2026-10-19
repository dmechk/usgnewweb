import React, { useState } from 'react';
import { Language, Announcement, CommunityImpactStory } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ANNOUNCEMENTS, TESTIMONIALS, SACCO_IMAGES, SACCO_INFO } from '../data/saccoData';
import { ShieldCheck, Calendar, ArrowRight, UserCheck, X, Phone, Mail, Plus, Edit2, Trash2, ImageIcon } from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';
import { ImageUploader } from './ImageUploader';

interface GovernanceAndNewsProps {
  currentLang: Language;
  announcements?: Announcement[];
  communityStories?: CommunityImpactStory[];
  isAdmin?: boolean;
  onOpenAdminConsole?: (tab?: string) => void;
  onAddAnnouncement?: (ann: Omit<Announcement, 'id'>) => void;
  onUpdateAnnouncement?: (id: string, updated: Partial<Announcement>) => void;
  onDeleteAnnouncement?: (id: string) => void;
  onAddCommunityStory?: (story: Omit<CommunityImpactStory, 'id'>) => void;
  onUpdateCommunityStory?: (id: string, updated: Partial<CommunityImpactStory>) => void;
  onDeleteCommunityStory?: (id: string) => void;
}

export const GovernanceAndNews: React.FC<GovernanceAndNewsProps> = ({
  currentLang,
  announcements = ANNOUNCEMENTS,
  communityStories = TESTIMONIALS,
  isAdmin = false,
  onOpenAdminConsole,
  onAddAnnouncement,
  onUpdateAnnouncement,
  onDeleteAnnouncement,
  onAddCommunityStory,
  onUpdateCommunityStory,
  onDeleteCommunityStory,
}) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const t = TRANSLATIONS[currentLang];

  // Inline quick-edit state for image change
  const [quickEditId, setQuickEditId] = useState<string | null>(null);
  const [quickImgUrl, setQuickImgUrl] = useState('');

  const handleQuickImageSave = () => {
    if (quickEditId && onUpdateAnnouncement && quickImgUrl) {
      onUpdateAnnouncement(quickEditId, { imageUrl: quickImgUrl });
    }
    setQuickEditId(null);
    setQuickImgUrl('');
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'agm': return 'bg-blue-700 text-white';
      case 'dividend': return 'bg-amber-600 text-white';
      case 'loan_window': return 'bg-emerald-700 text-white';
      default: return 'bg-slate-700 text-white';
    }
  };

  const storiesList = communityStories && communityStories.length > 0 ? communityStories : TESTIMONIALS;

  return (
    <section id="announcements" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 lg:space-y-24">
        {/* Section 1: Member Stories & Social Proof */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
              UBUMWE SACCO GAKENKE · Community Impact
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight" style={{ textWrap: 'balance' }}>
              {t.governance.storiesTitle}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Real accounts of agricultural transformation and retail expansion from Gakenke members.
            </p>

            {isAdmin && onOpenAdminConsole && (
              <div className="mt-4 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAdminConsole('impact')}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Manage / Add Impact Stories as Admin</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {storiesList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors relative group"
              >
                <div className="h-56 sm:h-64 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                    {item.metric}
                  </div>

                  {isAdmin && onOpenAdminConsole && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
                      <button
                        type="button"
                        onClick={() => onOpenAdminConsole('impact')}
                        className="px-2.5 py-1 bg-slate-950/80 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold backdrop-blur-md border border-white/20 flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                        title="Edit story in admin console"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      {onDeleteCommunityStory && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete impact story for ${item.name}?`)) {
                              onDeleteCommunityStory(item.id);
                            }
                          }}
                          className="px-2 py-1 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold backdrop-blur-md flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                          title="Delete story"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{currentLang === 'en' ? item.quoteEn : item.quoteRw}"
                  </blockquote>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentLang === 'en' ? item.roleEn : item.roleRw}
                      </p>
                    </div>
                    <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Official Announcements & News for UBUMWE SACCO GAKENKE */}
        <div id="news">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                Official Bulletins &amp; Press
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {currentLang === 'en' ? 'News · UBUMWE SACCO GAKENKE' : 'Amakuru · UBUMWE SACCO GAKENKE'}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Direct inquiries: <span className="font-semibold text-slate-900">{SACCO_INFO.phone}</span> · <span className="text-emerald-700 font-semibold">{SACCO_INFO.email}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && onAddAnnouncement && (
                <button
                  type="button"
                  onClick={() => onOpenAdminConsole?.('announcements')}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Publish News
                </button>
              )}
              {isAdmin && onOpenAdminConsole && !onAddAnnouncement && (
                <button
                  type="button"
                  onClick={() => onOpenAdminConsole('announcements')}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shrink-0"
                >
                  Manage Bulletins
                </button>
              )}
            </div>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col group"
              >
                {/* Card Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {ann.imageUrl ? (
                    <img
                      src={ann.imageUrl}
                      alt={currentLang === 'en' ? ann.titleEn : ann.titleRw}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-300" />
                    </div>
                  )}
                  {/* Category badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${getCategoryColor(ann.category)}`}>
                    {ann.category.replace('_', ' ')}
                  </span>
                  {/* Admin overlay */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => onOpenAdminConsole?.('announcements')}
                        className="p-1.5 bg-white/90 backdrop-blur-xs rounded-lg text-slate-600 hover:text-emerald-700 border border-slate-200 shadow-xs"
                        title="Edit notice"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteAnnouncement?.(ann.id)}
                        className="p-1.5 bg-white/90 backdrop-blur-xs rounded-lg text-slate-400 hover:text-red-600 border border-slate-200 shadow-xs"
                        title="Delete notice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{ann.date}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-2">
                    {currentLang === 'en' ? ann.titleEn : ann.titleRw}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 flex-1">
                    {currentLang === 'en' ? ann.summaryEn : ann.summaryRw}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedAnnouncement(ann)}
                      className="w-full px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>{t.governance.learnMore}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcement Detail Modal */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full relative shadow-2xl border border-slate-200 overflow-hidden">
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/70 backdrop-blur-md hover:bg-slate-900/90 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Image */}
              {selectedAnnouncement.imageUrl && (
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={selectedAnnouncement.imageUrl}
                    alt={currentLang === 'en' ? selectedAnnouncement.titleEn : selectedAnnouncement.titleRw}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>OFFICIAL NOTICE · {selectedAnnouncement.date}</span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 pr-4">
                  {currentLang === 'en' ? selectedAnnouncement.titleEn : selectedAnnouncement.titleRw}
                </h3>

                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentLang === 'en' ? selectedAnnouncement.contentEn : selectedAnnouncement.contentRw}
                </div>

                <div className="mt-4 p-3 bg-slate-100 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2 text-slate-700">
                  <span className="flex items-center gap-1 font-mono-numbers">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{SACCO_INFO.phone}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{SACCO_INFO.email}</span>
                  </span>
                </div>

                {/* Admin: Quick image change in modal */}
                {isAdmin && onUpdateAnnouncement && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    {quickEditId === selectedAnnouncement.id ? (
                      <div className="space-y-2">
                        <ImageUploader
                          value={quickImgUrl}
                          onChange={setQuickImgUrl}
                          label="Change Bulletin Picture"
                          aspectRatio="video"
                          presets={[
                            { label: 'Governance', url: '/src/assets/images/community_governance_1791989970347.jpg' },
                            { label: 'Farmers', url: '/src/assets/images/farmers_cooperative_1791989969904.jpg' },
                            { label: 'Banking Hall', url: '/src/assets/images/mbitsemunda_phocas_desk.jpg' },
                          ]}
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleQuickImageSave}
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold"
                          >
                            Save Image
                          </button>
                          <button
                            type="button"
                            onClick={() => { setQuickEditId(null); setQuickImgUrl(''); }}
                            className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { setQuickEditId(selectedAnnouncement.id); setQuickImgUrl(selectedAnnouncement.imageUrl || ''); }}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        Change bulletin image
                      </button>
                    )}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                  <span>By Order of the Board of Directors</span>
                  <button
                    type="button"
                    onClick={() => setSelectedAnnouncement(null)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-xs"
                  >
                    Close Notice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Imigongo skeleton ribbon connecting to footer */}
      <div className="mt-16">
        <ImigongoRibbon height={18} variant="light" bordered={true} />
      </div>
    </section>
  );
};
