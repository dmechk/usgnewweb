import {
  SaccoProduct,
  BranchOutpost,
  Announcement,
  MemberAccount,
  LeaderMember,
  ApplicationRecord,
  InstitutionMoment,
  ThemeOption,
  SaccoContactInfo,
  NavItemConfig,
  SystemImagesConfig,
  ManagerMessage,
  JobPosting,
  JobApplication,
  HeroContentConfig,
  HomeMetricItem,
  AboutContentConfig,
  AboutValueItem,
} from '../types';

export const SACCO_INFO: SaccoContactInfo = {
  name: "UBUMWE SACCO GAKENKE",
  shortName: "UBUMWE SACCO GAKENKE",
  district: "Gakenke District",
  province: "Northern Province, Rwanda",
  headquarters: "Gakenke Commercial Center, Sector Gakenke, Northern Province",
  phone: "0786422080",
  managerPhone: "0786422080",
  email: "ubumwesaccogakenke@gmail.com",
  supportEmail: "ubumwesaccogakenke@gmail.com",
  whatsapp: "250786422080",
  whatsappMessage: "Hello UBUMWE SACCO GAKENKE, I would like to inquire about cooperative services.",
  ussdCode: "*541#",
  operatingHoursEn: "Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM",
  operatingHoursRw: "Kuwa Mbere - Kuwa Gatanu: Saa 8:00 - 17:00 | Kuwa Gatandatu: Saa 8:00 - 13:00",
  weekdayHours: "Mon - Fri: 8:00 AM - 5:00 PM",
  saturdayHours: "Sat: 8:00 AM - 1:00 PM",
  sundayHours: "Closed (USSD & Digital banking active 24/7)",
  rcaRegistration: "RCA / COOP / 042 / 2011",
  regulatoryLicense: "RCA Microfinance Certified License No. RCA-MF-2012-088",
  bnrLicense: "RCA Microfinance Certified License No. RCA-MF-2012-088",
  activeMembers: 18640,
  totalSavingsRwf: 4850000000,
  totalLoansDisbursedRwf: 3620000000,
  annualDividendPercent: 9.8,
  sectorsCovered: 13,
  branchesCount: 6,
  yearFounded: 2011,
};

export const INITIAL_NAV_ITEMS: NavItemConfig[] = [
  { id: 'nav-home', labelEn: 'Home', labelRw: 'Ahabanza', labelFr: 'Accueil', targetSection: 'hero', visible: true },
  { id: 'nav-about', labelEn: 'About Us', labelRw: 'Abo Turibo', labelFr: 'À propos', targetSection: 'about', visible: true },
  { id: 'nav-products', labelEn: 'Our Services', labelRw: 'Serivisi Zacu', labelFr: 'Nos Services', targetSection: 'products', visible: true, isPrimary: true },
  { id: 'nav-leadership', labelEn: 'Board & Staff', labelRw: 'Abayobozi n\'Abakozi', labelFr: 'Conseil & Direction', targetSection: 'leadership', visible: true },
  { id: 'nav-announcements', labelEn: 'News', labelRw: 'Amakuru', labelFr: 'Actualités', targetSection: 'announcements', visible: true },
  { id: 'nav-gallery', labelEn: 'Gallery', labelRw: 'Amafoto', labelFr: 'Galerie', targetSection: 'gallery', visible: true },
  { id: 'nav-careers', labelEn: 'Careers', labelRw: 'Imirimo', labelFr: 'Carrières', targetSection: 'careers', visible: true },
  { id: 'nav-branches', labelEn: 'Branches & Outposts', labelRw: 'Amashami', labelFr: 'Agences & Postes', targetSection: 'branches', visible: true },
  { id: 'nav-contact', labelEn: 'Contact Us', labelRw: 'Twandikire', labelFr: 'Contactez-nous', targetSection: 'contact', visible: true },
];

export const INITIAL_SYSTEM_IMAGES: SystemImagesConfig = {
  saccoLogo: "/src/assets/images/ubumwe_sacco_logo_1792063211447.png",
  heroBanking: "/src/assets/images/mbitsemunda_phocas_desk.jpg",
  heroSlides: [
    "/src/assets/images/mbitsemunda_phocas_desk.jpg",
    "/src/assets/images/hero_sacco_banking_1791989969362.jpg",
    "/src/assets/images/farmers_cooperative_1791989969904.jpg",
    "/src/assets/images/community_governance_1791989970347.jpg",
    "/src/assets/images/entrepreneur_business_1791989970089.jpg"
  ],
  farmersCoop: "/src/assets/images/farmers_cooperative_1791989969904.jpg",
  entrepreneur: "/src/assets/images/entrepreneur_business_1791989970089.jpg",
  governance: "/src/assets/images/community_governance_1791989970347.jpg",
  managerPortrait: "/src/assets/images/mbitsemunda_phocas_desk.jpg",
  boardChairPortrait: "/src/assets/images/portrait_director_wellars_1791994899049.jpg",
  bartazalPortrait: "/src/assets/images/bartazal_speaking.jpg",
};

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'emerald',
    nameEn: 'Ubumwe Emerald (Classic)',
    nameRw: 'Icyatsi cy\'Ubumwe',
    nameFr: 'Émeraude Ubumwe (Classique)',
    primaryHex: '#047857',
    accentHex: '#10b981',
    bgLightHex: '#ecfdf5',
    badgeLabel: 'Default SACCO Green',
  },
  {
    id: 'black',
    nameEn: 'Obsidian Dark Black',
    nameRw: 'Umukara Wijimye (Dark Black)',
    nameFr: 'Noir Sombre Ébène (Dark Black)',
    primaryHex: '#09090b',
    accentHex: '#10b981',
    bgLightHex: '#18181b',
    badgeLabel: 'Deep Pitch Black & Emerald',
  },
  {
    id: 'ochre',
    nameEn: 'Imigongo Ochre & Gold',
    nameRw: 'Zahabu n\'Irangi rya Kera',
    nameFr: 'Ocre & Or Imigongo',
    primaryHex: '#b45309',
    accentHex: '#f59e0b',
    bgLightHex: '#fffbeb',
    badgeLabel: 'Warm Heritage Amber',
  },
  {
    id: 'blue',
    nameEn: 'Akagera Royal Blue',
    nameRw: 'Ubururu bw\'Akagera',
    nameFr: 'Bleu Royal Akagera',
    primaryHex: '#1d4ed8',
    accentHex: '#3b82f6',
    bgLightHex: '#eff6ff',
    badgeLabel: 'Lake & Trust Blue',
  },
  {
    id: 'teal',
    nameEn: 'Virunga Forest Teal',
    nameRw: 'Icyatsi cy\'Ibirunga',
    nameFr: 'Sarcelle Forêt des Virunga',
    primaryHex: '#0f766e',
    accentHex: '#14b8a6',
    bgLightHex: '#f0fdfa',
    badgeLabel: 'Tea Slopes Teal',
  },
  {
    id: 'terracotta',
    nameEn: 'Gakenke Terracotta',
    nameRw: 'Umutuku w\'Ubutaka bw\'Imisozi',
    nameFr: 'Terre Cuite de Gakenke',
    primaryHex: '#c2410c',
    accentHex: '#ea580c',
    bgLightHex: '#fff7ed',
    badgeLabel: 'Rich Volcanic Soil',
  },
  {
    id: 'charcoal',
    nameEn: 'Basalt Charcoal & Silver',
    nameRw: 'Ibuye ry\'Urutare',
    nameFr: 'Anthracite & Argent',
    primaryHex: '#334155',
    accentHex: '#64748b',
    bgLightHex: '#f8fafc',
    badgeLabel: 'Executive Rock Slate',
  },
];

export const SACCO_IMAGES = {
  heroBanking: "/src/assets/images/mbitsemunda_phocas_desk.jpg",
  farmersCoop: "/src/assets/images/farmers_cooperative_1791989969904.jpg",
  entrepreneur: "/src/assets/images/entrepreneur_business_1791989970089.jpg",
  governance: "/src/assets/images/community_governance_1791989970347.jpg",
};

