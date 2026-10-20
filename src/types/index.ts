export type Language = 'en' | 'rw' | 'fr';

export type ThemeColor = 'emerald' | 'ochre' | 'blue' | 'teal' | 'terracotta' | 'charcoal' | 'black';

export interface ThemeOption {
  id: ThemeColor;
  nameEn: string;
  nameRw: string;
  nameFr?: string;
  primaryHex: string;
  accentHex: string;
  bgLightHex: string;
  badgeLabel: string;
}

export interface SaccoProduct {
  id: string;
  category: 'savings' | 'loans' | 'digital';
  titleEn: string;
  titleRw: string;
  taglineEn: string;
  taglineRw: string;
  interestRate: string;
  minAmount: number;
  maxAmount: number;
  duration: string;
  featuresEn: string[];
  featuresRw: string[];
  requirementsEn: string[];
  requirementsRw: string[];
  popular?: boolean;
}

export interface BranchOutpost {
  id: string;
  name: string;
  sector: string;
  locationDetailsEn: string;
  locationDetailsRw: string;
  managerName: string;
  managerPhone: string;
  operatingHours: string;
  cashService?: boolean;
  momoAgent?: boolean;
  subBranches?: { id: string; name: string; sector: string; managerName: string; phone: string }[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Announcement {
  id: string;
  titleEn: string;
  titleRw: string;
  date: string;
  category: 'agm' | 'dividend' | 'loan_window' | 'notice';
  summaryEn: string;
  summaryRw: string;
  contentEn: string;
  contentRw: string;
  imageUrl?: string;
}

export interface LeaderMember {
  id: string;
  name: string;
  roleEn: string;
  roleRw: string;
  category: string;
  qualificationEn: string;
  qualificationRw: string;
  imageUrl: string;
  phone?: string;
}

export interface InstitutionMoment {
  id: string;
  titleEn: string;
  titleRw: string;
  date: string;
  category: 'agm_dividend' | 'award' | 'community' | 'branch_opening' | 'training';
  imageUrl: string;
  additionalImages?: string[];
  captionEn: string;
  captionRw: string;
}

export interface ApplicationRecord {
  id: string;
  appNumber: string;
  fullName: string;
  idNumber: string;
  phone: string;
  sector: string;
  accountType: string;
  occupation: string;
  initialAmount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MemberAccount {
  accountNumber: string;
  holderName: string;
  sector: string;
  accountType: string;
  balanceRwf: number;
  compulsorySavingsRwf: number;
  activeLoanBalanceRwf: number;
  sharesCount: number;
  joinedYear: number;
  phone: string;
  transactions: {
    id: string;
    date: string;
    type: 'deposit' | 'withdrawal' | 'loan_repayment' | 'dividend';
    amount: number;
    channel: 'MoMo' | 'Teller' | 'Agent' | 'Dividend';
    reference: string;
  }[];
}

export interface SaccoContactInfo {
  name: string;
  shortName: string;
  district: string;
  province: string;
  headquarters: string;
  phone: string;
  managerPhone: string;
  email: string;
  supportEmail: string;
  whatsapp: string;
  whatsappMessage: string;
  ussdCode: string;
  operatingHoursEn: string;
  operatingHoursRw: string;
  weekdayHours?: string;
  saturdayHours?: string;
  sundayHours?: string;
  rcaRegistration: string;
  regulatoryLicense?: string;
  bnrLicense?: string;
  activeMembers: number;
  totalSavingsRwf: number;
  totalLoansDisbursedRwf: number;
  annualDividendPercent: number;
  sectorsCovered: number;
  branchesCount: number;
  yearFounded: number;
}

export interface NavItemConfig {
  id: string;
  labelEn: string;
  labelRw: string;
  labelFr?: string;
  targetSection: string;
  visible: boolean;
  isPrimary?: boolean;
}

export interface ManagerMessage {
  id: string;
  titleEn: string;
  titleRw: string;
  bodyEn: string;
  bodyRw: string;
  authorName: string;
  authorRole: string;
  date: string;
  showOnHome: boolean;
  showOnAbout: boolean;
  active: boolean;
  imageUrl?: string;
}

export interface SystemImagesConfig {
  saccoLogo?: string;
  heroBanking: string;
  heroSlides?: string[];
  farmersCoop: string;
  entrepreneur: string;
  governance: string;
  managerPortrait?: string;
  boardChairPortrait?: string;
  bartazalPortrait?: string;
  [key: string]: any;
}

export interface JobPosting {
  id: string;
  titleEn: string;
  titleRw: string;
  departmentEn: string;
  departmentRw: string;
  location: string;
  employmentType: 'full_time' | 'contract' | 'internship';
  salaryRange?: string;
  deadline: string;
  status: 'open' | 'closed';
  descriptionEn: string;
  descriptionRw: string;
  requirementsEn: string[];
  requirementsRw: string[];
  responsibilitiesEn: string[];
  responsibilitiesRw: string[];
  postedDate: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  nationalId: string;
  residenceSector: string;
  educationLevel: string;
  yearsExperience: number;
  coverLetter: string;
  cvFileName?: string;
  cvFileData?: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'not_shortlisted' | 'interview' | 'rejected' | 'accepted' | 'waitlisted';
  notes?: string;
  comment?: string;
  comments?: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
  }>;
  verified?: boolean;
  verifiedDetails?: {
    nidValid: boolean;
    phoneValid: boolean;
    documentsValid: boolean;
    verifiedBy?: string;
    verifiedDate?: string;
  };
  rating?: number;
  emailFeedbackSent?: boolean;
  lastFeedbackDate?: string;
  lastFeedbackSubject?: string;
  lastFeedbackMessage?: string;
}
export interface CommunityImpactStory {
  id: string;
  name: string;
  roleEn: string;
  roleRw: string;
  image: string;
  quoteEn: string;
  quoteRw: string;
  metric: string;
}

export interface HomeVideoItem {
  id: string;
  titleEn: string;
  titleRw: string;
  descriptionEn?: string;
  descriptionRw?: string;
  videoUrl: string; // can be data URL, mp4 url, or YouTube/Vimeo embed
  thumbnailUrl?: string;
  badge?: string;
  featured?: boolean;
}

export interface HeroContentConfig {
  districtBadgeEn: string;
  districtBadgeRw: string;
  headlinePrefixEn: string;
  headlinePrefixRw: string;
  headlineFocusEn: string;
  headlineFocusRw: string;
  headlineSuffixEn: string;
  headlineSuffixRw: string;
  subheadingEn: string;
  subheadingRw: string;
  ctaJoinEn: string;
  ctaJoinRw: string;
  ctaCalculatorEn: string;
  ctaCalculatorRw: string;
}

export interface HomeMetricItem {
  id: string;
  value: string;
  labelEn: string;
  labelRw: string;
  labelFr?: string;
  detailEn: string;
  detailRw: string;
  detailFr?: string;
  iconName: string; // 'users' | 'piggy' | 'landmark' | 'building' | 'shield' | 'trending' | 'award' | 'star'
  colorClass: string;
  bgClass: string;
}

export interface AboutValueItem {
  id: string;
  titleEn: string;
  titleRw: string;
  descEn: string;
  descRw: string;
  iconName: string; // 'heart' | 'shield' | 'target' | 'award' | 'users' | 'check'
}

export interface AboutContentConfig {
  badgeTitleEn: string;
  badgeTitleRw: string;
  mainTitleEn: string;
  mainTitleRw: string;
  subtitleEn: string;
  subtitleRw: string;
  regulationNoticeEn: string;
  regulationNoticeRw: string;
  storyP1En: string;
  storyP1Rw: string;
  storyP2En: string;
  storyP2Rw: string;
  imageUrl?: string;
  imageCaptionEn: string;
  imageCaptionRw: string;
  values: AboutValueItem[];
}

export interface StaffMember {
  id: string;
  nameEn: string;
  nameRw: string;
  roleEn: string;
  roleRw: string;
  email: string;
  phone?: string;
  status: 'active' | 'left';
}

export const INITIAL_STAFF: StaffMember[] = [];


