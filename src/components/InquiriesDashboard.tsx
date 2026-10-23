import React, { useState, useMemo } from 'react';
import { ContactInquiry, InquiryStatus, InquiryPriority, Language, SaccoContactInfo } from '../types';
import {
  Inbox,
  Clock,
  AlertCircle,
  CheckCircle2,
  Archive,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Mail,
  Phone,
  MessageSquare,
  User,
  Calendar,
  Sparkles,
  ArrowUpDown,
  RefreshCw,
  Download,
  X,
  Check,
  Send,
  Building2,
  FileText,
  Tag,
  Shield,
  ExternalLink,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface InquiriesDashboardProps {
  inquiries: ContactInquiry[];
  onAddInquiry?: (inq: Omit<ContactInquiry, 'id'>) => void;
  onUpdateInquiry?: (id: string, updated: Partial<ContactInquiry>) => void;
  onDeleteInquiry: (id: string) => void;
  onResetInquiries?: () => void;
  currentLang?: Language;
  saccoInfo?: SaccoContactInfo;
}

export const InquiriesDashboard: React.FC<InquiriesDashboardProps> = ({
  inquiries,
  onAddInquiry,
  onUpdateInquiry,
  onDeleteInquiry,
  onResetInquiries,
  currentLang = 'en',
  saccoInfo,
}) => {
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedSender, setSelectedSender] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'sender'>('newest');

  // Modal states
  const [inspectInquiry, setInspectInquiry] = useState<ContactInquiry | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<ContactInquiry | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Inspector quick-notes state
  const [inspectorNotes, setInspectorNotes] = useState('');
  const [replyDraft, setReplyDraft] = useState('');
  const [copiedReply, setCopiedReply] = useState(false);

  // Add / Edit Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Loan Application & Terms');
  const [formMessage, setFormMessage] = useState('');
  const [formSector, setFormSector] = useState('Gakenke');
  const [formStatus, setFormStatus] = useState<InquiryStatus>('pending');
  const [formPriority, setFormPriority] = useState<InquiryPriority>('medium');
  const [formSource, setFormSource] = useState<'website' | 'phone' | 'walk_in' | 'email'>('website');
  const [formNotes, setFormNotes] = useState('');

  // Extract unique senders for sender filter
  const uniqueSenders = useMemo(() => {
    const map = new Map<string, { name: string; count: number; email?: string }>();
    inquiries.forEach((inq) => {
      const key = inq.name.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, { name: inq.name.trim(), count: 1, email: inq.email });
      } else {
        const item = map.get(key)!;
        item.count += 1;
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [inquiries]);

  // KPI Metrics computation
  const stats = useMemo(() => {
    const total = inquiries.length;
    const pending = inquiries.filter((i) => !i.status || i.status === 'pending').length;
    const inReview = inquiries.filter((i) => i.status === 'in_review').length;
    const resolved = inquiries.filter((i) => i.status === 'resolved').length;
    const archived = inquiries.filter((i) => i.status === 'archived').length;
    return { total, pending, inReview, resolved, archived };
  }, [inquiries]);

  // Filter & Search logic
  const filteredInquiries = useMemo(() => {
    return inquiries
      .filter((inq) => {
        // Status filter
        if (selectedStatus !== 'all') {
          const currentStatus = inq.status || 'pending';
          if (currentStatus !== selectedStatus) return false;
        }

        // Priority filter
        if (selectedPriority !== 'all') {
          const currentPriority = inq.priority || 'medium';
          if (currentPriority !== selectedPriority) return false;
        }

        // Sender filter
        if (selectedSender !== 'all') {
          if (inq.name.trim().toLowerCase() !== selectedSender.toLowerCase()) return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = inq.name.toLowerCase().includes(q);
          const matchEmail = (inq.email || '').toLowerCase().includes(q);
          const matchPhone = inq.phone.toLowerCase().includes(q);
          const matchSubject = inq.subject.toLowerCase().includes(q);
          const matchMsg = inq.message.toLowerCase().includes(q);
          const matchNotes = (inq.notes || '').toLowerCase().includes(q);
          const matchSector = (inq.sector || '').toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchPhone && !matchSubject && !matchMsg && !matchNotes && !matchSector) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'sender') {
          return a.name.localeCompare(b.name);
        }
        // Default: Sort by ID / timestamp (newest first)
        const idA = a.id || '';
        const idB = b.id || '';
        return sortBy === 'oldest' ? idA.localeCompare(idB) : idB.localeCompare(idA);
      });
  }, [inquiries, selectedStatus, selectedPriority, selectedSender, searchQuery, sortBy]);

  // Open Inspector
  const handleOpenInspect = (inq: ContactInquiry) => {
    setInspectInquiry(inq);
    setInspectorNotes(inq.notes || '');
    setReplyDraft(
      `Dear ${inq.name},\n\nThank you for contacting UBUMWE SACCO GAKENKE regarding "${inq.subject}".\n\n`
    );
    setCopiedReply(false);
  };

  // Quick Inline Status Update
  const handleQuickStatusChange = (inqId: string, newStatus: InquiryStatus) => {
    if (onUpdateInquiry) {
      onUpdateInquiry(inqId, {
        status: newStatus,
        resolvedAt: newStatus === 'resolved' ? new Date().toLocaleDateString() : undefined,
      });
    }
    if (inspectInquiry && inspectInquiry.id === inqId) {
      setInspectInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Save Inspector Notes
  const handleSaveInspectorNotes = () => {
    if (inspectInquiry && onUpdateInquiry) {
      onUpdateInquiry(inspectInquiry.id, {
        notes: inspectorNotes.trim(),
      });
      setInspectInquiry((prev) => (prev ? { ...prev, notes: inspectorNotes.trim() } : null));
    }
  };

  // Open Create Form
  const handleOpenAdd = () => {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormSubject('Loan Application & Terms');
    setFormMessage('');
    setFormSector('Gakenke');
    setFormStatus('pending');
    setFormPriority('medium');
    setFormSource('website');
    setFormNotes('');
    setIsAddModalOpen(true);
  };

  // Open Edit Form
  const handleOpenEdit = (inq: ContactInquiry) => {
    setEditingInquiry(inq);
    setFormName(inq.name);
    setFormEmail(inq.email || '');
    setFormPhone(inq.phone);
    setFormSubject(inq.subject);
    setFormMessage(inq.message);
    setFormSector(inq.sector || 'Gakenke');
    setFormStatus(inq.status || 'pending');
    setFormPriority(inq.priority || 'medium');
    setFormSource(inq.source || 'website');
    setFormNotes(inq.notes || '');
    setIsEditModalOpen(true);
  };

  // Submit Add
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim() || !formMessage.trim()) return;

    if (onAddInquiry) {
      onAddInquiry({
        name: formName.trim(),
        email: formEmail.trim() || undefined,
        phone: formPhone.trim(),
        subject: formSubject.trim(),
        message: formMessage.trim(),
        sector: formSector,
        status: formStatus,
        priority: formPriority,
        source: formSource,
        notes: formNotes.trim() || undefined,
        createdAt: new Date().toLocaleString(),
        date: new Date().toLocaleString(),
        recipientEmail: saccoInfo?.email || 'ubumwesaccogakenke@gmail.com',
      });
    }
    setIsAddModalOpen(false);
  };

  // Submit Edit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInquiry || !formName.trim() || !formPhone.trim()) return;

    if (onUpdateInquiry) {
      onUpdateInquiry(editingInquiry.id, {
        name: formName.trim(),
        email: formEmail.trim() || undefined,
        phone: formPhone.trim(),
        subject: formSubject.trim(),
        message: formMessage.trim(),
        sector: formSector,
        status: formStatus,
        priority: formPriority,
        source: formSource,
        notes: formNotes.trim() || undefined,
        resolvedAt: formStatus === 'resolved' ? new Date().toLocaleDateString() : editingInquiry.resolvedAt,
      });
    }

    if (inspectInquiry && inspectInquiry.id === editingInquiry.id) {
      setInspectInquiry((prev) =>
        prev
          ? {
              ...prev,
              name: formName.trim(),
              email: formEmail.trim(),
              phone: formPhone.trim(),
              subject: formSubject.trim(),
              message: formMessage.trim(),
              status: formStatus,
              priority: formPriority,
              notes: formNotes.trim(),
            }
          : null
      );
    }
    setIsEditModalOpen(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Sender Name', 'Email', 'Phone', 'Subject', 'Status', 'Priority', 'Message', 'Notes'];
    const rows = filteredInquiries.map((i) => [
      i.id,
      i.createdAt || i.date || '',
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email || ''}"`,
      `"${i.phone}"`,
      `"${i.subject.replace(/"/g, '""')}"`,
      i.status || 'pending',
      i.priority || 'medium',
      `"${i.message.replace(/"/g, '""')}"`,
      `"${(i.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ubumwe_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status?: InquiryStatus) => {
    switch (status) {
      case 'in_review':
        return {
          label: 'In Review',
          color: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-500',
        };
      case 'resolved':
        return {
          label: 'Resolved',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
        };
      case 'archived':
        return {
          label: 'Archived',
          color: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
      case 'pending':
      default:
        return {
          label: 'Pending',
          color: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
        };
    }
  };

  const getPriorityBadge = (priority?: InquiryPriority) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">Urgent</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">High</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Low</span>;
      case 'medium':
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Medium</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Dashboard Top Header & Primary Action Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold">
              <Inbox className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Inquiries & Member Communications Dashboard
              </h2>
              <p className="text-xs text-slate-500">
                Receive, review, update statuses, and perform CRUD operations on all member requests.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          {onResetInquiries && (
            <button
              type="button"
              onClick={onResetInquiries}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset with sample verified inquiries"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Samples</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExportCSV}
            disabled={inquiries.length === 0}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Download inquiries as CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log New Inquiry</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Strip Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* All Inquiries */}
        <button
          type="button"
          onClick={() => setSelectedStatus('all')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatus === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900'
              : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className={selectedStatus === 'all' ? 'text-slate-300' : 'text-slate-500'}>
              All Inquiries
            </span>
            <Inbox className={`w-4 h-4 ${selectedStatus === 'all' ? 'text-white' : 'text-slate-400'}`} />
          </div>
          <span className="text-2xl font-black">{stats.total}</span>
          <span className={`text-[10px] block mt-1 ${selectedStatus === 'all' ? 'text-emerald-300' : 'text-slate-400'}`}>
            Complete Inbox Records
          </span>
        </button>

        {/* Pending */}
        <button
          type="button"
          onClick={() => setSelectedStatus('pending')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatus === 'pending'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-500'
              : 'bg-white hover:bg-amber-50/50 border-amber-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className={selectedStatus === 'pending' ? 'text-amber-100' : 'text-amber-700'}>
              Pending Action
            </span>
            <Clock className={`w-4 h-4 ${selectedStatus === 'pending' ? 'text-white' : 'text-amber-500'}`} />
          </div>
          <span className="text-2xl font-black">{stats.pending}</span>
          <span className={`text-[10px] block mt-1 ${selectedStatus === 'pending' ? 'text-white/90' : 'text-amber-600 font-medium'}`}>
            Requires Attention
          </span>
        </button>

        {/* In Review */}
        <button
          type="button"
          onClick={() => setSelectedStatus('in_review')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatus === 'in_review'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-600'
              : 'bg-white hover:bg-blue-50/50 border-blue-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className={selectedStatus === 'in_review' ? 'text-blue-100' : 'text-blue-700'}>
              In Review
            </span>
            <AlertCircle className={`w-4 h-4 ${selectedStatus === 'in_review' ? 'text-white' : 'text-blue-500'}`} />
          </div>
          <span className="text-2xl font-black">{stats.inReview}</span>
          <span className={`text-[10px] block mt-1 ${selectedStatus === 'in_review' ? 'text-white/90' : 'text-blue-600 font-medium'}`}>
            Processing with Officers
          </span>
        </button>

        {/* Resolved */}
        <button
          type="button"
          onClick={() => setSelectedStatus('resolved')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatus === 'resolved'
              ? 'bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-700'
              : 'bg-white hover:bg-emerald-50/50 border-emerald-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className={selectedStatus === 'resolved' ? 'text-emerald-100' : 'text-emerald-700'}>
              Resolved
            </span>
            <CheckCircle2 className={`w-4 h-4 ${selectedStatus === 'resolved' ? 'text-white' : 'text-emerald-500'}`} />
          </div>
          <span className="text-2xl font-black">{stats.resolved}</span>
          <span className={`text-[10px] block mt-1 ${selectedStatus === 'resolved' ? 'text-white/90' : 'text-emerald-600 font-medium'}`}>
            Successfully Handled
          </span>
        </button>

        {/* Unique Senders */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs font-bold mb-1 text-slate-500">
            <span>Unique Senders</span>
            <User className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">{uniqueSenders.length}</span>
          <span className="text-[10px] text-slate-400 block mt-1">
            Members & Cooperatives
          </span>
        </div>
      </div>

      {/* Multi-Dimensional Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by sender name, phone, email, subject, or message words..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Senders Filter Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-bold">Sender:</span>
            </div>
            <select
              value={selectedSender}
              onChange={(e) => setSelectedSender(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Senders ({uniqueSenders.length})</option>
              {uniqueSenders.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.count} {s.count === 1 ? 'inquiry' : 'inquiries'})
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
              <Tag className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-bold">Priority:</span>
            </div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-bold">Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="sender">Sender Name (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Status Filter Pill Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-emerald-700" />
            <span>Status:</span>
          </span>
          {[
            { id: 'all', label: 'All', count: stats.total },
            { id: 'pending', label: 'Pending', count: stats.pending, dot: 'bg-amber-500' },
            { id: 'in_review', label: 'In Review', count: stats.inReview, dot: 'bg-blue-500' },
            { id: 'resolved', label: 'Resolved', count: stats.resolved, dot: 'bg-emerald-500' },
            { id: 'archived', label: 'Archived', count: stats.archived, dot: 'bg-slate-400' },
          ].map((tab) => {
            const isSelected = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.dot && <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : tab.dot}`} />}
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}

          {(searchQuery || selectedStatus !== 'all' || selectedPriority !== 'all' || selectedSender !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
                setSelectedPriority('all');
                setSelectedSender('all');
              }}
              className="text-[11px] text-red-600 hover:text-red-800 font-bold ml-auto cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Inquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Status &amp; Date</th>
                <th className="py-3 px-4">Sender Details</th>
                <th className="py-3 px-4">Subject &amp; Priority</th>
                <th className="py-3 px-4">Inquiry Message</th>
                <th className="py-3 px-4">Internal Notes</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Inbox className="w-8 h-8 text-slate-300" />
                      <p className="font-bold text-slate-700 text-sm">No matching inquiries found</p>
                      <p className="text-xs text-slate-400 max-w-sm">
                        {searchQuery || selectedStatus !== 'all' || selectedSender !== 'all'
                          ? 'Try clearing the search keywords or status filter to see other inquiries.'
                          : 'No inquiries have been recorded yet. Click "+ Log New Inquiry" to create one.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const statusInfo = getStatusBadge(inq.status);
                  return (
                    <tr
                      key={inq.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => handleOpenInspect(inq)}
                    >
                      {/* Status & Date */}
                      <td className="py-3 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="space-y-1">
                          <select
                            value={inq.status || 'pending'}
                            onChange={(e) => handleQuickStatusChange(inq.id, e.target.value as InquiryStatus)}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer ${statusInfo.color}`}
                          >
                            <option value="pending">🟡 Pending</option>
                            <option value="in_review">🔵 In Review</option>
                            <option value="resolved">🟢 Resolved</option>
                            <option value="archived">⚫ Archived</option>
                          </select>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {inq.createdAt || inq.date || 'Recent'}
                          </span>
                        </div>
                      </td>

                      {/* Sender Details */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-bold">
                              {inq.name.charAt(0).toUpperCase()}
                            </span>
                            <span>{inq.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px]">
                            <a
                              href={`tel:${inq.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="font-mono text-slate-600 hover:text-emerald-700 flex items-center gap-1"
                              title="Click to call sender"
                            >
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{inq.phone}</span>
                            </a>
                            {inq.email && (
                              <a
                                href={`mailto:${inq.email}?subject=RE: ${encodeURIComponent(inq.subject)}`}
                                onClick={(e) => e.stopPropagation()}
                                className="font-mono text-emerald-700 hover:text-emerald-900 flex items-center gap-1 truncate max-w-[130px]"
                                title={`Email: ${inq.email}`}
                              >
                                <Mail className="w-3 h-3 text-emerald-600" />
                                <span className="truncate">{inq.email}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Subject & Priority */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className="font-bold text-slate-800 block truncate max-w-[200px]" title={inq.subject}>
                            {inq.subject}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {getPriorityBadge(inq.priority)}
                            {inq.sector && (
                              <span className="text-[10px] text-slate-500 font-medium">
                                • {inq.sector}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Message Preview */}
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-slate-600 line-clamp-2 leading-relaxed text-[11px]" title={inq.message}>
                          "{inq.message}"
                        </p>
                      </td>

                      {/* Internal Notes */}
                      <td className="py-3 px-4 max-w-[160px]">
                        {inq.notes ? (
                          <span className="text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg block truncate border border-slate-200" title={inq.notes}>
                            📝 {inq.notes}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">No notes</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenInspect(inq)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="Inspect & Reply to inquiry"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(inq)}
                            className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit sender details & status"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete inquiry from ${inq.name}?`)) {
                                onDeleteInquiry(inq.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT & RESPONSE MODAL */}
      {inspectInquiry && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-8 max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold">
                  <Inbox className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Inquiry Inspection &amp; Communication</h3>
                  <span className="text-[11px] text-slate-400 font-mono">ID: {inspectInquiry.id}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectInquiry(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* Sender Profile Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{inspectInquiry.name}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{inspectInquiry.sector || 'Gakenke District'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Date: {inspectInquiry.createdAt || inspectInquiry.date}</span>
                    {getPriorityBadge(inspectInquiry.priority)}
                  </div>
                </div>

                {/* Direct Action Contacts */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={`tel:${inspectInquiry.phone}`}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-800 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Call {inspectInquiry.phone}</span>
                  </a>

                  {inspectInquiry.email && (
                    <a
                      href={`mailto:${inspectInquiry.email}?subject=RE: ${encodeURIComponent(inspectInquiry.subject)}`}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-800 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Email {inspectInquiry.email}</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/${inspectInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${inspectInquiry.name}, thank you for contacting UBUMWE SACCO GAKENKE.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Status Switcher Buttons */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Update Processing Status:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'pending', label: 'Pending', icon: Clock, color: 'hover:bg-amber-50 hover:border-amber-300' },
                    { id: 'in_review', label: 'In Review', icon: AlertCircle, color: 'hover:bg-blue-50 hover:border-blue-300' },
                    { id: 'resolved', label: 'Resolved', icon: CheckCircle2, color: 'hover:bg-emerald-50 hover:border-emerald-300' },
                    { id: 'archived', label: 'Archived', icon: Archive, color: 'hover:bg-slate-100 hover:border-slate-300' },
                  ].map((s) => {
                    const isCurrent = (inspectInquiry.status || 'pending') === s.id;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleQuickStatusChange(inspectInquiry.id, s.id as InquiryStatus)}
                        className={`p-2 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : `bg-white text-slate-700 border-slate-200 ${s.color}`
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[11px]">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inquiry Message Text */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Inquiry Subject &amp; Content:
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    Recipient: {inspectInquiry.recipientEmail || saccoInfo?.email || 'ubumwesaccogakenke@gmail.com'}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{inspectInquiry.subject}</h4>
                  <p className="text-slate-700 leading-relaxed text-xs font-medium whitespace-pre-wrap">
                    "{inspectInquiry.message}"
                  </p>
                </div>
              </div>

              {/* Internal Manager Notes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Internal Manager Notes &amp; Action Log:
                  </span>
                  <button
                    type="button"
                    onClick={handleSaveInspectorNotes}
                    className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  value={inspectorNotes}
                  onChange={(e) => setInspectorNotes(e.target.value)}
                  placeholder="Record resolution notes, officer assigned, phone call recap, or next steps..."
                  rows={3}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Direct Reply Composer */}
              {inspectInquiry.email && (
                <div className="space-y-1.5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Direct Member Email Response:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          navigator.clipboard.writeText(replyDraft);
                          setCopiedReply(true);
                          setTimeout(() => setCopiedReply(false), 2000);
                        } catch {}
                      }}
                      className="text-[10px] text-emerald-800 font-bold hover:underline"
                    >
                      {copiedReply ? 'Copied!' : 'Copy Reply'}
                    </button>
                  </div>
                  <textarea
                    value={replyDraft}
                    onChange={(e) => setReplyDraft(e.target.value)}
                    rows={4}
                    className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                  />
                  <div className="flex justify-end pt-1">
                    <a
                      href={`mailto:${inspectInquiry.email}?subject=RE: ${encodeURIComponent(inspectInquiry.subject)}&body=${encodeURIComponent(replyDraft)}`}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Open in Email App to Send</span>
                    </a>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => {
                  handleOpenEdit(inspectInquiry);
                  setInspectInquiry(null);
                }}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Full Record</span>
              </button>

              <button
                type="button"
                onClick={() => setInspectInquiry(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ADD / LOG NEW INQUIRY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-8">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">Log New Member Inquiry</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sender Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Jean Damascene Uwimana"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Telephone Number *</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="e.g. 0788345210"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. member@gmail.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sector / Branch</label>
                  <input
                    type="text"
                    value={formSector}
                    onChange={(e) => setFormSector(e.target.value)}
                    placeholder="e.g. Rushashi or Gakenke"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as InquiryStatus)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  >
                    <option value="pending">🟡 Pending</option>
                    <option value="in_review">🔵 In Review</option>
                    <option value="resolved">🟢 Resolved</option>
                    <option value="archived">⚫ Archived</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as InquiryPriority)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Channel / Source</label>
                  <select
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  >
                    <option value="website">Website Form</option>
                    <option value="phone">Phone Call</option>
                    <option value="walk_in">Branch Walk-in</option>
                    <option value="email">Direct Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Inquiry Subject *</label>
                <input
                  type="text"
                  required
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="e.g. Loan Application & Terms"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message Content *</label>
                <textarea
                  required
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Type the message or request from the member..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Initial Officer Notes</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Internal notes or action assignment..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Save Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT INQUIRY MODAL */}
      {isEditModalOpen && editingInquiry && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-8">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-black text-white">Edit Inquiry #{editingInquiry.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sender Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Telephone</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sector / Branch</label>
                  <input
                    type="text"
                    value={formSector}
                    onChange={(e) => setFormSector(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as InquiryStatus)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  >
                    <option value="pending">🟡 Pending</option>
                    <option value="in_review">🔵 In Review</option>
                    <option value="resolved">🟢 Resolved</option>
                    <option value="archived">⚫ Archived</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as InquiryPriority)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message</label>
                <textarea
                  required
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Officer Notes</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Update Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