export const SACCO_PRODUCTS: SaccoProduct[] = [
  {
    id: "compulsory_savings",
    category: "savings",
    titleEn: "Compulsory Member Savings (Uruhare)",
    titleRw: "Ubwizigame bw'Uruhare rw'Umunyamuryango",
    taglineEn: "Core cooperative equity generating annual dividends and qualifying members for low-interest loans.",
    taglineRw: "Ubwizigame bw'ifatizo butuma uhabwa inyungu ku migabane kandi bukakwemerera kwaka inguzanyo.",
    interestRate: "9.8% Annual Dividend",
    minAmount: 5000,
    maxAmount: 10000000,
    duration: "Continuous",
    popular: true,
    featuresEn: [
      "Multiplier of up to 4x your accumulated savings for credit",
      "Earns annual profit dividends declared at the AGM",
      "Instant USSD deposits via *541# on your phone",
      "RCA regulated cooperative equity & secure shares"
    ],
    featuresRw: [
      "Bikwemerera kwaka inguzanyo yikubye inshuro 4 z'ubwizigame bwawe",
      "Bihabwa inyungu y'umwaka ku migabane",
      "Kubitsa mu buryo bworoshye ukoresheje USSD *541#",
      "Bifite umutekano wizejwe n'amabwiriza y'amategeko ya koperative na RCA"
    ],
    requirementsEn: [
      "Rwanda National ID (16 Digits)",
      "Initial minimum member share purchase of 10,000 RWF"
    ],
    requirementsRw: [
      "Indangamuntu y'u Rwanda",
      "Kugura umugabane w'ifatizo utari munsi ya 10,000 RWF"
    ]
  },
  {
    id: "term_deposit",
    category: "savings",
    titleEn: "Fixed Term Deposit Account",
    titleRw: "Konti yo Kuzigama Igihe Kirekire",
    taglineEn: "Guaranteed high-yield returns for cooperatives, farmer associations, and individuals.",
    taglineRw: "Inyungu yisumbuye yizewe ku makoperative, amakoperative y'abahinzi n'abantu ku giti cyabo.",
    interestRate: "8.5% - 10.5% per annum",
    minAmount: 100000,
    maxAmount: 50000000,
    duration: "3 to 24 Months",
    featuresEn: [
      "Locked competitive interest rate for fixed tenures",
      "Official Certificate of Term Deposit issued",
      "Usable as collateral for instant member credit"
    ],
    featuresRw: [
      "Inyungu yizewe mu gihe cyose wazigamye",
      "Icyemezo cy'umutungo kizigamye (Certificate)",
      "Bikoreshwa nk'ingwate mu kwaka inguzanyo yihuse"
    ],
    requirementsEn: [
      "Active Ubumwe SACCO Membership",
      "Minimum deposit of 100,000 RWF"
    ],
    requirementsRw: [
      "Kuba uri umunyamuryango wa Ubumwe SACCO",
      "Ubwizigame butari munsi ya 100,000 RWF"
    ]
  },
  {
    id: "agricultural_loan",
    category: "loans",
    titleEn: "Ubuhinzi n'Ubworozi (Agri-Credit)",
    titleRw: "Inguzanyo y'Ubuhinzi n'Ubworozi",
    taglineEn: "Harvest-aligned financing for coffee, tea, maize, Irish potato, and livestock farmers in Gakenke.",
    taglineRw: "Yagenewe abahinzi b'ikawa, icyayi, ibigori, ibirayi n'aborozi bo muri Gakenke.",
    interestRate: "1.1% per month (13.2% p.a.)",
    minAmount: 100000,
    maxAmount: 10000000,
    duration: "4 to 18 Months",
    popular: true,
    featuresEn: [
      "Repayment synchronized with coffee harvest and crop seasons",
      "Up to 4 months grace period before first principal installment",
      "Fertilizer, seed inputs, and equipment coverage"
    ],
    featuresRw: [
      "Kwishyura guhura n'igihe cy'isarura ry'ikawa n'ibindi bihingwa",
      "Amezi agera kuri 4 y'amahirwe utarishyura igishoro",
      "Kugura ifumbire, imbuto n'ibikoresho by'ubuhinzi"
    ],
    requirementsEn: [
      "Active membership with regular savings",
      "Farmland ownership or cooperative certificate"
    ],
    requirementsRw: [
      "Kuba uri umunyamuryango uzigama",
      "Icyemezo cy'ubutaka cyangwa koperative y'ubuhinzi"
    ]
  },
  {
    id: "business_sme_loan",
    category: "loans",
    titleEn: "Ubucuruzi SME Micro-Loan",
    titleRw: "Inguzanyo y'Ubucuruzi n'Amaduka",
    taglineEn: "Working capital for trading shops, transport operators, and artisans in Gakenke markets.",
    taglineRw: "Kongera igishoro cy'amaduka, abafite amagaraje n'abacuruzi mu masoko ya Gakenke.",
    interestRate: "1.25% per month (15% p.a.)",
    minAmount: 200000,
    maxAmount: 15000000,
    duration: "6 to 36 Months",
    popular: true,
    featuresEn: [
      "Working capital injections for stock replenishment",
      "Flexible monthly or bi-weekly installment schedules",
      "Committee review turnaround within 48 to 72 hours"
    ],
    featuresRw: [
      "Kongera igishoro cyo kurangura ibicuruzwa",
      "Kwishyura buri kwezi cyangwa buri byumweru bibiri",
      "Igisubizo mu masaha 48 kugeza kuri 72"
    ],
    requirementsEn: [
      "TIN or trading license (where applicable)",
      "Two acceptable member guarantors"
    ],
    requirementsRw: [
      "Nimero ya TIN cyangwa uruhushya rwo gucuruza",
      "Abishingizi babiri b'abanyamuryango"
    ]
  },
  {
    id: "school_fees_emergency",
    category: "loans",
    titleEn: "School Fees & Emergency Loan (Amashuri)",
    titleRw: "Inguzanyo y'Amafaranga y'Ishuri",
    taglineEn: "Fast 24-hour turnaround to cover tuition deadlines or emergency family needs.",
    taglineRw: "Inguzanyo yihuse mu masaha 24 yo kurihira abana amashuri cyangwa gukemura ibibazo byihutirwa.",
    interestRate: "1.0% per month (12% p.a.)",
    minAmount: 50000,
    maxAmount: 1500000,
    duration: "3 to 12 Months",
    featuresEn: [
      "Direct disbursement to school account or member MoMo",
      "Minimal paperwork for members in good standing",
      "Emergency review within 24 hours"
    ],
    featuresRw: [
      "Kwishyura ako kanya kuri konti y'ishuri cyangwa MoMo",
      "Inyandiko nkeya ku banyamuryango bazigama neza",
      "Kwakirwa no kwemezwa mu masaha 24"
    ],
    requirementsEn: [
      "School admission letter or invoice",
      "Active savings coverage"
    ],
    requirementsRw: [
      "Inyandiko y'ishuri cyangwa fagitire",
      "Ubwizigame busanzwe kuri konti"
    ]
  },
  {
    id: "momo_digital_banking",
    category: "digital",
    titleEn: "USSD Banking (*541#)",
    titleRw: "Gukoresha Telefone (*541#)",
    taglineEn: "Bank 24/7 directly on your handset via *541# across MTN and Airtel networks.",
    taglineRw: "Serivisi za banki amasaha 24/7 kuri telefone yawe ukoresheje *541# kuri MTN na Airtel.",
    interestRate: "0% Commission for Deposits",
    minAmount: 500,
    maxAmount: 2000000,
    duration: "Instant (Real-time)",
    featuresEn: [
      "Dial *541# to check real-time account balances",
      "Deposit directly from Mobile Money to your SACCO savings",
      "Transfer funds or withdraw instantly",
      "Instant SMS transaction alerts"
    ],
    featuresRw: [
      "Kanda *541# urebe amafaranga asigaye kuri konti yawe",
      "Kubitsa uva kuri MoMo werekeza kuri konti yawe ya SACCO",
      "Kubikuza cyangwa kohereza amafaranga ako kanya",
      "Ubutumwa bugufi (SMS) bwihuse bugaragaza ibyakozwe"
    ],
    requirementsEn: [
      "Active telephone number registered in member profile",
      "Secret USSD PIN for authorization"
    ],
    requirementsRw: [
      "Nimero ya telefone yanditse muri dosiye yawe",
      "Umubare w'ibanga wa USSD"
    ]
  }
];

