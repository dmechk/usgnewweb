import React, { useState } from 'react';
import { Language, InstitutionMoment } from '../types';
import { SACCO_INFO, SACCO_PHOTO_ALBUM } from '../data/saccoData';
import {
  Sparkles,
  Camera,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Calendar,
  Trophy,
  PiggyBank,
  Building2,
  Users,
  GraduationCap,
  Eye,
  Lock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Grid,
  Filter,
  Maximize2,
  Download,
  Share2,
} from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';
import { ImageUploader } from './ImageUploader';

interface GalleryProps {
  currentLang: Language;
  moments: InstitutionMoment[];
  isAdmin: boolean;
  onAddMoment: (moment: Omit<InstitutionMoment, 'id'>) => void;
  onUpdateMoment: (id: string, updated: Partial<InstitutionMoment>) => void;
  onDeleteMoment: (id: string) => void;
  onOpenManagerLogin?: () => void;
  onOpenAdminConsole?: (tab?: string) => void;
}

const PRESET_MOMENT_IMAGES = [
  {
    label: 'Dividend Distribution Celebration',
    url: '/src/assets/images/moment_dividend_celebration_1791994900250.jpg',
  },
  {
    label: 'National Excellence Award Trophy',
    url: '/src/assets/images/moment_cooperative_award_1791994900000.jpg',
  },
  {
    label: 'Modern Banking Hall Launch',
    url: '/src/assets/images/hero_sacco_banking_1791989969362.jpg',
  },
  {
    label: 'Coffee Farmers Harvest Support',
    url: '/src/assets/images/farmers_cooperative_1791989969904.jpg',
  },
  {
    label: 'Governance Assembly Delegates',
    url: '/src/assets/images/community_governance_1791989970347.jpg',
  },
  {
    label: 'Retail & Women Entrepreneurs',
    url: '/src/assets/images/entrepreneur_business_1791989970089.jpg',
  },
  {
    label: 'General Manager Desk',
    url: '/src/assets/images/mbitsemunda_phocas_desk.jpg',
  },
  {
    label: 'Board Director Speaking',
    url: '/src/assets/images/bartazal_speaking.jpg',
  },
];

