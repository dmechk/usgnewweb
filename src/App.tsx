/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Language,
  SaccoProduct,
  LeaderMember,
  Announcement,
  ApplicationRecord,
  InstitutionMoment,
  ThemeColor,
  SaccoContactInfo,
  NavItemConfig,
  SystemImagesConfig,
  BranchOutpost,
  ManagerMessage,
  JobPosting,
  JobApplication,
  CommunityImpactStory,
  HomeVideoItem,
  HeroContentConfig,
  HomeMetricItem,
  AboutContentConfig,
  AboutValueItem,
} from './types';
import {
  SACCO_INFO,
  INITIAL_NAV_ITEMS,
  INITIAL_SYSTEM_IMAGES,
  SACCO_PRODUCTS,
  INITIAL_LEADERS,
  ANNOUNCEMENTS,
  INITIAL_APPLICATIONS,
  INITIAL_MOMENTS,
  THEME_OPTIONS,
  INITIAL_MANAGER_MESSAGES,
  INITIAL_JOB_POSTINGS,
  INITIAL_JOB_APPLICATIONS,
  TESTIMONIALS,
  INITIAL_HERO_CONTENT,
  INITIAL_HOME_METRICS,
  INITIAL_ABOUT_CONTENT,
} from './data/saccoData';
import { BRANCHES_DATA } from './data/saccoData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { AboutUs } from './components/AboutUs';
import { ProductCatalog } from './components/ProductCatalog';
import { ManagerMessageCard } from './components/ManagerMessageCard';
import { HomeVideoSection } from './components/HomeVideoSection';