export const BRANCHES_DATA: BranchOutpost[] = [
  {
    id: "hq_gakenke_town",
    name: "Gakenke Central Main Branch",
    sector: "Gakenke",
    locationDetailsEn: "Gakenke Commercial Center, Next to District Head Office",
    locationDetailsRw: "Mu mujyi rwagati wa Gakenke, iruhande rw'Ibiro by'Akarere",
    managerName: "Emmanuel Nsabimana",
    managerPhone: "0786422080",
    operatingHours: "Mon-Fri: 7:30 AM - 5:30 PM | Sat: 8:00 AM - 2:00 PM",
    cashService: true,
    momoAgent: true,
    coordinates: { lat: -1.7042, lng: 29.7891 }
  },
  {
    id: "nemba_outpost",
    name: "Nemba Branch & Service Centre",
    sector: "Nemba",
    locationDetailsEn: "Nemba Market Center, Near Nemba District Hospital",
    locationDetailsRw: "Ku isoko rya Nemba, hafi y'Ibitaro bya Nemba",
    managerName: "Clarisse Mukamurenzi",
    managerPhone: "0786422080",
    operatingHours: "Mon-Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM",
    cashService: true,
    momoAgent: true,
    coordinates: { lat: -1.6821, lng: 29.7614 }
  },
  {
    id: "rushashi_outpost",
    name: "Rushashi Agri-Service Point",
    sector: "Rushashi",
    locationDetailsEn: "Rushashi Center, opposite Coffee Farmers Station",
    locationDetailsRw: "Rushashi rwagati, biteganye n'uruganda rw'Ikawa",
    managerName: "Jean Damascene Habimana",
    managerPhone: "0786422080",
    operatingHours: "Mon-Fri: 8:00 AM - 4:30 PM | Sat: Market Hours",
    cashService: true,
    momoAgent: true,
    coordinates: { lat: -1.7852, lng: 29.8310 }
  },
  {
    id: "janja_outpost",
    name: "Janja Trading Center Outpost",
    sector: "Janja",
    locationDetailsEn: "Janja Commercial Center, near GS Janja",
    locationDetailsRw: "Mu gasantere ka Janja, iruhande rwa GS Janja",
    managerName: "Alice Ingabire",
    managerPhone: "0786422080",
    operatingHours: "Mon-Fri: 8:00 AM - 4:30 PM",
    cashService: true,
    momoAgent: true,
    coordinates: { lat: -1.6510, lng: 29.8140 }
  },
  {
    id: "kivuruga_outpost",
    name: "Kivuruga Branch",
    sector: "Kivuruga",
    locationDetailsEn: "Kivuruga Trading Center, Main Highway",
    locationDetailsRw: "Ku gasantere k'ubucuruzi ka Kivuruga",
    managerName: "Patrice Munyaneza",
    managerPhone: "0786422080",
    operatingHours: "Mon-Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM",
    cashService: true,
    momoAgent: true,
    coordinates: { lat: -1.6215, lng: 29.7420 }
  },
  {
    id: "busengo_outpost",
    name: "Busengo Service Point",
    sector: "Busengo",
    locationDetailsEn: "Busengo Market Road, Sector Office",
    locationDetailsRw: "Mu muhanda w'isoko rya Busengo",
    managerName: "Solange Uwase",
    managerPhone: "0786422080",
    operatingHours: "Mon-Fri: 8:00 AM - 4:30 PM",
    cashService: true,
    momoAgent: true,
    coordinates: { lat: -1.5930, lng: 29.8012 }
  }
];

export const DEMO_ACCOUNTS: Record<string, MemberAccount> = {
  "UB-84920": {
    accountNumber: "UB-84920",
    holderName: "Abahuje Coffee Farmers Cooperative",
    sector: "Rushashi",
    accountType: "Cooperative Commercial & Savings",
    balanceRwf: 4850000,
    compulsorySavingsRwf: 1200000,
    activeLoanBalanceRwf: 1500000,
    sharesCount: 120,
    joinedYear: 2014,
    phone: "0786422080",
    transactions: [
      { id: "TX-9901", date: "2026-10-10", type: "deposit", amount: 650000, channel: "MoMo", reference: "USSD-541-9021" },
      { id: "TX-9844", date: "2026-09-28", type: "loan_repayment", amount: 185000, channel: "Teller", reference: "TEL-GKN-4402" },
      { id: "TX-9720", date: "2026-09-15", type: "deposit", amount: 1200000, channel: "MoMo", reference: "USSD-541-8114" },
      { id: "TX-9502", date: "2026-08-30", type: "dividend", amount: 117600, channel: "Dividend", reference: "DIV-AGM-2025" },
    ]
  },
  "UB-12044": {
    accountNumber: "UB-12044",
    holderName: "Mukamana Marie Chantal",
    sector: "Gakenke",
    accountType: "Individual SME Trader Account",
    balanceRwf: 840500,
    compulsorySavingsRwf: 350000,
    activeLoanBalanceRwf: 450000,
    sharesCount: 35,
    joinedYear: 2018,
    phone: "0786422080",
    transactions: [
      { id: "TX-9912", date: "2026-10-12", type: "deposit", amount: 45000, channel: "MoMo", reference: "USSD-541-1219" },
      { id: "TX-9860", date: "2026-10-01", type: "loan_repayment", amount: 65000, channel: "MoMo", reference: "USSD-541-8711" },
      { id: "TX-9781", date: "2026-09-20", type: "withdrawal", amount: 120000, channel: "Agent", reference: "AGT-NEM-3021" },
      { id: "TX-9610", date: "2026-08-30", type: "dividend", amount: 34300, channel: "Dividend", reference: "DIV-AGM-2025" },
    ]
  },
  "UB-33910": {
    accountNumber: "UB-33910",
    holderName: "Twizerane Women Solidarity Group",
    sector: "Nemba",
    accountType: "Solidarity Group (Itsinda)",
    balanceRwf: 1620000,
    compulsorySavingsRwf: 600000,
    activeLoanBalanceRwf: 0,
    sharesCount: 60,
    joinedYear: 2020,
    phone: "0786422080",
    transactions: [
      { id: "TX-9934", date: "2026-10-11", type: "deposit", amount: 150000, channel: "MoMo", reference: "USSD-541-6621" },
      { id: "TX-9812", date: "2026-09-25", type: "deposit", amount: 150000, channel: "Teller", reference: "TEL-NMB-1190" },
      { id: "TX-9654", date: "2026-08-30", type: "dividend", amount: 58800, channel: "Dividend", reference: "DIV-AGM-2025" },
    ]
  }
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "agm-2026",
    category: "agm",
    date: "Current Notice",
    imageUrl: "/src/assets/images/community_governance_1791989970347.jpg",
    titleEn: "15th Annual General Meeting & Dividend Allocation",
    titleRw: "Inama Rusange ya 15 no Kugabana Inyungu ku Migabane",
    summaryEn: "All active members are invited to review audited financial statements and ratify the 9.8% dividend distribution.",
    summaryRw: "Abanyamuryango bose b'imena baratumirwa kwemeza raporo y'imari n'inyungu ku migabane ya 9.8%.",
    contentEn: "The Board of Directors of Ubumwe SACCO Gakenke informs all esteemed members that the 15th AGM will take place at the Gakenke Youth Cultural Hall. Agenda: 1. Audited financials 2. Ratification of 9.8% annual dividend 3. 2027 Agricultural credit facility. Call 0786422080 or email ubumwesaccogakenke@gmail.com for inquiries.",
    contentRw: "Inama y'Ubutegetsi ya Ubumwe SACCO Gakenke iramenyesha abanyamuryango ko inama rusange izabera mu cyumba cy'urubyiruko rwa Gakenke. Ingingo: 1. Kwemeza raporo y'imari 2. Kwemeza inyungu ya 9.8% 3. Gahunda y'inguzanyo z'ubuhinzi. Baza kuri 0786422080 cyangwa ubumwesaccogakenke@gmail.com."
  },
  {
    id: "season-a-loan-window",
    category: "loan_window",
    date: "Season Facility",
    imageUrl: "/src/assets/images/farmers_cooperative_1791989969904.jpg",
    titleEn: "Agricultural Season Loan Applications Now Open",
    titleRw: "Kwakira Ubusabe bw'Inguzanyo z'Ubuhinzi n'Ihinga",
    summaryEn: "Fast-track loans for coffee washing stations, maize, potato, and livestock farmers across all 19 sectors of Gakenke.",
    summaryRw: "Inguzanyo zihuse z'abahinzi b'ikawa, ibigori, ibirayi n'aborozi bo mu mirenge 19 ya Gakenke.",
    contentEn: "Farmers in Gakenke can submit applications with up to 4 months grace period before principal payment. Apply directly at your nearest outpost in Gakenke, Nemba, Rushashi, Janja, Kivuruga, or Busengo. Support: 0786422080.",
    contentRw: "Abahinzi bo muri Gakenke bemerewe gutanga ubusabe bw'inguzanyo y'ubuhinzi ifite amezi 4 y'agahenge. Gana ishami rikwegereye muri Gakenke, Nemba, Rushashi, Janja, Kivuruga cyangwa Busengo. Telefone: 0786422080."
  },
  {
    id: "momo-integration-upgrade",
    category: "notice",
    date: "24/7 Digital",
    imageUrl: "/src/assets/images/mbitsemunda_phocas_desk.jpg",
    titleEn: "Official USSD Banking Shortcode: *541#",
    titleRw: "Serivisi ya USSD ku Mirongo Yose: *541#",
    summaryEn: "Deposit, withdraw, check balances, and repay loans directly by dialing *541# on MTN and Airtel.",
    summaryRw: "Kubitsa, kubikuza, kureba amafaranga no kwishyura inguzanyo ukoresheje *541# kuri MTN na Airtel.",
    contentEn: "Access your Ubumwe SACCO Gakenke account anytime, anywhere in Rwanda. Dial *541# to check live balances, deposit harvest proceeds from Mobile Money, or transfer money with zero bank commission.",
    contentRw: "Gera kuri konti yawe ya Ubumwe SACCO Gakenke aho uri hose mu Rwanda. Kanda *541# urebe amafaranga asigaye, ubike amafaranga y'umusaruro uva kuri MoMo cyangwa wishyure inguzanyo."
  }
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Jean Pierre Nshimiyimana",
    roleEn: "Coffee Cooperative Chairperson, Rushashi",
    roleRw: "Umuyobozi wa Koperative y'Ikawa, Rushashi",
    image: "/src/assets/images/farmers_cooperative_1791989969904.jpg",
    quoteEn: "Through Ubumwe SACCO's agricultural facility, our cooperative paid 420 smallholder coffee farmers on time. The harvest grace period matched our export cycles.",
    quoteRw: "Kubera inguzanyo y'ubuhinzi ya Ubumwe SACCO, koperative yacu yishyuye abahinzi b'ikawa 420 ku gihe. Igihe cyo kwishyura cyahujwe n'igihe cy'isarura ryacu.",
    metric: "+35% Farmer Harvest Return"
  },
  {
    id: "test-2",
    name: "Marie Claire Mukamana",
    roleEn: "Wholesale & Hardware Store Owner, Gakenke Center",
    roleRw: "Umucuruzi w'Amaduka, Gakenke Rwagati",
    image: "/src/assets/images/entrepreneur_business_1791989970089.jpg",
    quoteEn: "I started with a voluntary savings account in 2018. Today I operate two stores in Gakenke town. USSD *541# allows me to reconcile sales every evening without leaving my shop.",
    quoteRw: "Natangiriye ku bwizigame bwa SACCO muri 2018. Uyu munsi mfite amaduka abiri mu mujyi wa Gakenke. Gukoresha *541# bituma ngereranya ibicuruzwa ntavuye mu iduka.",
    metric: "4.8x Business Turnover in 5 Years"
  }
];