export const Gallery: React.FC<GalleryProps> = ({
  currentLang,
  moments,
  isAdmin,
  onAddMoment,
  onUpdateMoment,
  onDeleteMoment,
  onOpenManagerLogin,
  onOpenAdminConsole,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Multi-photo Lightbox state
  const [activeMomentDetail, setActiveMomentDetail] = useState<InstitutionMoment | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Full Album Explorer Modal state
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [albumFilter, setAlbumFilter] = useState('all');
  const [activeAlbumPhoto, setActiveAlbumPhoto] = useState<any | null>(null);

  // CRUD Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMoment, setEditingMoment] = useState<InstitutionMoment | null>(null);

  // Form Fields
  const [titleEn, setTitleEn] = useState('');
  const [titleRw, setTitleRw] = useState('');
  const [eventDate, setEventDate] = useState('October 2026');
  const [category, setCategory] = useState<InstitutionMoment['category']>('award');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/moment_cooperative_award_1791994900000.jpg');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [newExtraImgUrl, setNewExtraImgUrl] = useState('');
  const [captionEn, setCaptionEn] = useState('');
  const [captionRw, setCaptionRw] = useState('');

  // Quick photo upload in Lightbox
  const [isAddingLightboxPhoto, setIsAddingLightboxPhoto] = useState(false);
  const [lightboxNewPhotoUrl, setLightboxNewPhotoUrl] = useState('');

  const filteredMoments = moments.filter((m) => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  const openCreateModal = () => {
    setEditingMoment(null);
    setTitleEn('');
    setTitleRw('');
    setEventDate('Current Milestone');
    setCategory('award');
    setImageUrl('/src/assets/images/moment_cooperative_award_1791994900000.jpg');
    setAdditionalImages([]);
    setNewExtraImgUrl('');
    setCaptionEn('');
    setCaptionRw('');
    setIsFormModalOpen(true);
  };

  const openEditModal = (moment: InstitutionMoment) => {
    setEditingMoment(moment);
    setTitleEn(moment.titleEn);
    setTitleRw(moment.titleRw);
    setEventDate(moment.date);
    setCategory(moment.category);
    setImageUrl(moment.imageUrl);
    setAdditionalImages(moment.additionalImages || [moment.imageUrl]);
    setNewExtraImgUrl('');
    setCaptionEn(moment.captionEn);
    setCaptionRw(moment.captionRw);
    setIsFormModalOpen(true);
  };

  const handleOpenMomentPhotos = (moment: InstitutionMoment) => {
    setActiveMomentDetail(moment);
    setActivePhotoIndex(0);
    setIsAddingLightboxPhoto(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn || !imageUrl) return;

    // ensure primary imageUrl is included in additionalImages
    const cleanAddl = Array.from(new Set([imageUrl, ...(additionalImages.filter(Boolean))]));

    if (editingMoment) {
      onUpdateMoment(editingMoment.id, {
        titleEn,
        titleRw: titleRw || titleEn,
        date: eventDate,
        category,
        imageUrl,
        additionalImages: cleanAddl,
        captionEn,
        captionRw: captionRw || captionEn,
      });
    } else {
      onAddMoment({
        titleEn,
        titleRw: titleRw || titleEn,
        date: eventDate,
        category,
        imageUrl,
        additionalImages: cleanAddl,
        captionEn,
        captionRw: captionRw || captionEn,
      });
    }
    setIsFormModalOpen(false);
  };

  // Add extra image in form
  const handleAddExtraFormImage = () => {
    if (newExtraImgUrl.trim()) {
      setAdditionalImages((prev) => [...prev, newExtraImgUrl.trim()]);
      setNewExtraImgUrl('');
    }
  };

  const handleRemoveExtraFormImage = (indexToRemove: number) => {
    setAdditionalImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Lightbox photo helpers
  const getCurrentMomentPhotos = (moment: InstitutionMoment | null): string[] => {
    if (!moment) return [];
    if (moment.additionalImages && moment.additionalImages.length > 0) {
      return Array.from(new Set([moment.imageUrl, ...moment.additionalImages]));
    }
    return [moment.imageUrl];
  };

  const activePhotos = getCurrentMomentPhotos(activeMomentDetail);

  const handleNextPhoto = () => {
    if (activePhotos.length > 1) {
      setActivePhotoIndex((prev) => (prev + 1) % activePhotos.length);
    }
  };

  const handlePrevPhoto = () => {
    if (activePhotos.length > 1) {
      setActivePhotoIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
    }
  };

  // Add photo directly from Lightbox
  const handleSaveLightboxPhoto = () => {
    if (activeMomentDetail && lightboxNewPhotoUrl.trim()) {
      const updatedPhotos = Array.from(new Set([...activePhotos, lightboxNewPhotoUrl.trim()]));
      onUpdateMoment(activeMomentDetail.id, {
        additionalImages: updatedPhotos,
      });
      setActiveMomentDetail((prev) => prev ? { ...prev, additionalImages: updatedPhotos } : null);
      setActivePhotoIndex(updatedPhotos.length - 1);
      setLightboxNewPhotoUrl('');
      setIsAddingLightboxPhoto(false);
    }
  };

  // Delete current photo from milestone
  const handleDeleteCurrentLightboxPhoto = () => {
    if (!activeMomentDetail || activePhotos.length <= 1) return;
    const photoToDelete = activePhotos[activePhotoIndex];
    const updatedPhotos = activePhotos.filter((_, idx) => idx !== activePhotoIndex);
    const newPrimary = activeMomentDetail.imageUrl === photoToDelete ? updatedPhotos[0] : activeMomentDetail.imageUrl;

    onUpdateMoment(activeMomentDetail.id, {
      imageUrl: newPrimary,
      additionalImages: updatedPhotos,
    });
    setActiveMomentDetail((prev) => prev ? { ...prev, imageUrl: newPrimary, additionalImages: updatedPhotos } : null);
    setActivePhotoIndex(Math.max(0, activePhotoIndex - 1));
  };

  const getCategoryBadge = (cat: InstitutionMoment['category']) => {
    switch (cat) {
      case 'award':
        return {
          icon: <Trophy className="w-3.5 h-3.5 text-amber-500" />,
          label: currentLang === 'en' ? 'Excellence Award' : 'Igihembo cy\'Indashyikirwa',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'agm_dividend':
        return {
          icon: <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />,
          label: currentLang === 'en' ? 'Dividends & AGM' : 'Inyungu & Inama Rusange',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'branch_opening':
        return {
          icon: <Building2 className="w-3.5 h-3.5 text-blue-600" />,
          label: currentLang === 'en' ? 'Branch & Digital Launch' : 'Gufungura Amashami',
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
        };
      case 'community':
        return {
          icon: <Users className="w-3.5 h-3.5 text-purple-600" />,
          label: currentLang === 'en' ? 'Farmer & Community Payout' : 'Abahinzi & Umuryango',
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
        };
      case 'training':
        return {
          icon: <GraduationCap className="w-3.5 h-3.5 text-teal-600" />,
          label: currentLang === 'en' ? 'Training & Graduation' : 'Amahugurwa',
          bg: 'bg-teal-50 text-teal-800 border-teal-200',
        };
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-slate-600" />,
          label: currentLang === 'en' ? 'Cooperative Moment' : 'Ibihe Byiza',
          bg: 'bg-slate-50 text-slate-800 border-slate-200',
        };
    }
  };

  // Compile full photo album list
  const fullAlbumList = [
    ...moments.flatMap((m) => {
      const allMImgs = getCurrentMomentPhotos(m);
      return allMImgs.map((img, idx) => ({
        id: `${m.id}-${idx}`,
        titleEn: `${m.titleEn} (Photo ${idx + 1})`,
        titleRw: m.titleRw,
        category: m.category,
        categoryLabel: m.category.replace('_', ' ').toUpperCase(),
        date: m.date,
        imageUrl: img,
        description: m.captionEn,
        momentRef: m,
      }));
    }),
    ...SACCO_PHOTO_ALBUM,
  ];

  // Deduplicate by imageUrl
  const uniqueAlbumPhotos = Array.from(
    new Map(fullAlbumList.map((item) => [item.imageUrl, item])).values()
  );

  const filteredAlbumPhotos = uniqueAlbumPhotos.filter((item) => {
    if (albumFilter === 'all') return true;
    return item.category === albumFilter;
  });

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>
                {currentLang === 'fr'
                  ? 'Moments Mémorables & Galerie Photos'
                  : currentLang === 'rw'
                  ? "Ibiganiro n'Amafoto y'Aho Tugeze"
                  : 'Memorable Milestones & Photo Gallery'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              {currentLang === 'fr'
                ? 'Galerie · UBUMWE SACCO GAKENKE'
                : currentLang === 'rw'
                ? "Amafoto y'Ikigo · UBUMWE SACCO GAKENKE"
                : 'Gallery · UBUMWE SACCO GAKENKE'}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-3xl">
              {currentLang === 'fr'
                ? "Célébrant les plus belles réussites de notre institution : trophées d'excellence nationale, distributions de dividendes, lancements bancaires modernes et soutien des agriculteurs de Gakenke."
                : currentLang === 'rw'
                ? "Ibyishimo n'intambwe ikomeye koperative yacu imaze gutera: ibikombe by'indashyikirwa, iminsi mikuru yo kugabana inyungu, gufungura ibiro bigezweho no gushyigikira abahinzi n'aborozi bo muri Gakenke."
                : 'Celebrating the proudest achievements in our institution: national excellence trophies, historic dividend payouts, modern banking launches, and farmer empowerment led by Board Director Wellarse and Manager Mbitsemunda Phocas.'}
            </p>
          </div>

          {/* Action Buttons: View All Photos & Admin Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Explore All Photos Button */}
            <button
              type="button"
              onClick={() => setIsAlbumModalOpen(true)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Grid className="w-4 h-4 text-emerald-400" />
              <span>
                {currentLang === 'fr'
                  ? `Explorer Toutes les Photos (${uniqueAlbumPhotos.length}+)`
                  : currentLang === 'rw'
                  ? `Reba Amafoto Yose (${uniqueAlbumPhotos.length}+)`
                  : `Explore All Photos (${uniqueAlbumPhotos.length}+)`}
              </span>
            </button>

            {/* Admin Add Moment Button */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Best Moment</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAdminConsole?.('moments')}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  title="Open Admin Gallery Console"
                >
                  <Camera className="w-4 h-4 text-emerald-700" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Admin Quick Action Strip (When Logged in) */}
        {isAdmin && (
          <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>
                <strong>Manager Gallery Mode:</strong> You can click any photo card to view all photos, add more photos, edit details, or delete.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCreateModal}
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Photos</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenAdminConsole?.('moments')}
                className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 rounded-lg font-bold border border-slate-200 cursor-pointer"
              >
                Manage in Admin Console
              </button>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Milestones ({moments.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('agm_dividend')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'agm_dividend'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Dividends &amp; AGM
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('award')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'award'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Awards &amp; Recognition
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('branch_opening')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'branch_opening'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Banking Hall &amp; Tech
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('community')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'community'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Farmers &amp; Community
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('training')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'training'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Training &amp; Empowerment
          </button>
        </div>

        {/* Moments Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredMoments.map((moment) => {
            const badge = getCategoryBadge(moment.category);
            const momentPhotos = getCurrentMomentPhotos(moment);

            return (
              <div
                key={moment.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Photo Container with Zoom Effect */}
                  <div
                    className="aspect-[16/10] w-full overflow-hidden relative bg-slate-900 cursor-pointer"
                    onClick={() => handleOpenMomentPhotos(moment)}
                  >
                    <img
                      src={moment.imageUrl}
                      alt={moment.titleEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md bg-white/90 shadow-xs ${badge.bg}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {/* Multi-Photo Count Pill */}
                    {momentPhotos.length > 1 && (
                      <div className="absolute top-3 right-3 z-20 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                        <Camera className="w-3 h-3 text-emerald-400" />
                        <span>{momentPhotos.length} Photos</span>
                      </div>
                    )}

                    {/* Date / Milestone pill */}
                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 text-[11px] text-white/90 font-medium">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span>{moment.date}</span>
                    </div>

                    {/* Quick view icon */}
                    <div className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4 text-emerald-400" />
                    </div>

                    {/* Admin Action Buttons on Photo */}
                    {isAdmin && (
                      <div
                        className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/85 backdrop-blur-md p-1 rounded-lg border border-slate-700 z-30"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => openEditModal(moment)}
                          className="p-1.5 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
                          title="Edit this moment"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteMoment(moment.id)}
                          className="p-1.5 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete moment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Moment Details with Clear High-Contrast Typography */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      <span>{badge.label}</span>
                      <span>•</span>
                      <span className="text-slate-500 font-medium">{moment.date}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 leading-snug group-hover:text-emerald-900 transition-colors">
                      {currentLang === 'en' ? moment.titleEn : moment.titleRw}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentLang === 'en' ? moment.captionEn : moment.captionRw}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => handleOpenMomentPhotos(moment)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 hover:border-emerald-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-4 h-4" />
                    <span>
                      {momentPhotos.length > 1
                        ? `Inspect All ${momentPhotos.length} Photos & Read Words`
                        : (currentLang === 'en' ? 'Enlarge Picture & Read Words' : 'Reba Ifoto Neza n\'Amagambo Yanditseho')}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Explore All Photos CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1.5 text-center sm:text-left z-10">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              UBUMWE SACCO GAKENKE · Complete Media Archive
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Want to see more institutional moments and field stories?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Browse our complete archive of banking hall photos, farmer washing station visits, excellence trophies, and community celebrations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAlbumModalOpen(true)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer z-10"
          >
            <Camera className="w-4 h-4" />
            <span>Open Complete Photo Album</span>
          </button>
        </div>
      </div>

      {/* FULL-PAGE IMMERSIVE PHOTO & MILESTONE READER (Full Page Instead of Popup) */}
      {activeMomentDetail && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col animate-in fade-in duration-200">
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveMomentDetail(null)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {currentLang === 'fr'
                  ? 'Retour à la Galerie'
                  : currentLang === 'rw'
                  ? 'Subira ku Mafoto'
                  : 'Back to Photo Gallery'}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-700">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>Photo {activePhotoIndex + 1} of {activePhotos.length} · UBUMWE SACCO GAKENKE Media Archive</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAlbumModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
              >
                <Grid className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Browse Full Album</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMomentDetail(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <ImigongoRibbon height={8} variant="light" bordered={false} />

          <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col p-4 sm:p-8 space-y-6">

            {/* Photo Viewing Area */}
            <div className="relative bg-slate-950 flex items-center justify-center min-h-[340px] sm:min-h-[460px] max-h-[540px] overflow-hidden group select-none">
              <img
                src={activePhotos[activePhotoIndex] || activeMomentDetail.imageUrl}
                alt={activeMomentDetail.titleEn}
                className="max-h-[540px] w-full object-contain transition-transform duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              {activePhotos.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/85 hover:bg-emerald-700 text-white shadow-xl transition-all cursor-pointer z-20"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {activePhotos.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/85 hover:bg-emerald-700 text-white shadow-xl transition-all cursor-pointer z-20"
                  title="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Top Photo Counter Pill */}
              <div className="absolute top-3 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-slate-700 flex items-center gap-2 z-20 shadow-lg">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>
                  Photo {activePhotoIndex + 1} of {activePhotos.length}
                </span>
              </div>

              {/* Date Badge */}
              <div className="absolute bottom-3 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300 border border-slate-700 z-20 flex items-center gap-1.5 shadow-lg">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeMomentDetail.date}</span>
              </div>
            </div>

            {/* Clickable Thumbnail Strip */}
            {activePhotos.length > 1 && (
              <div className="bg-slate-900 p-3 flex items-center gap-2 overflow-x-auto shrink-0 border-t border-slate-800">
                {activePhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activePhotoIndex === idx
                        ? 'border-emerald-500 scale-105 shadow-md'
                        : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Story & Admin Controls Area */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    UBUMWE SACCO GAKENKE · Institutional Milestone
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-slate-600">
                    Category: {activeMomentDetail.category.replace('_', ' ')}
                  </span>
                </div>

                {/* Admin Controls in Lightbox */}
                {isAdmin && (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingLightboxPhoto(!isAddingLightboxPhoto)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Another Photo</span>
                    </button>

                    {activePhotos.length > 1 && (
                      <button
                        type="button"
                        onClick={handleDeleteCurrentLightboxPhoto}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-red-200 cursor-pointer"
                        title="Remove current photo from this milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Photo</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const m = activeMomentDetail;
                        setActiveMomentDetail(null);
                        openEditModal(m);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Story</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Admin Inline Add Photo Form inside Lightbox */}
              {isAddingLightboxPhoto && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-700" />
                      <span>Upload &amp; Add Photo to this Milestone</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingLightboxPhoto(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <ImageUploader
                    value={lightboxNewPhotoUrl}
                    onChange={(url) => setLightboxNewPhotoUrl(url)}
                    label="Select Photo from Device or URL"
                    aspectRatio="video"
                    presets={PRESET_MOMENT_IMAGES}
                    helpText="Upload a photo file from your phone/computer or choose a preset."
                  />

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingLightboxPhoto(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!lightboxNewPhotoUrl.trim()}
                      onClick={handleSaveLightboxPhoto}
                      className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Photo to Milestone</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Story Narrative & Words Container */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                      Official Milestone Narrative · Amagambo n'Inkuru
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 mt-0.5">
                      {currentLang === 'en' ? activeMomentDetail.titleEn : activeMomentDetail.titleRw}
                    </h3>
                  </div>

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        const m = activeMomentDetail;
                        setActiveMomentDetail(null);
                        openEditModal(m);
                      }}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Words &amp; Story</span>
                    </button>
                  )}
                </div>

                {/* Primary Readable Story Box (Clear High-Contrast Typography) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white shadow-md space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Cooperative Achievement Highlights</span>
                    </span>
                    <span className="text-slate-300 font-medium">UBUMWE SACCO GAKENKE</span>
                  </div>

                  <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                    "{currentLang === 'en' ? activeMomentDetail.captionEn : activeMomentDetail.captionRw}"
                  </p>
                </div>

                {/* Secondary Language Translation (so members and visitors can read both English and Kinyarwanda clearly) */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800 block">
                    {currentLang === 'en' ? 'Kinyarwanda Version / Mu Kinyarwanda:' : 'English Version / Mu Cyongereza:'}
                  </span>
                  <p className="italic leading-relaxed">
                    {currentLang === 'en' ? activeMomentDetail.captionRw : activeMomentDetail.captionEn}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                <span>By Order of the Board of Directors &amp; Management</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAlbumModalOpen(true)}
                    className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>View More Photos in Album</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMomentDetail(null)}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETE PHOTO ALBUM EXPLORER MODAL */}
      {isAlbumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden relative shadow-2xl border border-slate-200 my-8 flex flex-col max-h-[92vh]">
            <ImigongoRibbon height={8} variant="light" bordered={false} />

            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <Camera className="w-3.5 h-3.5" />
                  <span>UBUMWE SACCO GAKENKE · Complete Photo Library</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Cooperative Photo Album ({uniqueAlbumPhotos.length} High-Resolution Photos)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAlbumModalOpen(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-slate-100 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Category:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setAlbumFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    albumFilter === 'all'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Photos ({uniqueAlbumPhotos.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAlbumFilter('agm_dividend')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    albumFilter === 'agm_dividend'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Dividends &amp; AGM
                </button>
                <button
                  type="button"
                  onClick={() => setAlbumFilter('award')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    albumFilter === 'award'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Awards
                </button>
                <button
                  type="button"
                  onClick={() => setAlbumFilter('branch_opening')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    albumFilter === 'branch_opening'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Banking Hall
                </button>
                <button
                  type="button"
                  onClick={() => setAlbumFilter('community')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    albumFilter === 'community'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Farmers &amp; Community
                </button>
                <button
                  type="button"
                  onClick={() => setAlbumFilter('leadership')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    albumFilter === 'leadership'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Leadership
                </button>
              </div>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setIsAlbumModalOpen(false);
                    openCreateModal();
                  }}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                </button>
              )}
            </div>

            {/* Album Grid Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAlbumPhotos.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveAlbumPhoto(item)}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-slate-700">
                          {item.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Permanent Clear Words beneath each photo */}
                    <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <h4 className="text-xs font-bold text-slate-950 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                          {item.titleEn}
                        </h4>
                        {item.description && (
                          <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                        <span>{item.date}</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span className="font-medium text-slate-700">Click any photo card to inspect in full resolution and read all written context.</span>
              <button
                type="button"
                onClick={() => setIsAlbumModalOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
              >
                Close Album
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SINGLE PHOTO ENLARGED VIEW FROM ALBUM (WITH CRYSTAL CLEAR WORDS) */}
      {activeAlbumPhoto && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden relative shadow-2xl border border-slate-200 my-6 flex flex-col max-h-[94vh]">
            <ImigongoRibbon height={8} variant="light" bordered={false} />

            <button
              type="button"
              onClick={() => setActiveAlbumPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Clear Image Viewing Area */}
            <div className="max-h-[500px] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              <img
                src={activeAlbumPhoto.imageUrl}
                alt={activeAlbumPhoto.titleEn}
                className="max-h-[500px] w-full object-contain"
              />
            </div>

            {/* Clear High-Contrast Words & Context Panel */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {activeAlbumPhoto.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">·</span>
                  <span className="text-xs text-slate-700 font-semibold">{activeAlbumPhoto.date}</span>
                </div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  UBUMWE SACCO GAKENKE ARCHIVE
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  {activeAlbumPhoto.titleEn}
                </h3>
                {activeAlbumPhoto.titleRw && activeAlbumPhoto.titleRw !== activeAlbumPhoto.titleEn && (
                  <h4 className="text-base font-bold text-emerald-800 mt-0.5">
                    {activeAlbumPhoto.titleRw}
                  </h4>
                )}
              </div>

              {activeAlbumPhoto.description && (
                <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-sm space-y-2">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Detailed Words &amp; Context on this Milestone:
                  </span>
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                    "{activeAlbumPhoto.description}"
                  </p>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
                <span className="text-slate-500 font-medium">Preserving cooperative legacy in Gakenke District.</span>
                <button
                  type="button"
                  onClick={() => setActiveAlbumPhoto(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Back to Album
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MOMENT MODAL (WITH MULTI-PHOTO SUPPORT) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full relative shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <ImigongoRibbon height={10} variant="light" bordered={false} />

            <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-xl font-bold">
                  {editingMoment ? 'Edit Best Moment & Photos' : 'Post New Best Moment & Photo Gallery'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Showcase institutional triumphs, dividend days, and farmer milestones
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Moment Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. 450M RWF Annual Dividend Day"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Moment Title (Kinyarwanda)</label>
                  <input
                    type="text"
                    value={titleRw}
                    onChange={(e) => setTitleRw(e.target.value)}
                    placeholder="e.g. Umunsi Mukuru wo Guhemba Abanyamuryango"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  >
                    <option value="award">Excellence Award / Igikombe</option>
                    <option value="agm_dividend">Dividends &amp; AGM / Inyungu</option>
                    <option value="branch_opening">Branch &amp; Tech / Amashami</option>
                    <option value="community">Farmer &amp; Community Payout</option>
                    <option value="training">Training &amp; Graduation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Milestone Date or Season</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="e.g. October 2026 or Harvest Season"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Primary Image Uploader */}
              <ImageUploader
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                label="Primary Showcase Photo (Upload or URL) *"
                aspectRatio="video"
                presets={PRESET_MOMENT_IMAGES}
                helpText="This is the main photo displayed on the card and in the hero of the story."
              />

              {/* Additional Photos for this Moment */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-emerald-700" />
                    <span>Additional Photos for this Milestone ({additionalImages.length})</span>
                  </span>
                  <span className="text-[11px] text-slate-500">Users will see all photos in the viewer</span>
                </div>

                {additionalImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {additionalImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-300 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveExtraFormImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-red-600/90 hover:bg-red-700 text-white rounded-md shadow-xs transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newExtraImgUrl}
                    onChange={(e) => setNewExtraImgUrl(e.target.value)}
                    placeholder="Enter additional photo URL or upload below..."
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddExtraFormImage}
                    disabled={!newExtraImgUrl.trim()}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shrink-0 disabled:opacity-50 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Story / Description (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                  placeholder="Details of the event, leadership present, and member reaction..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Story / Description (Kinyarwanda)</label>
                <textarea
                  rows={3}
                  value={captionRw}
                  onChange={(e) => setCaptionRw(e.target.value)}
                  placeholder="Ibisobanuro mu Kinyarwanda..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingMoment ? 'Update Milestone & Photos' : 'Publish Milestone'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