import { BoardAndManagers } from './components/BoardAndManagers';
import { Gallery } from './components/Gallery';
import { CareersSection } from './components/CareersSection';
import { BranchLocator } from './components/BranchLocator';
import { GovernanceAndNews } from './components/GovernanceAndNews';
import { AccountApplicationModal } from './components/AccountApplicationModal';
import { ManagerLoginModal } from './components/ManagerLoginModal';
import { AdminConsoleModal } from './components/AdminConsoleModal';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Shield, Phone, ImageIcon, Compass, Settings, LogOut, Quote, Briefcase, Eye, ArrowRight, LayoutGrid, Users, Video } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  // Router hooks for navigation syncing

  const navigate = useNavigate();
  const location = useLocation();
  // Sync URL path with activeView state
  useEffect(() => {
    const path = location.pathname.replace(/^\//, '') || 'all';
    setActiveView(path);
  }, [location.pathname]);

  // Theme Color State
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_theme_color') as ThemeColor;
      if (['emerald', 'ochre', 'blue', 'teal', 'terracotta', 'charcoal'].includes(saved)) {
        return saved;
      }
      return 'emerald';
    } catch {
      return 'emerald';
    }
  });

  // Dedicated View Navigation State: 'all' or specific section id ('hero', 'about', 'products', 'leadership', 'announcements', 'gallery', 'careers', 'branches', 'contact')
  const [activeView, setActiveView] = useState<string>('all');
  // Navigation handler using react-router
  const handleNavigateToSection = (sectionId: string) => {
    const targetPath = sectionId === 'all' ? '/' : `/${sectionId}`;
    navigate(targetPath);
  };


  // Modal Visibility States
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [isManagerLoginModalOpen, setIsManagerLoginModalOpen] = useState(false);
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState(false);
  const [adminConsoleInitialTab, setAdminConsoleInitialTab] = useState<
    'contact' | 'pictures' | 'navigation' | 'leaders' | 'moments' | 'products' | 'announcements' | 'applications' | 'careers' | 'job-applicants' | 'theme' | 'guide' | 'branches' | 'inquiries' | 'messages' | 'impact' | 'videos' | 'home-hero' | 'home-metrics' | 'about'
  >('contact');

  // Authentication State (Manager: Mbitsemunda Phocas / Board: Wellarse, Bartazal)
  const [isManagerLoggedIn, setIsManagerLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ubumwe_manager_session') === 'true';
    } catch {
      return false;
    }
  });
  const [managerName, setManagerName] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('ubumwe_manager_name');
      if (stored && !stored.includes('Beata')) {
        return stored;
      }
      return 'Mbitsemunda Phocas (Manager)';
    } catch {
      return 'Mbitsemunda Phocas (Manager)';
    }
  });

  // Dynamic Contact & Organization Information
  const [saccoInfo, setSaccoInfo] = useState<SaccoContactInfo>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_sacco_info');
      return saved ? JSON.parse(saved) : SACCO_INFO;
    } catch {
      return SACCO_INFO;
    }
  });

  // Dynamic Navigation Items (Ensuring Careers is present)
  const [navItems, setNavItems] = useState<NavItemConfig[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_nav_items');
      if (saved) {
        const parsed: NavItemConfig[] = JSON.parse(saved);
        if (!parsed.some((n) => n.id === 'nav-careers' || n.targetSection === 'careers')) {
          // Insert Careers right before Branches
          const branchIdx = parsed.findIndex((n) => n.targetSection === 'branches');
          const insertIdx = branchIdx !== -1 ? branchIdx : parsed.length - 1;
          parsed.splice(insertIdx, 0, {
            id: 'nav-careers',
            labelEn: 'Careers',
            labelRw: 'Imirimo',
            targetSection: 'careers',
            visible: true,
          });
        }
        return parsed;
      }
      return INITIAL_NAV_ITEMS;
    } catch {
      return INITIAL_NAV_ITEMS;
    }
  });

  // Dynamic System Images (Hero, Leaders, Moments, Co-op Photos)
  const [systemImages, setSystemImages] = useState<SystemImagesConfig>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_system_images');
      return saved ? JSON.parse(saved) : INITIAL_SYSTEM_IMAGES;
    } catch {
      return INITIAL_SYSTEM_IMAGES;
    }
  });

  // Dynamic Leaders (Wellarse, Mbitsemunda Phocas, Bartazal)
  const [leaders, setLeaders] = useState<LeaderMember[]>(() => {
    try {
      const version = localStorage.getItem('ubumwe_leaders_version');
      const saved = localStorage.getItem('ubumwe_leaders');
      if (version === 'v5' && saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem('ubumwe_leaders_version', 'v5');
      localStorage.setItem('ubumwe_leaders', JSON.stringify(INITIAL_LEADERS));
      return INITIAL_LEADERS;
    } catch {
      return INITIAL_LEADERS;
    }
  });

  const [products, setProducts] = useState<SaccoProduct[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_products');
      return saved ? JSON.parse(saved) : SACCO_PRODUCTS;
    } catch {
      return SACCO_PRODUCTS;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_announcements');
      return saved ? JSON.parse(saved) : ANNOUNCEMENTS;
    } catch {
      return ANNOUNCEMENTS;
    }
  });

  const [moments, setMoments] = useState<InstitutionMoment[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_moments');
      return saved ? JSON.parse(saved) : INITIAL_MOMENTS;
    } catch {
      return INITIAL_MOMENTS;
    }
  });

  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [branches, setBranches] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_branches');
      return saved ? JSON.parse(saved) : BRANCHES_DATA;
    } catch {
      return BRANCHES_DATA;
    }
  });

  const [contactInquiries, setContactInquiries] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_contact_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamic Manager & Leadership Messages
  const [managerMessages, setManagerMessages] = useState<ManagerMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_manager_messages');
      return saved ? JSON.parse(saved) : INITIAL_MANAGER_MESSAGES;
    } catch {
      return INITIAL_MANAGER_MESSAGES;
    }
  });

  // Dynamic Job Postings (Careers)
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_job_postings');
      return saved ? JSON.parse(saved) : INITIAL_JOB_POSTINGS;
    } catch {
      return INITIAL_JOB_POSTINGS;
    }
  });

  // Dynamic Job Applications Received
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_job_applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_JOB_APPLICATIONS;
    } catch {
      return INITIAL_JOB_APPLICATIONS;
    }
  });

  // Dynamic Community Impact Stories (CRUD)
  const [communityStories, setCommunityStories] = useState<CommunityImpactStory[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_community_stories');
      return saved ? JSON.parse(saved) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  });

  // Dynamic Client Attraction Videos (Optional on Home Page)
  const [homeVideos, setHomeVideos] = useState<HomeVideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_home_videos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamic Hero Content (Headlines, CTA Text)
  const [heroContent, setHeroContent] = useState<HeroContentConfig>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_hero_content');
      return saved ? JSON.parse(saved) : INITIAL_HERO_CONTENT;
    } catch {
      return INITIAL_HERO_CONTENT;
    }
  });

  // Dynamic Home Metrics (CRUD)
  const [homeMetrics, setHomeMetrics] = useState<HomeMetricItem[]>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_home_metrics');
      return saved ? JSON.parse(saved) : INITIAL_HOME_METRICS;
    } catch {
      return INITIAL_HOME_METRICS;
    }
  });

  // Dynamic About Us Content (Story, Values)
  const [aboutContent, setAboutContent] = useState<AboutContentConfig>(() => {
    try {
      const saved = localStorage.getItem('ubumwe_about_content');
      return saved ? JSON.parse(saved) : INITIAL_ABOUT_CONTENT;
    } catch {
      return INITIAL_ABOUT_CONTENT;
    }
  });

  // Pre-fill loan calculator detail state
  const [prefillLoan, setPrefillLoan] = useState<{
    amount: number;
    tenureMonths: number;
    loanType: string;
    monthlyPayment: number;
  } | null>(null);
  const [prefillProductType, setPrefillProductType] = useState<string>('');

  // Save states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_sacco_info', JSON.stringify(saccoInfo));
    } catch (e) {
      console.warn('Unable to save sacco info', e);
    }
  }, [saccoInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_nav_items', JSON.stringify(navItems));
    } catch (e) {
      console.warn('Unable to save nav items', e);
    }
  }, [navItems]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_system_images', JSON.stringify(systemImages));
    } catch (e) {
      console.warn('Unable to save system images', e);
    }
  }, [systemImages]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_leaders', JSON.stringify(leaders));
    } catch (e) {
      console.warn('Unable to save leaders to localStorage', e);
    }
  }, [leaders]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Unable to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_announcements', JSON.stringify(announcements));
    } catch (e) {
      console.warn('Unable to save announcements to localStorage', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_moments', JSON.stringify(moments));
    } catch (e) {
      console.warn('Unable to save moments to localStorage', e);
    }
  }, [moments]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_applications', JSON.stringify(applications));
    } catch (e) {
      console.warn('Unable to save applications to localStorage', e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_branches', JSON.stringify(branches));
    } catch {}
  }, [branches]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_job_postings', JSON.stringify(jobPostings));
    } catch (e) {
      console.warn('Unable to save job postings', e);
    }
  }, [jobPostings]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_job_applications', JSON.stringify(jobApplications));
    } catch (e) {
      console.warn('Unable to save job applications', e);
    }
  }, [jobApplications]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_community_stories', JSON.stringify(communityStories));
    } catch (e) {
      console.warn('Unable to save community stories', e);
    }
  }, [communityStories]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_home_videos', JSON.stringify(homeVideos));
    } catch (e) {
      console.warn('Unable to save home attraction videos', e);
    }
  }, [homeVideos]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_hero_content', JSON.stringify(heroContent));
    } catch {}
  }, [heroContent]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_home_metrics', JSON.stringify(homeMetrics));
    } catch {}
  }, [homeMetrics]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_about_content', JSON.stringify(aboutContent));
    } catch {}
  }, [aboutContent]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_contact_inquiries', JSON.stringify(contactInquiries));
    } catch {}
  }, [contactInquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_manager_messages', JSON.stringify(managerMessages));
    } catch {}
  }, [managerMessages]);

  useEffect(() => {
    try {
      localStorage.setItem('ubumwe_theme_color', currentTheme);
      document.documentElement.setAttribute('data-theme', currentTheme);
      document.body.setAttribute('data-theme', currentTheme);
    } catch {}
  }, [currentTheme]);

  // Auth Handlers
  const handleManagerLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setIsManagerLoggedIn(true);
    setManagerName(user.name);
    try {
      localStorage.setItem('ubumwe_manager_session', 'true');
      localStorage.setItem('ubumwe_manager_name', user.name);
    } catch {}
  };

  const handleManagerLogout = () => {
    setIsManagerLoggedIn(false);
    try {
      localStorage.removeItem('ubumwe_manager_session');
      localStorage.removeItem('ubumwe_manager_name');
    } catch {}
  };

  const handleOpenAdminConsole = (tab?: string) => {
    if (tab) {
      setAdminConsoleInitialTab(tab as any);
    }
    setIsAdminConsoleOpen(true);
  };

  // Contact Info Handlers
  const handleUpdateSaccoInfo = (updated: Partial<SaccoContactInfo>) => {
    setSaccoInfo((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('ubumwe_sacco_info', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Navigation Items Handlers
  const handleAddNavItem = (newItem: Omit<NavItemConfig, 'id'>) => {
    const itemWithId: NavItemConfig = {
      ...newItem,
      id: `nav-${Date.now()}`,
    };
    setNavItems((prev) => [...prev, itemWithId]);
  };

  const handleUpdateNavItem = (id: string, updated: Partial<NavItemConfig>) => {
    setNavItems((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)));
  };

  const handleDeleteNavItem = (id: string) => {
    setNavItems((prev) => prev.filter((n) => n.id !== id));
  };

  const handleReorderNavItems = (items: NavItemConfig[]) => {
    setNavItems(items);
  };

  const handleResetNavItems = () => {
    setNavItems(INITIAL_NAV_ITEMS);
  };

  // System Images Handlers
  const handleUpdateSystemImage = (key: string, url: string) => {
    setSystemImages((prev) => {
      const next = { ...prev, [key]: url };
      try {
        localStorage.setItem('ubumwe_system_images', JSON.stringify(next));
      } catch {}
      return next;
    });

    // Cross-sync portraits with leaders list and manager messages
    if (key === 'managerPortrait') {
      setLeaders((prev) =>
        prev.map((l) =>
          l.name.toLowerCase().includes('mbitsemunda') || l.roleEn.toLowerCase().includes('manager')
            ? { ...l, imageUrl: url }
            : l
        )
      );
      setManagerMessages((prev) =>
        prev.map((m) =>
          m.authorName.toLowerCase().includes('mbitsemunda') || m.authorRole.toLowerCase().includes('manager')
            ? { ...m, imageUrl: url }
            : m
        )
      );
    } else if (key === 'boardChairPortrait') {
      setLeaders((prev) =>
        prev.map((l) => (l.name.toLowerCase().includes('wellarse') ? { ...l, imageUrl: url } : l))
      );
      setManagerMessages((prev) =>
        prev.map((m) =>
          m.authorName.toLowerCase().includes('wellarse') || m.authorRole.toLowerCase().includes('chair')
            ? { ...m, imageUrl: url }
            : m
        )
      );
    } else if (key === 'bartazalPortrait') {
      setLeaders((prev) =>
        prev.map((l) => (l.name.toLowerCase().includes('bartazal') ? { ...l, imageUrl: url } : l))
      );
    }
  };

  // CRUD Handlers for Leaders
  const handleAddLeader = (newLeader: Omit<LeaderMember, 'id'>) => {
    const leaderWithId: LeaderMember = {
      ...newLeader,
      id: `lead-${Date.now()}`,
    };
    setLeaders((prev) => [leaderWithId, ...prev]);
  };

  const handleUpdateLeader = (id: string, updated: Partial<LeaderMember>) => {
    setLeaders((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));
  };

  const handleDeleteLeader = (id: string) => {
    setLeaders((prev) => prev.filter((l) => l.id !== id));
  };

  // CRUD Handlers for Products
  const handleAddProduct = (newProduct: Omit<SaccoProduct, 'id'>) => {
    const productWithId: SaccoProduct = {
      ...newProduct,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [productWithId, ...prev]);
  };

  const handleUpdateProduct = (id: string, updated: Partial<SaccoProduct>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // CRUD Handlers for Announcements
  const handleAddAnnouncement = (newAnn: Omit<Announcement, 'id'>) => {
    const annWithId: Announcement = {
      ...newAnn,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [annWithId, ...prev]);
  };

  const handleUpdateAnnouncement = (id: string, updated: Partial<Announcement>) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // CRUD Handlers for Moments & Gallery
  const handleAddMoment = (newMoment: Omit<InstitutionMoment, 'id'>) => {
    const momentWithId: InstitutionMoment = {
      ...newMoment,
      id: `moment-${Date.now()}`,
    };
    setMoments((prev) => [momentWithId, ...prev]);
  };

  const handleUpdateMoment = (id: string, updated: Partial<InstitutionMoment>) => {
    setMoments((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
  };

  const handleDeleteMoment = (id: string) => {
    setMoments((prev) => prev.filter((m) => m.id !== id));
  };

  // KYC Application Handlers
  const handleUpdateApplicationStatus = (id: string, status: 'approved' | 'rejected') => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const handleAddBranch = (branch: Omit<BranchOutpost, 'id'>) => {
    const newB = { ...branch, id: `branch-${Date.now()}` };
    setBranches((prev) => [newB, ...prev]);
  };

  const handleUpdateBranch = (id: string, updated: Partial<BranchOutpost>) => {
    setBranches((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
  };

  const handleDeleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  const handleAddSubBranch = (branchId: string, sub: { name: string; sector: string; managerName: string; phone: string }) => {
    setBranches((prev) =>
      prev.map((b) => {
        if (b.id === branchId) {
          const subList = b.subBranches || [];
          return { ...b, subBranches: [...subList, { ...sub, id: `sub-${Date.now()}` }] };
        }
        return b;
      })
    );
  };

  const handleDeleteSubBranch = (branchId: string, subId: string) => {
    setBranches((prev) =>
      prev.map((b) => {
        if (b.id === branchId) {
          return { ...b, subBranches: (b.subBranches || []).filter((s: { id: string }) => s.id !== subId) };
        }
        return b;
      })
    );
  };

  const handleDeleteContactInquiry = (id: string) => {
    setContactInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  // Community Impact Stories Handlers (CRUD)
  const handleAddCommunityStory = (story: Omit<CommunityImpactStory, 'id'>) => {
    const newStory: CommunityImpactStory = {
      ...story,
      id: `story-${Date.now()}`,
    };
    setCommunityStories((prev) => [newStory, ...prev]);
  };

  const handleUpdateCommunityStory = (id: string, updated: Partial<CommunityImpactStory>) => {
    setCommunityStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const handleDeleteCommunityStory = (id: string) => {
    setCommunityStories((prev) => prev.filter((s) => s.id !== id));
  };

  // Manager Messages Handlers (CRUD)
  const handleAddManagerMessage = (message: Omit<ManagerMessage, 'id'>) => {
    const newMsg = { ...message, id: `msg-${Date.now()}` };
    setManagerMessages((prev) => [newMsg, ...prev]);
  };

  const handleUpdateManagerMessage = (id: string, updated: Partial<ManagerMessage>) => {
    setManagerMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const handleDeleteManagerMessage = (id: string) => {
    setManagerMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Dynamic Client Attraction Videos Handlers (CRUD - Optional on Home Page)
  const handleAddHomeVideo = (video: Omit<HomeVideoItem, 'id'>) => {
    const newVid: HomeVideoItem = {
      ...video,
      id: `video-${Date.now()}`,
    };
    setHomeVideos((prev) => [newVid, ...prev]);
  };

  const handleUpdateHomeVideo = (id: string, updated: Partial<HomeVideoItem>) => {
    setHomeVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updated } : v))
    );
  };

  const handleDeleteHomeVideo = (id: string) => {
    setHomeVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // Hero Content Handlers
  const handleUpdateHeroContent = (updated: Partial<HeroContentConfig>) => {
    setHeroContent((prev) => ({ ...prev, ...updated }));
  };

  // Home Metrics CRUD Handlers
  const handleAddHomeMetric = (metric: Omit<HomeMetricItem, 'id'>) => {
    const newMetric: HomeMetricItem = { ...metric, id: `metric-${Date.now()}` };
    setHomeMetrics((prev) => [...prev, newMetric]);
  };

  const handleUpdateHomeMetric = (id: string, updated: Partial<HomeMetricItem>) => {
    setHomeMetrics((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
  };

  const handleDeleteHomeMetric = (id: string) => {
    setHomeMetrics((prev) => prev.filter((m) => m.id !== id));
  };

  const handleResetHomeMetrics = () => {
    setHomeMetrics(INITIAL_HOME_METRICS);
  };

  // About Content Handlers
  const handleUpdateAboutContent = (updated: Partial<AboutContentConfig>) => {
    setAboutContent((prev) => ({ ...prev, ...updated }));
  };

  const handleAddAboutValue = (val: Omit<AboutValueItem, 'id'>) => {
    const newVal: AboutValueItem = { ...val, id: `val-${Date.now()}` };
    setAboutContent((prev) => ({ ...prev, values: [...(prev.values || []), newVal] }));
  };

  const handleUpdateAboutValue = (id: string, updated: Partial<AboutValueItem>) => {
    setAboutContent((prev) => ({
      ...prev,
      values: (prev.values || []).map((v) => (v.id === id ? { ...v, ...updated } : v)),
    }));
  };

  const handleDeleteAboutValue = (id: string) => {
    setAboutContent((prev) => ({
      ...prev,
      values: (prev.values || []).filter((v) => v.id !== id),
    }));
  };

  const homeManagerMessage = managerMessages.find((m) => m.active && m.showOnHome);
  const aboutManagerMessage = managerMessages.find((m) => m.active && m.showOnAbout);

  // Careers & Job Vacancies Handlers (CRUD)
  const handleAddJobPosting = (newJob: Omit<JobPosting, 'id' | 'postedDate'>) => {
    const jobWithId: JobPosting = {
      ...newJob,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
    };
    setJobPostings((prev) => [jobWithId, ...prev]);
  };

  const handleUpdateJobPosting = (id: string, updated: Partial<JobPosting>) => {
    setJobPostings((prev) => prev.map((j) => (j.id === id ? { ...j, ...updated } : j)));
  };

  const handleDeleteJobPosting = (id: string) => {
    setJobPostings((prev) => prev.filter((j) => j.id !== id));
  };

  const handleSubmitJobApplication = (app: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => {
    const newApp: JobApplication = {
      ...app,
      id: `job-app-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setJobApplications((prev) => [newApp, ...prev]);
  };

  const handleUpdateJobApplicationStatus = (id: string, status: JobApplication['status']) => {
    setJobApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleUpdateJobApplication = (id: string, updated: Partial<JobApplication>) => {
    setJobApplications((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  };

  const handleAddJobApplication = (app: Omit<JobApplication, 'id'>) => {
    const newApp: JobApplication = {
      ...app,
      id: `job-app-${Date.now()}`,
    };
    setJobApplications((prev) => [newApp, ...prev]);
  };

  const handleDeleteJobApplication = (id: string) => {
    setJobApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const handleResetJobApplications = () => {
    setJobApplications(INITIAL_JOB_APPLICATIONS);
    try {
      localStorage.setItem('ubumwe_job_applications', JSON.stringify(INITIAL_JOB_APPLICATIONS));
    } catch {}
  };



























  const getSectionTitle = (viewKey: string) => {
    switch (viewKey) {
      case 'hero':
      case 'home':
        return currentLang === 'en' ? 'Home & Welcome' : 'Ahabanza';
      case 'about':
        return currentLang === 'en' ? 'About Us · Cooperative Governance' : 'Abo Turibo · Amateka n\'Imiyoborere';
      case 'products':
      case 'calculator':
        return currentLang === 'en' ? 'Our Services & Loan Calculator' : 'Serivisi Zacu n\'Imibare y\'Inguzanyo';
      case 'leadership':
        return currentLang === 'en' ? 'Board of Directors & Management' : 'Abayobozi n\'Abakozi';
      case 'announcements':
      case 'news':
        return currentLang === 'en' ? 'Official News & Press Bulletins' : 'Amakuru n\'Amatangazo';
      case 'gallery':
        return currentLang === 'en' ? 'Gallery & Memorable Milestones' : 'Amafoto y\'Ikigo n\'Ibihe Byiza';
      case 'careers':
        return currentLang === 'en' ? 'Careers & Employment Vacancies' : 'Imirimo n\'Amahirwe y\'Akazi';
      case 'branches':
        return currentLang === 'en' ? 'Branch Locator & Service Outposts' : 'Amashami n\'Ibiro by\'Imari';
      case 'contact':
        return currentLang === 'en' ? 'Contact Us & Headquarter Map' : 'Twandikire & Ikarita y\'Ibiro';
      default:
        return currentLang === 'en' ? 'All Sections' : 'Ibice Byose';
    }
  };

  // Calculator / Product Apply Interactions
  const handleApplyWithCalculation = (calc: {
    amount: number;
    tenureMonths: number;
    loanType: string;
    monthlyPayment: number;
  }) => {
    setPrefillLoan(calc);
    setIsMembershipModalOpen(true);
  };

  const handleSelectProductForLoan = (product: SaccoProduct) => {
    handleNavigateToSection('products');
  };

  const handleSelectProductForAccount = (product: SaccoProduct) => {
    setPrefillProductType(product.category);
    setIsMembershipModalOpen(true);
  };

  const handleOpenMembershipModal = () => {
    setPrefillLoan(null);
    setPrefillProductType('');
    setIsMembershipModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Universal Top Header with Active Section Highlighting */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenMembershipModal={handleOpenMembershipModal}
        onNavigateToSection={handleNavigateToSection}
        isManagerLoggedIn={isManagerLoggedIn}
        managerName={managerName}
        onOpenAdminConsole={handleOpenAdminConsole}
        onManagerLogout={handleManagerLogout}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        saccoInfo={saccoInfo}
        navItems={navItems}
        systemImages={systemImages}
        onOpenManagerLogin={() => setIsManagerLoginModalOpen(true)}
        activeSection={activeView}
      />


      {/* Main Content Area: Selective Rendering according to clicked navigation item */}
      <main className="flex-1">
        {/* 1. Home / Hero Section */}
        {(activeView === 'all' || activeView === 'hero') && (
          <>
            <Hero
              currentLang={currentLang}
              onOpenMembershipModal={handleOpenMembershipModal}
              onScrollToCalculator={() => handleNavigateToSection('products')}
              onOpenMomoModal={() => handleNavigateToSection('branches')}
              onScrollToContact={() => handleNavigateToSection('contact')}
              saccoInfo={saccoInfo}
              heroImage={systemImages.heroBanking}
              heroContent={heroContent}
              isAdmin={isManagerLoggedIn}
              onOpenAdminConsole={handleOpenAdminConsole}
            />

            {/* 4-Column Full-Width Metric Strip */}
            <Metrics
              currentLang={currentLang}
              saccoInfo={saccoInfo}
              metrics={homeMetrics}
              isAdmin={isManagerLoggedIn}
              onOpenAdminConsole={handleOpenAdminConsole}
              onDeleteMetric={handleDeleteHomeMetric}
            />

            {/* Featured Manager Message on Home Page */}
            {homeManagerMessage && (
              <ManagerMessageCard
                message={homeManagerMessage}
                currentLang={currentLang}
                isAdmin={isManagerLoggedIn}
                onEdit={() => handleOpenAdminConsole('messages')}
                onUpdateImage={(newUrl) => handleUpdateManagerMessage(homeManagerMessage.id, { imageUrl: newUrl })}
                variant="home"
              />
            )}

            {/* Dynamic Client Attraction Video Showcase (Optional on Home Page) */}
            <HomeVideoSection
              currentLang={currentLang}
              videos={homeVideos}
              isAdmin={isManagerLoggedIn}
              onOpenAdminConsole={handleOpenAdminConsole}
              onAddVideo={handleAddHomeVideo}
              onDeleteVideo={handleDeleteHomeVideo}
            />
          </>
        )}

        {/* 2. About Us Section (Cooperative History, Licensing, Mission & Leadership Message) */}
        {(activeView === 'all' || activeView === 'about') && (
          <AboutUs
            currentLang={currentLang}
            saccoInfo={saccoInfo}
            aboutContent={aboutContent}
            managerMessage={aboutManagerMessage}
            isAdmin={isManagerLoggedIn}
            onOpenAdminConsole={handleOpenAdminConsole}
            onUpdateManagerMessage={handleUpdateManagerMessage}
            onDeleteValue={handleDeleteAboutValue}
          />
        )}

        {/* 3. Our Services Section (Savings, Agri Loans, SME Microfinance, USSD *541# & Loan Calculator) */}
        {(activeView === 'all' || activeView === 'products' || activeView === 'calculator') && (
          <ProductCatalog
            currentLang={currentLang}
            products={products}
            isAdmin={isManagerLoggedIn}
            onOpenAdminConsole={() => handleOpenAdminConsole('products')}
            onSelectProductForLoan={handleSelectProductForLoan}
            onSelectProductForAccount={handleSelectProductForAccount}
            onApplyWithCalculation={handleApplyWithCalculation}
          />
        )}

        {/* 4. Board of Directors & Managers Section (Board Director: WELLARSE, Manager: MBITSEMUNDA PHOCAS, & Admin CRUD) */}
        {(activeView === 'all' || activeView === 'leadership') && (
          <BoardAndManagers
            currentLang={currentLang}
            leaders={leaders}
            isAdmin={isManagerLoggedIn}
            onAddLeader={handleAddLeader}
            onUpdateLeader={handleUpdateLeader}
            onDeleteLeader={handleDeleteLeader}
          />
        )}

        {/* 5. Official Announcements, News, & Community Impact Stories for UBUMWE SACCO GAKENKE */}
        {(activeView === 'all' || activeView === 'announcements' || activeView === 'news') && (
          <GovernanceAndNews
            currentLang={currentLang}
            announcements={announcements}
            communityStories={communityStories}
            isAdmin={isManagerLoggedIn}
            onOpenAdminConsole={handleOpenAdminConsole}
            onAddAnnouncement={handleAddAnnouncement}
            onUpdateAnnouncement={handleUpdateAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onAddCommunityStory={handleAddCommunityStory}
            onUpdateCommunityStory={handleUpdateCommunityStory}
            onDeleteCommunityStory={handleDeleteCommunityStory}
          />
        )}

        {/* 6. Place where we post Best Moments in our Institution & Gallery */}
        {(activeView === 'all' || activeView === 'gallery') && (
          <Gallery
            currentLang={currentLang}
            moments={moments}
            isAdmin={isManagerLoggedIn}
            onAddMoment={handleAddMoment}
            onUpdateMoment={handleUpdateMoment}
            onDeleteMoment={handleDeleteMoment}
            onOpenAdminConsole={handleOpenAdminConsole}
          />
        )}

        {/* 7. Careers & Job Postings for UBUMWE SACCO GAKENKE */}
        {(activeView === 'all' || activeView === 'careers' || activeView === 'jobs' || activeView === 'job-applicants') && (
          <CareersSection
            currentLang={currentLang}
            jobPostings={jobPostings}
            jobApplications={jobApplications}
            isAdmin={isManagerLoggedIn}
            onOpenAdminConsole={handleOpenAdminConsole}
            onAddJobPosting={handleAddJobPosting}
            onUpdateJobPosting={handleUpdateJobPosting}
            onDeleteJobPosting={handleDeleteJobPosting}
            onSubmitJobApplication={handleSubmitJobApplication}
            onAddJobApplication={handleAddJobApplication}
            onUpdateJobApplicationStatus={handleUpdateJobApplicationStatus}
            onUpdateJobApplication={handleUpdateJobApplication}
            onDeleteJobApplication={handleDeleteJobApplication}
            onResetJobApplications={handleResetJobApplications}
          />
        )}

        {/* 8. Gakenke District Branch & Outpost Directory */}
        {(activeView === 'all' || activeView === 'branches') && (
          <BranchLocator
            currentLang={currentLang}
            branches={branches}
            isAdmin={isManagerLoggedIn}
            onOpenAdminConsole={handleOpenAdminConsole}
          />
        )}

        {/* 9. Contact Us Section */}
        {(activeView === 'all' || activeView === 'contact') && (
          <ContactSection
            currentLang={currentLang}
            saccoInfo={saccoInfo}
            isAdmin={isManagerLoggedIn}
            onOpenAdminConsole={handleOpenAdminConsole}
          />
        )}
      </main>

      {/* Footer with Imigongo Framing, Credentials, Manager Sign In, & Theme Customizer */}
      <Footer
        currentLang={currentLang}
        onNavigateToSection={handleNavigateToSection}
        onOpenMembershipModal={handleOpenMembershipModal}
        isManagerLoggedIn={isManagerLoggedIn}
        managerName={managerName}
        onOpenManagerLogin={() => setIsManagerLoginModalOpen(true)}
        onOpenAdminConsole={handleOpenAdminConsole}
        onManagerLogout={handleManagerLogout}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        saccoInfo={saccoInfo}
        navItems={navItems}
      />

      {/* Online Membership & Credit Application Modal */}
      <AccountApplicationModal
        isOpen={isMembershipModalOpen}
        onClose={() => {
          setIsMembershipModalOpen(false);
          setPrefillLoan(null);
        }}
        currentLang={currentLang}
        prefillLoan={prefillLoan}
        prefillProductType={prefillProductType}
      />

      {/* Manager Sign In Modal (Accessed Exclusively From Footer) */}
      <ManagerLoginModal
        isOpen={isManagerLoginModalOpen}
        onClose={() => setIsManagerLoginModalOpen(false)}
        onLoginSuccess={handleManagerLoginSuccess}
      />

      {/* Manager / Admin Console (Comprehensive CRUD Hub) */}
      <AdminConsoleModal
        isOpen={isAdminConsoleOpen}
        onClose={() => setIsAdminConsoleOpen(false)}
        currentLang={currentLang}
        initialTab={adminConsoleInitialTab}
        saccoInfo={saccoInfo}
        onUpdateSaccoInfo={handleUpdateSaccoInfo}
        navItems={navItems}
        onAddNavItem={handleAddNavItem}
        onUpdateNavItem={handleUpdateNavItem}
        onDeleteNavItem={handleDeleteNavItem}
        onReorderNavItems={handleReorderNavItems}
        onResetNavItems={handleResetNavItems}
        systemImages={systemImages}
        onUpdateSystemImage={handleUpdateSystemImage}
        products={products}
        announcements={announcements}
        applications={applications}
        moments={moments}
        leaders={leaders}
        currentTheme={currentTheme}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddAnnouncement={handleAddAnnouncement}
        onUpdateAnnouncement={handleUpdateAnnouncement}
        onDeleteAnnouncement={handleDeleteAnnouncement}
        onAddMoment={handleAddMoment}
        onUpdateMoment={handleUpdateMoment}
        onDeleteMoment={handleDeleteMoment}
        onAddLeader={handleAddLeader}
        onUpdateLeader={handleUpdateLeader}
        onDeleteLeader={handleDeleteLeader}
        onUpdateApplicationStatus={handleUpdateApplicationStatus}
        onDeleteApplication={handleDeleteApplication}
        onThemeChange={setCurrentTheme}
        branches={branches}
        onAddBranch={handleAddBranch}
        onUpdateBranch={handleUpdateBranch}
        onDeleteBranch={handleDeleteBranch}
        onAddSubBranch={handleAddSubBranch}
        onDeleteSubBranch={handleDeleteSubBranch}
        communityStories={communityStories}
        onAddCommunityStory={handleAddCommunityStory}
        onUpdateCommunityStory={handleUpdateCommunityStory}
        onDeleteCommunityStory={handleDeleteCommunityStory}
        homeVideos={homeVideos}
        onAddHomeVideo={handleAddHomeVideo}
        onUpdateHomeVideo={handleUpdateHomeVideo}
        onDeleteHomeVideo={handleDeleteHomeVideo}
        heroContent={heroContent}
        onUpdateHeroContent={handleUpdateHeroContent}
        homeMetrics={homeMetrics}
        onAddHomeMetric={handleAddHomeMetric}
        onUpdateHomeMetric={handleUpdateHomeMetric}
        onDeleteHomeMetric={handleDeleteHomeMetric}
        onResetHomeMetrics={handleResetHomeMetrics}
        aboutContent={aboutContent}
        onUpdateAboutContent={handleUpdateAboutContent}
        onAddAboutValue={handleAddAboutValue}
        onUpdateAboutValue={handleUpdateAboutValue}
        onDeleteAboutValue={handleDeleteAboutValue}
        contactInquiries={contactInquiries}
        onDeleteContactInquiry={handleDeleteContactInquiry}
        managerMessages={managerMessages}
        onAddManagerMessage={handleAddManagerMessage}
        onUpdateManagerMessage={handleUpdateManagerMessage}
        onDeleteManagerMessage={handleDeleteManagerMessage}
        jobPostings={jobPostings}
        jobApplications={jobApplications}
        onAddJobPosting={handleAddJobPosting}
        onUpdateJobPosting={handleUpdateJobPosting}
        onDeleteJobPosting={handleDeleteJobPosting}
        onAddJobApplication={handleAddJobApplication}
        onUpdateJobApplicationStatus={handleUpdateJobApplicationStatus}
        onUpdateJobApplication={handleUpdateJobApplication}
        onDeleteJobApplication={handleDeleteJobApplication}
        onResetJobApplications={handleResetJobApplications}
      />

      {/* Persistent Floating WhatsApp Quick-Action Widget */}
      <FloatingWhatsApp currentLang={currentLang} saccoInfo={saccoInfo} />

      {/* Active Manager Floating Quick Bar (Provides Admin Immediate Actions Everywhere on Screen) */}
      {isManagerLoggedIn && (
        <aside
          aria-label="Admin quick action bar"
          className="fixed bottom-6 left-6 z-40 bg-slate-900/95 text-white backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-slate-700 flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-3"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-emerald-400 border-r border-slate-700">
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin Mode</span>
          </div>

          <button
            type="button"
            onClick={() => handleOpenAdminConsole('contact')}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Edit Phone Numbers, Email, WhatsApp"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">Edit Contacts</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdminConsole('pictures')}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Upload or Change Pictures Anywhere in System"
          >
            <ImageIcon className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">Change Pictures</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdminConsole('navigation')}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Manage Navigation Links & Menu"
          >
            <Compass className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">Manage Navs</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdminConsole('messages')}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Manage Manager & Institutional Messages"
          >
            <Quote className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">Messages</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdminConsole('job-applicants')}
            className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ring-1 ring-emerald-500/50"
            title="Manage Job Applicants (Status, Comments, Review, Export)"
          >
            <Users className="w-3 h-3 text-emerald-300" />
            <span>Applicants ({jobApplications.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdminConsole('careers')}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Manage Careers & Job Vacancies"
          >
            <Briefcase className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">Vacancies ({jobPostings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdminConsole('videos')}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Upload or Manage Client Attraction Videos"
          >
            <Video className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">Videos ({homeVideos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdminConsole()}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            title="Open Complete Admin Operations Console"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin Console</span>
          </button>

          <button
            type="button"
            onClick={handleManagerLogout}
            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer ml-0.5"
            title="Exit Manager Mode"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}
    </div>
  );
}