export const INITIAL_LEADERS: LeaderMember[] = [
  {
    id: "lead-1",
    name: "Wellarse",
    roleEn: "Board Director",
    roleRw: "Umuyobozi w'Inama y'Ubutegetsi (Board Director)",
    category: "board",
    qualificationEn: "Senior Board Director & Cooperative Governance Specialist",
    qualificationRw: "Impuguke mu miyoborere n'ubuyobozi bw'Inama y'Ubutegetsi ya Koperative",
    imageUrl: "/src/assets/images/portrait_director_wellars_1791994899049.jpg",
    phone: "0786422080",
  },
  {
    id: "lead-2",
    name: "Mbitsemunda Phocas",
    roleEn: "Manager",
    roleRw: "Umuyobozi Mukuru (Manager)",
    category: "manager",
    qualificationEn: "Executive Bank Manager & Certified Microfinance Specialist",
    qualificationRw: "Umuyobozi w'imirimo y'imari n'icungamutungo ry'ibigo by'imari iciriritse",
    imageUrl: "/src/assets/images/mbitsemunda_phocas_desk.jpg",
    phone: "0786422080",
  },
  {
    id: "lead-3",
    name: "Bartazal",
    roleEn: "Board Director & Governance Trustee",
    roleRw: "Umuyobozi mu Nama y'Ubutegetsi (Board Director)",
    category: "board",
    qualificationEn: "Cooperative Governance Specialist & Senior Board Trustee",
    qualificationRw: "Inararibonye mu miyoborere ya koperative n'iterambere ry'abaturage",
    imageUrl: "/src/assets/images/bartazal_speaking.jpg",
    phone: "0786422080",
  },
  {
    id: "lead-4",
    name: "Innocent Ndayisaba",
    roleEn: "Chief Credit & Operations Officer",
    roleRw: "Umuyobozi w'Inguzanyo n'Imirimo",
    category: "manager",
    qualificationEn: "Senior Credit Analyst & Agricultural Risk Assessor",
    qualificationRw: "Impuguke mu isesengura ry'inguzanyo n'ingaruka ku buhinzi",
    imageUrl: "/src/assets/images/portrait_credit_director_1791991947701.jpg",
    phone: "0786422080",
  },
  {
    id: "lead-5",
    name: "Gisele Uwambaye",
    roleEn: "Chairperson, Supervisory Committee",
    roleRw: "Perezida wa Komite y'Ubugenzuzi",
    category: "board",
    qualificationEn: "Certified Public Accountant (CPA-R) & Senior Auditor",
    qualificationRw: "Umunyamuryango w'inzobere mu buciruzi bw'imari (CPA-R) n'ubugenzuzi",
    imageUrl: "/src/assets/images/portrait_supervisory_chair_1791991947113.jpg",
    phone: "0786422080",
  }
];

export const INITIAL_MOMENTS: InstitutionMoment[] = [
  {
    id: "moment-1",
    titleEn: "Annual Dividend Distribution Celebration",
    titleRw: "Umunsi Mukuru wo Guhemba Abanyamuryango no Kugabana Inyungu",
    date: "Annual General Assembly Milestone",
    category: "agm_dividend",
    imageUrl: "/src/assets/images/moment_dividend_celebration_1791994900250.jpg",
    additionalImages: [
      "/src/assets/images/moment_dividend_celebration_1791994900250.jpg",
      "/src/assets/images/farmers_cooperative_1791989969904.jpg",
      "/src/assets/images/community_governance_1791989970347.jpg",
      "/src/assets/images/hero_sacco_banking_1791989969362.jpg"
    ],
    captionEn: "Historic celebration in Gakenke as over 450 Million RWF in annual dividends were disbursed to proud cooperative coffee farmers and local entrepreneurs.",
    captionRw: "Ibyishimo bisesekaye muri Gakenke ubwo abanyamuryango b'abahinzi b'ikawa n'abacuruzi bahabwaga inyungu ku migabane yabo isaga Miliyoni 450 RWF.",
  },
  {
    id: "moment-2",
    titleEn: "National Cooperative Excellence Award Trophy",
    titleRw: "Guhabwa Igikombe cy'Indashyikirwa mu Makoperative y'Imari",
    date: "National Cooperative Summit",
    category: "award",
    imageUrl: "/src/assets/images/moment_cooperative_award_1791994900000.jpg",
    additionalImages: [
      "/src/assets/images/moment_cooperative_award_1791994900000.jpg",
      "/src/assets/images/portrait_director_wellars_1791994899049.jpg",
      "/src/assets/images/mbitsemunda_phocas_desk.jpg",
      "/src/assets/images/bartazal_speaking.jpg"
    ],
    captionEn: "Board Directors Wellarse and Bartazal alongside Manager Mbitsemunda Phocas receiving the prestigious institutional excellence award for exemplary financial management and zero non-performing loan discipline.",
    captionRw: "Abayobozi mu Nama y'Ubutegetsi Wellarse na Bartazal hamwe n'Umuyobozi Mukuru Mbitsemunda Phocas bashyikirizwa igikombe cy'indashyikirwa mu micungire y'imari n'inguzanyo z'iterambere.",
  },
  {
    id: "moment-3",
    titleEn: "Modern Banking Hall & USSD *541# Service Launch",
    titleRw: "Gufungura Ibiro Bigezweho bya Banki na Serivisi ya *541#",
    date: "Central Branch Modernization",
    category: "branch_opening",
    imageUrl: "/src/assets/images/hero_sacco_banking_1791989969362.jpg",
    additionalImages: [
      "/src/assets/images/hero_sacco_banking_1791989969362.jpg",
      "/src/assets/images/mbitsemunda_phocas_desk.jpg",
      "/src/assets/images/entrepreneur_business_1791989970089.jpg"
    ],
    captionEn: "Commissioning of our state-of-the-art cooperative banking hall in Gakenke commercial center, equipped with modern teller stations and direct USSD *541# link.",
    captionRw: "Gufungura ibiro by'icyitegererezo rwagati mu Mujyi wa Gakenke bifite ibyuma bigezweho by'abakarani n'ikoranabuhanga rya USSD *541#.",
  },
  {
    id: "moment-4",
    titleEn: "Rushashi & Janja Coffee Farmers Agricultural Payout",
    titleRw: "Gushyigikira Abahinzi b'Ikawa ba Rushashi na Janja mu Isarura",
    date: "Harvest Season Payout",
    category: "community",
    imageUrl: "/src/assets/images/farmers_cooperative_1791989969904.jpg",
    additionalImages: [
      "/src/assets/images/farmers_cooperative_1791989969904.jpg",
      "/src/assets/images/moment_dividend_celebration_1791994900250.jpg",
      "/src/assets/images/community_governance_1791989970347.jpg"
    ],
    captionEn: "Direct seasonal liquidity injection to coffee washing stations across Gakenke, empowering over 420 smallholder farmer households with fair harvest prices.",
    captionRw: "Guhereza igishoro inganda z'ikawa zo muri Gakenke kugira ngo zishyurire abahinzi bato 420 ku gihe kandi ku giciro gishimishije.",
  },
  {
    id: "moment-5",
    titleEn: "Annual Cooperative Delegates Assembly in Gakenke",
    titleRw: "Inama y'Intumwa z'Abanyamuryango ba Koperative",
    date: "Democratic Governance Assembly",
    category: "agm_dividend",
    imageUrl: "/src/assets/images/community_governance_1791989970347.jpg",
    additionalImages: [
      "/src/assets/images/community_governance_1791989970347.jpg",
      "/src/assets/images/portrait_director_wellars_1791994899049.jpg",
      "/src/assets/images/bartazal_speaking.jpg",
      "/src/assets/images/mbitsemunda_phocas_desk.jpg"
    ],
    captionEn: "Elected cooperative delegates from all 19 sectors assembling under Board Director Wellarse and Manager Mbitsemunda Phocas to approve the audited financial accounts and dividend payout.",
    captionRw: "Intumwa z'abanyamuryango zaturutse mu mirenge 19 ziteraniye hamwe ziyobowe na Board Director Wellarse na Manager Mbitsemunda Phocas zemeza raporo y'imari.",
  },
  {
    id: "moment-6",
    titleEn: "Gakenke Women & Youth Entrepreneurship Graduation",
    titleRw: "Gusoza Amahugurwa y'Ubucuruzi ku Bagore n'Urubyiruko",
    date: "Financial Empowerment Initiative",
    category: "training",
    imageUrl: "/src/assets/images/entrepreneur_business_1791989970089.jpg",
    additionalImages: [
      "/src/assets/images/entrepreneur_business_1791989970089.jpg",
      "/src/assets/images/hero_sacco_banking_1791989969362.jpg",
      "/src/assets/images/farmers_cooperative_1791989969904.jpg"
    ],
    captionEn: "Empowering 120 retail entrepreneurs in Gakenke with seed capital, financial literacy, and mobile merchant wallets via *541#.",
    captionRw: "Gufasha abacuruzi bato 120 bo muri Gakenke kubona igishoro, amasomo y'imari no gukoresha serivisi ya *541# mu bucuruzi bwabo.",
  }
];

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "appl-1",
    appNumber: "UB-APPL-2026-891",
    fullName: "Jean Claude Habimana",
    idNumber: "1198480019283412",
    phone: "0788412890",
    sector: "Rushashi",
    accountType: "Ubuhinzi n'Ubworozi (Agri-Credit)",
    occupation: "Coffee Farmer & Agronomist",
    initialAmount: 800000,
    date: "2026-10-12",
    status: "pending",
  },
  {
    id: "appl-2",
    appNumber: "UB-APPL-2026-724",
    fullName: "Esperance Nyirahabimana",
    idNumber: "1199070028475819",
    phone: "0783120440",
    sector: "Nemba",
    accountType: "Ubucuruzi SME Micro-Loan",
    occupation: "General Merchandise Retailer",
    initialAmount: 1500000,
    date: "2026-10-13",
    status: "pending",
  }
];

export const LEADERSHIP_TEAM = INITIAL_LEADERS;

export const INITIAL_MANAGER_MESSAGES: ManagerMessage[] = [
  {
    id: 'msg-home-001',
    titleEn: "A Message from Our Manager",
    titleRw: "Ubutumwa bwa Umuyobozi",
    bodyEn: "On behalf of UBUMWE SACCO GAKENKE, I extend a warm welcome to all our valued members and partners. Since our founding in 2011, we have been committed to empowering the community of Gakenke District through accessible savings, fair credit, and transparent cooperative governance. Our 18,640 members are the heartbeat of this institution. Together — Ubumwe — we continue to build a financially resilient community across the 19 sectors of Gakenke.",
    bodyRw: "Mugihe nihagarariye UBUMWE SACCO GAKENKE, nkurikiranyije abacu n'inshuti zacu zose beza. Kuva dushyinzwe mu 2011, twiyemeje gutera inkunga abaturage b'Akarere ka Gakenke binyuze ku bwizigame bworoshye, inguzanyo zinyuranye, no gucunga koperative mu buryo bw'uburangiranwa. Abanyamuryango bacu 18,640 ni umutima w'iyi koperative. Hamwe — Ubumwe — tukomeza kubaka umuryango w'imari w'ingufu mu mirenge 19 ya Gakenke.",
    authorName: "Mbitsemunda Phocas",
    authorRole: "General Manager, UBUMWE SACCO GAKENKE",
    date: "October 2026",
    showOnHome: true,
    showOnAbout: false,
    active: true,
    imageUrl: "/src/assets/images/mbitsemunda_phocas_desk.jpg",
  },
  {
    id: 'msg-about-001',
    titleEn: "Board Chair's Message",
    titleRw: "Ubutumwa bw'Umuyobozi w'Inama y'Ubuyobozi",
    bodyEn: "UBUMWE SACCO GAKENKE was built on the bedrock of collective strength and community trust. As Board Chair, I am proud to report that our cooperative has steadily grown — from a small group of members in Gakenke Sector to a district-wide financial institution serving all 19 sectors. We remain fully regulated by the Rwanda Cooperative Agency (RCA) and committed to delivering the highest standards of service, transparency, and community impact.",
    bodyRw: "UBUMWE SACCO GAKENKE yashyizweho ku ngingo z'ubutabera rusange n'icyizere cy'abaturage. Nk'Umuyobozi w'Inama y'Ubuyobozi, nishimira kuvuga ko koperative yacu yateye imbere buhoro buhoro — kuva ku ba munyamuryango bake bo mu Murenge wa Gakenke kugeza ku rwego rw'akarere rw'umuryango w'imari ukorera mu mirenge 19 yose. Tukomeza kugenzurwa na RCA kandi twiyemeje gutanga serivisi z'imipaka yo hejuru, uburangiranwa, n'ingaruka nziza ku mujyi.",
    authorName: "Wellarse (Board Chair)",
    authorRole: "Chairperson, Board of Directors — UBUMWE SACCO GAKENKE",
    date: "October 2026",
    showOnHome: false,
    showOnAbout: true,
    active: true,
    imageUrl: "/src/assets/images/portrait_director_wellars_1791994899049.jpg",
  },
];

export const INITIAL_JOB_POSTINGS: JobPosting[] = [
  {
    id: "job-1",
    titleEn: "Senior Credit & Loan Officer (Agri-Business & SME)",
    titleRw: "Umukozi Ushinzwe Inguzanyo z'Ubuhinzi n'Ubucuruzi Buto",
    departmentEn: "Credit & Microfinance Operations",
    departmentRw: "Ishami ry'Inguzanyo n'Icungamutungo",
    location: "Gakenke Headquarters & Field Outposts",
    employmentType: "full_time",
    salaryRange: "Competitive SACCO Scale + Field Allowances",
    deadline: "2026-11-15",
    status: "open",
    descriptionEn: "We are seeking an experienced Credit Officer to appraise agricultural, coffee washing station, and SME business loan applications, monitor portfolio quality, and advise cooperative solidarity borrower groups.",
    descriptionRw: "Turashaka umukozi w'inararibonye mu gusesengura inguzanyo z'ubuhinzi, inganda z'ikawa, n'ubucuruzi buciriritse, gukurikirana ibirarane no gufasha amatsinda y'ubwizigame n'inguzanyo mu Mirenge ya Gakenke.",
    requirementsEn: [
      "Bachelor's degree (A0) in Accounting, Finance, Economics, Rural Development, or Agri-Business",
      "Minimum 2 years of relevant experience in a Microfinance Institution, SACCO, or Commercial Bank",
      "Proficiency in loan risk appraisal, collateral verification, and delinquency management",
      "Fluency in Kinyarwanda and English or French",
      "Motorcycle driving license (Category A) is a significant advantage"
    ],
    requirementsRw: [
      "Impamyabumenyi y'icyiciro cya kabiri cya kaminuza (A0) mu Ibaruramari, Imari, Ubukungu, cyangwa Ubuhinzi",
      "Uburambe nibura bw'imyaka 2 mu kigo cy'imari iciriritse, SACCO, cyangwa banki",
      "Ubumenyi buhagije mu gusesengura inguzanyo no gukurikirana ibirarane",
      "Kumenya neza Ikinyarwanda n'Icyongereza cyangwa Igifaransa",
      "Uruhushya rwo gutwara moto (Category A) rufatwa nk'akarusho gakomeye"
    ],
    responsibilitiesEn: [
      "Evaluate credit requests from cooperative members and solidarity groups",
      "Conduct field visits and verify business assets across Gakenke District",
      "Present loan recommendations to the Credit Appraisal Committee",
      "Maintain portfolio-at-risk (PAR) below regulated BNR & RCA cooperative thresholds"
    ],
    responsibilitiesRw: [
      "Gusuzuma no gusesengura dosiye z'abanyamuryango basaba inguzanyo",
      "Gusura imishinga y'abahinzi n'abacuruzi mu mirenge itandukanye ya Gakenke",
      "Gushyikiriza raporo Komite Ishinzwe Inguzanyo",
      "Gukurikirana ko inguzanyo zishyurwa neza ku gihe"
    ],
    postedDate: "2026-10-14"
  },
  {
    id: "job-2",
    titleEn: "IT & Digital Banking Channels Specialist",
    titleRw: "Impuguke mu Ikoranabuhanga rya Banki na Serivisi za USSD",
    departmentEn: "Information Technology & Digital Banking",
    departmentRw: "Ishami ry'Ikoranabuhanga n'Imari Igezweho",
    location: "Gakenke Commercial Center, HQ",
    employmentType: "full_time",
    salaryRange: "Professional Scale + Performance Bonus",
    deadline: "2026-11-20",
    status: "open",
    descriptionEn: "Lead the technical administration and uptime of our Core Banking System, USSD *541# push-pull integration, MoMo API links, and database integrity for over 18,600 members.",
    descriptionRw: "Kuyobora imirimo y'ikoranabuhanga ya sisitemu y'imari (Core Banking), serivisi za USSD *541#, ihuza rya MTN Mobile Money na Airtel Money, no kurinda umutekano w'amakuru y'abanyamuryango.",
    requirementsEn: [
      "Bachelor's degree (A0) in Computer Science, Information Systems, Software Engineering, or IT",
      "Hands-on experience with SQL databases, Linux servers, and API integrations",
      "Knowledge of USSD gateways, mobile money telco protocols, and financial data security",
      "At least 2 years in banking or FinTech infrastructure support"
    ],
    requirementsRw: [
      "Impamyabumenyi ya Kaminuza (A0) mu Bumenyi bwa Mudasobwa, Ikoranabuhanga, cyangwa IT",
      "Ubumenyi bwimbitse muri SQL databases, seriveri za Linux, na API integrations",
      "Kumenya imikorere ya USSD, Mobile Money gateways, n'umutekano w'imari",
      "Uburambe nibura bw'imyaka 2 mu mirimo y'ikoranabuhanga rya banki cyangwa ibigo by'imari"
    ],
    responsibilitiesEn: [
      "Ensure 99.9% uptime for core banking, teller workstations, and USSD *541# services",
      "Oversee automated end-of-day (EOD) batch processing and offsite encrypted backups",
      "Provide hardware, LAN/WAN, and network support across our 6 branches and outposts",
      "Liaise with RCA & BNR reporting automation systems"
    ],
    responsibilitiesRw: [
      "Gukurikirana ko serivisi za USSD *541# na sisitemu z'amashami zikora neza amasaha yose",
      "Gukora backup z'amakuru y'abanyamuryango buri munsi no kurinda umutekano w'ibigo",
      "Gufasha abakozi mu bibazo bya mudasobwa na murandasi mu mashami 6 ya Gakenke",
      "Guhuza sisitemu na raporo zigenwa na RCA na BNR"
    ],
    postedDate: "2026-10-15"
  },
  {
    id: "job-3",
    titleEn: "Branch Cashier & Customer Operations Officer",
    titleRw: "Umukarani / Ushinzwe Amafaranga ku Ishami",
    departmentEn: "Branch Operations & Member Services",
    departmentRw: "Ishami ry'Imirimo y'Amashami n'Abanyamuryango",
    location: "Rushashi Outpost / Kivuruga Branch",
    employmentType: "full_time",
    salaryRange: "Standard SACCO Operations Scale",
    deadline: "2026-11-10",
    status: "open",
    descriptionEn: "Handle front-counter cash deposits, withdrawals, member registrations, MoMo float management, and day-end balancing with absolute accuracy and member courtesy.",
    descriptionRw: "Gukira no kubitsa amafaranga y'abanyamuryango, kwandika abanyamuryango bashya, gucunga float ya MoMo, no gukora imyanzuro y'ibaruramari ya buri mugoroba.",
    requirementsEn: [
      "Diploma (A1) or Bachelor's (A0) in Accounting, Management, or Business Administration",
      "High attention to numerical accuracy and counterfeit banknote detection skills",
      "Strong customer service orientation and patience with rural community members",
      "Prior cashier or teller experience in a cooperative or financial institution is preferred"
    ],
    requirementsRw: [
      "Impamyabumenyi (A1 cyangwa A0) mu Ibaruramari, Icungamutungo, cyangwa Ubucuruzi",
      "Ubushobozi bwo kubara neza no gutahura inoti z'amiganano",
      "Kwakira neza abakiriya no kubaha abahinzi n'abaturage b'ingeri zose",
      "Uburambe bwo gukora nk'umukarani mu kigo cy'imari buhabwa agaciro"
    ],
    responsibilitiesEn: [
      "Process member cash transactions and issue computerized receipts",
      "Reconcile cash till daily and report discrepancies immediately to Branch Manager",
      "Assist cooperative members with *541# account linking and PIN activations",
      "Promote cooperative term savings and voluntary shares subscriptions"
    ],
    responsibilitiesRw: [
      "Kwakira no kwishyura amafaranga ku banyamuryango no gutanga inyemezabwishyu",
      "Gukora ibarura ry'isanduku y'amafaranga buri mugoroba no gutanga raporo",
      "Gufasha abanyamuryango guhuza konti na telefone (*541#)",
      "Gushishikariza abanyamuryango kugura imigabane no kwizigamira"
    ],
    postedDate: "2026-10-12"
  },
  {
    id: "job-4",
    titleEn: "Internal Audit & Compliance Associate",
    titleRw: "Umufasha mu Bugenzuzi bw'Imbere n'Amategeko y'Imari",
    departmentEn: "Supervisory & Internal Audit",
    departmentRw: "Komite y'Ubugenzuzi n'Amategeko",
    location: "Gakenke Commercial Center, HQ",
    employmentType: "full_time",
    salaryRange: "Professional Scale",
    deadline: "2026-11-30",
    status: "open",
    descriptionEn: "Work directly with the Supervisory Committee and External Auditors to review transaction vouchers, branch cash counts, anti-money laundering (AML/CFT) checks, and policy adherence.",
    descriptionRw: "Gukorana na Komite y'Ubugenzuzi n'abagenzuzi b'inyuma mu gusuzuma inyandiko z'imari, kugenzura amasanduku y'amashami, no kwizera ko amategeko ya RCA na BNR yubahirizwa.",
    requirementsEn: [
      "Bachelor's degree (A0) in Auditing, Accounting, or Finance; progress towards CPA-R/ACCA is an added advantage",
      "Solid knowledge of Rwandan cooperative laws, RCA regulations, and microfinance guidelines",
      "High level of integrity, analytical mindset, and confidentiality",
      "Minimum 1 year audit or compliance testing experience"
    ],
    requirementsRw: [
      "Impamyabumenyi (A0) mu Bugenzuzi, Ibaruramari, cyangwa Imari; kwiga CPA-R cyangwa ACCA ni akarusho",
      "Kumenya amategeko agenga amakoperative mu Rwanda n'amabwiriza ya BNR na RCA",
      "Ubunyangamugayo ntashidikanywaho no kubika amabanga y'akazi",
      "Nibura umwaka 1 w'uburambe mu bugenzuzi bw'ibigo by'imari"
    ],
    responsibilitiesEn: [
      "Execute surprise cash counts and collateral inventory inspections across outposts",
      "Review sample loan files for adherence to credit policy and documentation requirements",
      "Draft audit observation reports for the Supervisory Committee Chairperson",
      "Monitor anti-fraud controls and know-your-customer (KYC) compliance"
    ],
    responsibilitiesRw: [
      "Gukora ubugenzuzi butunguranye mu masanduku y'amashami ya Gakenke",
      "Gusuzuma dosiye z'inguzanyo niba zujuje ibisabwa n'amategeko",
      "Kwandika raporo z'ubugenzuzi zishyikirizwa Ubuyobozi Bukuru",
      "Gukurikirana ko amategeko yo kurwanya magendu n'iyezandonke yubahirizwa"
    ],
    postedDate: "2026-10-10"
  },
  {
    id: "job-5",
    titleEn: "Agricultural Cooperative Mobilization Trainee (Internship)",
    titleRw: "Umunyeshuri Wimenyereza Akazi mu Buhinzi n'Imari (Internship)",
    departmentEn: "Community Outreach & Member Mobilization",
    departmentRw: "Ishami ry'Iterambere ry'Abaturage n'Ubukangurambaga",
    location: "Janja, Busengo & Nemba Sectors",
    employmentType: "internship",
    salaryRange: "Monthly Transport & Sustenance Stipend",
    deadline: "2026-11-25",
    status: "open",
    descriptionEn: "A 6-month paid professional internship designed for fresh university or college graduates eager to build grassroots careers in agricultural finance, cooperative management, and rural digitisation.",
    descriptionRw: "Internship y'amezi 6 ihemba igenerwa abarangije vuba amashuri makuru na kaminuza bifuza kumenya imikorere y'ibigo by'imari by'ubuhinzi no gufasha amakoperative y'abahinzi mu cyaro.",
    requirementsEn: [
      "Fresh graduate with Bachelor's (A0) or Diploma (A1) graduated within the last 2 years",
      "Passionate about community banking, agriculture, and cooperative values",
      "Resident of Gakenke District or Northern Province is highly encouraged",
      "Good communication skills and eagerness to learn"
    ],
    requirementsRw: [
      "Uwarangije vuba kaminuza (A0 cyangwa A1) mu myaka 2 ishize",
      "Gukunda ibikorwa by'iterambere ry'abaturage n'ubuhinzi",
      "Gutura mu Karere ka Gakenke cyangwa Intara y'Amajyaruguru bihabwa intebe",
      "Kumenya gushyikirana neza n'abaturage no kugira ubushake bwo kwiga"
    ],
    responsibilitiesEn: [
      "Assist credit officers in mobilizing coffee and tea farmer groups",
      "Conduct community digital onboarding sessions for USSD *541#",
      "Support data entry of member files and cooperative registers",
      "Participate in agricultural training workshops across Gakenke sectors"
    ],
    responsibilitiesRw: [
      "Gufasha abakozi b'inguzanyo gushishikariza amakoperative y'abahinzi kwizigamira",
      "Kwigisha abaturage gukoresha serivisi ya telefone (*541#)",
      "Gufasha kwandika amakuru y'abanyamuryango muri mudasobwa",
      "Kwitabira amahugurwa y'abahinzi n'aborozi mu mirenge ya Gakenke"
    ],
    postedDate: "2026-10-16"
  }
];

export const INITIAL_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: "job-app-001",
    jobId: "job-1",
    jobTitle: "Senior Credit & Loan Officer (Agri-Business & SME)",
    fullName: "Emmanuel Nshimiyimana",
    email: "emmanuel.nshimiye@gmail.com",
    phone: "0788654321",
    nationalId: "1199280045612390",
    residenceSector: "Gakenke",
    educationLevel: "Bachelor's Degree (A0) in Rural Development & Economics",
    yearsExperience: 3,
    coverLetter: "I have 3 years of microfinance credit appraisal experience in Northern Province cooperatives. I have worked closely with coffee cooperatives in Gakenke and Janja, managing portfolios exceeding 300M RWF with 98% recovery rate.",
    appliedDate: "2026-10-15",
    status: "shortlisted",
    notes: "Strong field experience with coffee cooperatives. Excellent candidate for interview.",
    verified: true,
    verifiedDetails: {
      nidValid: true,
      phoneValid: true,
      documentsValid: true,
      verifiedBy: "Mbitsemunda Phocas (Manager)",
      verifiedDate: "2026-10-16",
    },
    rating: 5,
    emailFeedbackSent: true,
    lastFeedbackDate: "2026-10-16 14:30",
    lastFeedbackSubject: "UBUMWE SACCO GAKENKE: Shortlisted for Senior Credit Officer",
    lastFeedbackMessage: "Dear Emmanuel Nshimiyimana, congratulations on being shortlisted for Senior Credit Officer. Please prepare for in-person evaluation at Gakenke Headquarters.",
  },
  {
    id: "job-app-002",
    jobId: "job-3",
    jobTitle: "Branch Cashier & Customer Operations Officer",
    fullName: "Claudine Uwera",
    email: "claudine.uwera2026@gmail.com",
    phone: "0783456789",
    nationalId: "1199570089123456",
    residenceSector: "Rushashi",
    educationLevel: "Bachelor's Degree (A0) in Accounting & Finance",
    yearsExperience: 2,
    coverLetter: "As a resident of Rushashi sector with 2 years of teller experience in a cooperative society, I am eager to bring my customer service dedication, numerical precision, and community trust to UBUMWE SACCO GAKENKE.",
    appliedDate: "2026-10-16",
    status: "interview",
    notes: "Invited for practical teller exam and interview at Gakenke HQ on Monday.",
    verified: true,
    verifiedDetails: {
      nidValid: true,
      phoneValid: true,
      documentsValid: true,
      verifiedBy: "HR Committee",
      verifiedDate: "2026-10-16",
    },
    rating: 4,
    emailFeedbackSent: true,
    lastFeedbackDate: "2026-10-16 16:15",
    lastFeedbackSubject: "Interview Invitation: Branch Cashier Position at UBUMWE SACCO",
    lastFeedbackMessage: "Dear Claudine Uwera, you are invited for an interview on Monday at 09:00 AM at Gakenke Central Office. Bring your original National ID and degree.",
  },
  {
    id: "job-app-003",
    jobId: "job-2",
    jobTitle: "Core Banking IT Support & USSD Specialist",
    fullName: "Jean De Dieu Hakizimana",
    email: "hakizimana.jdd@gmail.com",
    phone: "0788912345",
    nationalId: "1199480034129087",
    residenceSector: "Nemba",
    educationLevel: "Bachelor's Degree (A0) in Computer Science & Networking",
    yearsExperience: 3,
    coverLetter: "Certified network administrator with hands-on experience maintaining core banking servers, Linux environments, and USSD mobile gateways for cooperative societies.",
    appliedDate: "2026-10-16",
    status: "pending",
    notes: "Awaiting technical review from IT lead.",
    verified: false,
    rating: 4,
    emailFeedbackSent: false,
  },
  {
    id: "job-app-004",
    jobId: "job-4",
    jobTitle: "Internal Audit & Compliance Inspector",
    fullName: "Marie Rose Mukamana",
    email: "mukamana.mrose@gmail.com",
    phone: "0785123987",
    nationalId: "1199170067894512",
    residenceSector: "Kivuruga",
    educationLevel: "Bachelor's Degree (A0) in Accounting (CPA-R Candidate)",
    yearsExperience: 2,
    coverLetter: "Dedicated auditor committed to compliance with RCA and BNR microfinance regulations, risk mitigation, and cash till security.",
    appliedDate: "2026-10-17",
    status: "pending",
    notes: "Excellent academic credentials. CPA-R Level 2 candidate.",
    verified: true,
    verifiedDetails: {
      nidValid: true,
      phoneValid: true,
      documentsValid: true,
      verifiedBy: "Supervisory Committee",
      verifiedDate: "2026-10-17",
    },
    rating: 5,
    emailFeedbackSent: false,
  }
];


export const SACCO_PHOTO_ALBUM = [
  {
    id: "album-1",
    titleEn: "Annual General Assembly & 450M RWF Dividend Distribution",
    titleRw: "Inama Rusange n'Ibyishimo byo Guhemba Miliyoni 450 RWF",
    category: "agm_dividend",
    categoryLabel: "Dividends & AGM",
    date: "Annual Milestone",
    imageUrl: "/src/assets/images/moment_dividend_celebration_1791994900250.jpg",
    description: "Members gathered at Gakenke Community Center celebrating historic dividend payouts."
  },
  {
    id: "album-2",
    titleEn: "National Microfinance Excellence Award Trophy",
    titleRw: "Igikombe cy'Indashyikirwa mu Makoperative y'Imari",
    category: "award",
    categoryLabel: "Awards",
    date: "National Summit",
    imageUrl: "/src/assets/images/moment_cooperative_award_1791994900000.jpg",
    description: "Board Director Wellarse, Director Bartazal, and General Manager Mbitsemunda Phocas receiving the excellence cup."
  },
  {
    id: "album-3",
    titleEn: "Central Banking Hall & USSD *541# Technology Launch",
    titleRw: "Ibiro Bigezweho bya Banki rwagati muri Gakenke",
    category: "branch_opening",
    categoryLabel: "Banking Hall",
    date: "Modernization",
    imageUrl: "/src/assets/images/hero_sacco_banking_1791989969362.jpg",
    description: "State-of-the-art teller counters, digital customer service stations, and secure vaults in Gakenke Commercial Center."
  },
  {
    id: "album-4",
    titleEn: "Executive Office of General Manager Mbitsemunda Phocas",
    titleRw: "Ibiro by'Umuyobozi Mukuru Mbitsemunda Phocas",
    category: "leadership",
    categoryLabel: "Leadership",
    date: "Executive Leadership",
    imageUrl: "/src/assets/images/mbitsemunda_phocas_desk.jpg",
    description: "General Manager Mbitsemunda Phocas at work coordinating strategic credit distribution and member operations."
  },
  {
    id: "album-5",
    titleEn: "Board Director Wellarse Guiding Institutional Strategy",
    titleRw: "Umuyobozi w'Inama y'Ubutegetsi Wellarse",
    category: "leadership",
    categoryLabel: "Leadership",
    date: "Board Oversight",
    imageUrl: "/src/assets/images/portrait_director_wellars_1791994899049.jpg",
    description: "Board Director Wellarse ensuring transparent governance and prudent regulatory compliance with RCA and BNR."
  },
  {
    id: "album-6",
    titleEn: "Board Director Bartazal Addressing Delegates",
    titleRw: "Director Bartazal ageza ijambo ku Ntumwa z'Abanyamuryango",
    category: "leadership",
    categoryLabel: "Leadership",
    date: "Governance Assembly",
    imageUrl: "/src/assets/images/bartazal_speaking.jpg",
    description: "Director Bartazal sharing key cooperative milestones with sector representatives across Gakenke District."
  },
  {
    id: "album-7",
    titleEn: "Coffee Farmers Cooperative Washing Station Liquidity",
    titleRw: "Gushyigikira Abahinzi b'Ikawa ba Rushashi mu Isarura",
    category: "community",
    categoryLabel: "Agriculture",
    date: "Harvest Payout",
    imageUrl: "/src/assets/images/farmers_cooperative_1791989969904.jpg",
    description: "Financing coffee washing stations and smallholder coffee growers with timely, fair agricultural loans."
  },
  {
    id: "album-8",
    titleEn: "Democratic Governance Assembly with 19 Sectors Delegates",
    titleRw: "Inama Rusange y'Intumwa z'Imirenge 19 ya Gakenke",
    category: "agm_dividend",
    categoryLabel: "Governance",
    date: "Delegates Assembly",
    imageUrl: "/src/assets/images/community_governance_1791989970347.jpg",
    description: "Delegates reviewing audited financial statements, approving budgets, and voting on cooperative growth plans."
  },
  {
    id: "album-9",
    titleEn: "Retail Women & Youth Entrepreneurs Graduation",
    titleRw: "Gusoza Amahugurwa y'Ubucuruzi ku Bagore n'Urubyiruko",
    category: "training",
    categoryLabel: "Training",
    date: "Financial Literacy",
    imageUrl: "/src/assets/images/entrepreneur_business_1791989970089.jpg",
    description: "Graduation ceremony for 120 market traders who completed financial literacy and SME loan management courses."
  },
  {
    id: "album-10",
    titleEn: "Official Institutional Logo & Registration Identity",
    titleRw: "Ikirango n'Ibyangombwa bya UBUMWE SACCO GAKENKE",
    category: "branch_opening",
    categoryLabel: "Institutional",
    date: "RCA Registration",
    imageUrl: "/src/assets/images/ubumwe_sacco_logo_1792063211447.png",
    description: "UBUMWE SACCO GAKENKE certified emblem and cooperative branding symbol of unity and financial prosperity."
  }
];

export const INITIAL_HERO_CONTENT: HeroContentConfig = {
  districtBadgeEn: "Gakenke District Cooperative",
  districtBadgeRw: "Koperative y'Akarere ka Gakenke",
  headlinePrefixEn: "Empowering Growth in",
  headlinePrefixRw: "Iterambere n'Ubukungu bw'Akarere ka",
  headlineFocusEn: "Gakenke District",
  headlineFocusRw: "Gakenke",
  headlineSuffixEn: "Through Cooperative Finance",
  headlineSuffixRw: "biciye muri Koperative y'Ubwizigame",
  subheadingEn: "A community-owned financial cooperative uniting 18,600+ farmers, traders, educators, and households. Secure savings, transparent micro-credit, and seamless 24/7 Mobile Money banking across 19 sectors.",
  subheadingRw: "Koperative y'ubwizigame n'inguzanyo y'abaturage ihuje abanyamuryango basaga 18,600 bo mu mirenge 19 ya Gakenke. Kuzigama mu mutekano, inguzanyo ziciriritse z'ubuhinzi n'ubucuruzi, na serivisi za USSD *541# amasaha 24/7.",
  ctaJoinEn: "Open Member Account",
  ctaJoinRw: "Gufungura Konti Ako Kanya",
  ctaCalculatorEn: "Calculate Loan Repayment",
  ctaCalculatorRw: "Bara Inguzanyo Wifuza",
};

export const INITIAL_HOME_METRICS: HomeMetricItem[] = [
  {
    id: "metric-1",
    value: "18,640+",
    labelEn: "Cooperative Members",
    labelRw: "Abanyamuryango b'Imena",
    labelFr: "Membres Coopérateurs",
    detailEn: "Across 19 Gakenke Sectors",
    detailRw: "Mu Mirenge 19 ya Gakenke",
    detailFr: "À travers les 19 secteurs de Gakenke",
    iconName: "users",
    colorClass: "text-emerald-700",
    bgClass: "bg-emerald-50",
  },
  {
    id: "metric-2",
    value: "4.85B RWF",
    labelEn: "Total Savings Mobilized",
    labelRw: "Ubwizigame Bumaze Kwakirwa",
    labelFr: "Total Épargne Mobilisée",
    detailEn: "4.85 Billion RWF Capital Pool",
    detailRw: "Amafaranga Miliyari 4.85 RWF",
    detailFr: "Pool de Capital de 4,85 Milliards RWF",
    iconName: "piggy",
    colorClass: "text-blue-700",
    bgClass: "bg-blue-50",
  },
  {
    id: "metric-3",
    value: "3.62B RWF",
    labelEn: "Loans Disbursed",
    labelRw: "Inguzanyo Zimaze Gutangwa",
    labelFr: "Prêts Décaissés",
    detailEn: "Agricultural & SME Growth",
    detailRw: "Iterambere ry'Ubuhinzi n'Ubucuruzi",
    detailFr: "Croissance Agricole & PME",
    iconName: "landmark",
    colorClass: "text-amber-700",
    bgClass: "bg-amber-50",
  },
  {
    id: "metric-4",
    value: "6 Branches",
    labelEn: "Service Outposts",
    labelRw: "Amashami n'Utubande",
    labelFr: "Agences & Postes",
    detailEn: "Within 15 Mins of Any Village",
    detailRw: "Hafi ya Buri Muturage",
    detailFr: "À moins de 15 min de chaque village",
    iconName: "building",
    colorClass: "text-slate-800",
    bgClass: "bg-slate-100",
  },
  {
    id: "metric-5",
    value: "15 Years",
    labelEn: "Operational Heritage",
    labelRw: "Uburambe n'Ubuhanga",
    labelFr: "Patrimoine Opérationnel",
    detailEn: "Established in 2011",
    detailRw: "Yashinzwe muri 2011",
    detailFr: "Établi en 2011",
    iconName: "shield",
    colorClass: "text-purple-700",
    bgClass: "bg-purple-50",
  },
];

export const INITIAL_ABOUT_CONTENT: AboutContentConfig = {
  badgeTitleEn: "Cooperative Identity & Heritage",
  badgeTitleRw: "Abo Turibo n'Amateka ya Koperative",
  mainTitleEn: "About UBUMWE SACCO GAKENKE",
  mainTitleRw: "Abo Turibo muri Ubumwe SACCO Gakenke",
  subtitleEn: "A licensed Rwandan savings and credit cooperative serving over 18,600 members across the 19 sectors of Gakenke District.",
  subtitleRw: "Koperative yemewe n'amategeko y'ubwizigame n'inguzanyo ifasha abanyamuryango barenga 18,600 mu mirenge 19 ya Gakenke.",
  regulationNoticeEn: "Regulated & Audited Cooperative Institution · Licensed Financial Cooperative (RCA / COOP / 042 / 2011)",
  regulationNoticeRw: "Ikigo cy'Imari kigenzurwa kandi cyemewe n'amategeko y'u Rwanda (RCA / COOP / 042 / 2011)",
  storyP1En: "UBUMWE SACCO GAKENKE was founded on the fundamental principle of collective self-reliance (\"Ubumwe\"). Operating in Rwanda's lush mountainous Northern Province, our cooperative bridges rural communities and smallholder farmers with formal banking, transparent microfinance, and modern mobile technology.",
  storyP1Rw: "UBUMWE SACCO GAKENKE yashinzwe ku mahame yo kwigira no gushyigikirana. Ikorera mu misozi myiza y'Akarere ka Gakenke mu Ntara y'Amajyaruguru, ifasha abahinzi n'aborozi kugera kuri serivisi z'imari zizewe, inguzanyo ziciriritse n'ikoranabuhanga rya telefone.",
  storyP2En: "From coffee farmers in Rushashi and tea growers in Janja to marketplace merchants in Gakenke town and Nemba, we ensure members retain full economic dignity. Through our USSD platform (*541#), members can bank from anywhere without spending hours walking to branch offices.",
  storyP2Rw: "Kuva ku bahinzi b'ikawa b'i Rushashi n'ibihingwa bya Janja kugeza ku bacuruzi b'amaduka i Gakenke na Nemba, twimakaza iterambere ry'umuryango. Binyuze kuri *541#, umunyamuryango abona serivisi zose atiriwe akora ingendo ndende.",
  imageUrl: "/src/assets/images/community_governance_1791989970347.jpg",
  imageCaptionEn: "Democratic Governance · Annual General Assembly (AGM) of Members",
  imageCaptionRw: "Imiyoborere Inoze · Inteko Rusange y'Abanyamuryango (AGM)",
  values: [
    {
      id: "val-1",
      titleEn: "Ubumwe (Unity)",
      titleRw: "Ubumwe",
      descEn: "100% Member-owned cooperative solidarity and community self-reliance.",
      descRw: "Ubufatanye busesuye bw'abanyamuryango n'umusingi wo kwigira.",
      iconName: "heart",
    },
    {
      id: "val-2",
      titleEn: "Ubunyangamugayo",
      titleRw: "Ubunyangamugayo",
      descEn: "Transparency, financial discipline, and strict RCA regulatory compliance.",
      descRw: "Gukorera mu mucyo, imiyoborere iboneye no kubahiriza amabwiriza ya RCA.",
      iconName: "shield",
    },
    {
      id: "val-3",
      titleEn: "Iterambere (Progress)",
      titleRw: "Iterambere",
      descEn: "Tangible socio-economic progress for families, farmers, and traders.",
      descRw: "Guteza imbere imiryango, abahinzi, n'abikorera mu Karere kose.",
      iconName: "target",
    },
  ],
};

