import React, { useState } from 'react';
import { Language, JobPosting, JobApplication } from '../types';
import { SACCO_INFO, INITIAL_JOB_APPLICATIONS } from '../data/saccoData';
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Plus,
  Edit2,
  Trash2,
  Users,
  Search,
  Filter,
  Eye,
  FileText,
  Building,
  Check,
  X,
  Sparkles,
  Award,
  Download,
  Printer,
  Send,
  ShieldCheck,
  Star,
  UserPlus,
  MessageCircle,
  Mail,
  RotateCcw,
  UserCheck,
} from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';
import { JobApplicationModal } from './JobApplicationModal';
import { ApplicantFeedbackModal } from './ApplicantFeedbackModal';
import { ApplicantDossierModal } from './ApplicantDossierModal';
import { exportApplicantsToExcel } from '../utils/applicantExport';

interface CareersSectionProps {
  currentLang: Language;
  jobPostings: JobPosting[];
  jobApplications?: JobApplication[];
  isAdmin: boolean;
  onOpenAdminConsole?: (tab?: string) => void;
  onAddJobPosting?: (job: Omit<JobPosting, 'id' | 'postedDate'>) => void;
  onUpdateJobPosting?: (id: string, updated: Partial<JobPosting>) => void;
  onDeleteJobPosting?: (id: string) => void;
  onSubmitJobApplication: (app: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => void;
  onAddJobApplication?: (app: Omit<JobApplication, 'id'>) => void;
  onUpdateJobApplicationStatus?: (id: string, status: JobApplication['status']) => void;
  onUpdateJobApplication?: (id: string, updated: Partial<JobApplication>) => void;
  onDeleteJobApplication?: (id: string) => void;
  onResetJobApplications?: () => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({
  currentLang,
  jobPostings,
  jobApplications = [],
  isAdmin,
  onOpenAdminConsole,
  onAddJobPosting,
  onUpdateJobPosting,
  onDeleteJobPosting,
  onSubmitJobApplication,
  onAddJobApplication,
  onUpdateJobApplicationStatus,
  onUpdateJobApplication,
  onDeleteJobApplication,
  onResetJobApplications,
}) => {
  // Primary view switcher within Careers: 'vacancies' or 'applicants'
  const [careersTab, setCareersTab] = useState<'vacancies' | 'applicants'>('vacancies');

  // Job vacancies filter states
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  // Application Modal state (General member applying)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeApplyingJob, setActiveApplyingJob] = useState<JobPosting | null>(null);

  // Admin Job Vacancy Edit / Create Modal state
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formTitleRw, setFormTitleRw] = useState('');
  const [formDepartmentEn, setFormDepartmentEn] = useState('Credit & Financial Operations');
  const [formDepartmentRw, setFormDepartmentRw] = useState('Inguzanyo n\'Imari');
  const [formLocation, setFormLocation] = useState('Gakenke Head Office');
  const [formType, setFormType] = useState<'full_time' | 'contract' | 'internship'>('full_time');
  const [formSalary, setFormSalary] = useState('Competitive SACCO Scale');
  const [formDeadline, setFormDeadline] = useState('2026-11-15');
  const [formStatus, setFormStatus] = useState<'open' | 'closed'>('open');
  const [formDescEn, setFormDescEn] = useState('');
  const [formDescRw, setFormDescRw] = useState('');
  const [formReqsEn, setFormReqsEn] = useState('');
  const [formReqsRw, setFormReqsRw] = useState('');
  const [formRespEn, setFormRespEn] = useState('');
  const [formRespRw, setFormRespRw] = useState('');

  // CANDIDATE APPLICANTS MANAGEMENT STATES
  const [applicantSearch, setApplicantSearch] = useState('');
  const [applicantStatusFilter, setApplicantStatusFilter] = useState('all');
  const [applicantJobFilter, setApplicantJobFilter] = useState('all');
  const [editingCommentAppId, setEditingCommentAppId] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState('');
  const [feedbackApp, setFeedbackApp] = useState<JobApplication | null>(null);
  const [dossierApp, setDossierApp] = useState<JobApplication | null>(null);
  const [isAddApplicantOpen, setIsAddApplicantOpen] = useState(false);

  // Manual Applicant Form States
  const [newAppName, setNewAppName] = useState('');
  const [newAppEmail, setNewAppEmail] = useState('');
  const [newAppPhone, setNewAppPhone] = useState('');
  const [newAppNid, setNewAppNid] = useState('');
  const [newAppJobId, setNewAppJobId] = useState(jobPostings[0]?.id || 'job-1');
  const [newAppSector, setNewAppSector] = useState('Gakenke');
  const [newAppEdu, setNewAppEdu] = useState("Bachelor's Degree (A0) in Accounting & Finance");
  const [newAppExp, setNewAppExp] = useState(2);
  const [newAppStatus, setNewAppStatus] = useState<JobApplication['status']>('pending');
  const [newAppCover, setNewAppCover] = useState('');
  const [newAppComment, setNewAppComment] = useState('');

  // Handle open apply modal
  const handleOpenApplyModal = (job: JobPosting | null) => {
    setActiveApplyingJob(job);
    setIsApplyModalOpen(true);
  };

  // Handle vacancy creation/edit
  const openCreateModal = () => {
    setEditingJob(null);
    setFormTitleEn('');
    setFormTitleRw('');
    setFormDepartmentEn('Credit & Operations');
    setFormDepartmentRw('Inguzanyo');
    setFormLocation('Gakenke Head Office');
    setFormType('full_time');
    setFormSalary('Competitive SACCO Scale');
    setFormDeadline(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
    setFormStatus('open');
    setFormDescEn('');
    setFormDescRw('');
    setFormReqsEn('');
    setFormReqsRw('');
    setFormRespEn('');
    setFormRespRw('');
    setIsJobFormOpen(true);
  };

  const openEditModal = (job: JobPosting) => {
    setEditingJob(job);
    setFormTitleEn(job.titleEn);
    setFormTitleRw(job.titleRw);
    setFormDepartmentEn(job.departmentEn);
    setFormDepartmentRw(job.departmentRw);
    setFormLocation(job.location);
    setFormType(job.employmentType);
    setFormSalary(job.salaryRange || 'Competitive SACCO Scale');
    setFormDeadline(job.deadline);
    setFormStatus(job.status);
    setFormDescEn(job.descriptionEn);
    setFormDescRw(job.descriptionRw);
    setFormReqsEn(job.requirementsEn.join('\n'));
    setFormReqsRw(job.requirementsRw.join('\n'));
    setFormRespEn(job.responsibilitiesEn.join('\n'));
    setFormRespRw(job.responsibilitiesRw.join('\n'));
    setIsJobFormOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitleEn.trim()) return;

    const reqsEnArray = formReqsEn.split('\n').map((s) => s.trim()).filter(Boolean);
    const reqsRwArray = formReqsRw.split('\n').map((s) => s.trim()).filter(Boolean);
    const respEnArray = formRespEn.split('\n').map((s) => s.trim()).filter(Boolean);
    const respRwArray = formRespRw.split('\n').map((s) => s.trim()).filter(Boolean);

    if (editingJob && onUpdateJobPosting) {
      onUpdateJobPosting(editingJob.id, {
        titleEn: formTitleEn,
        titleRw: formTitleRw || formTitleEn,
        departmentEn: formDepartmentEn,
        departmentRw: formDepartmentRw || formDepartmentEn,
        location: formLocation,
        employmentType: formType,
        salaryRange: formSalary,
        deadline: formDeadline,
        status: formStatus,
        descriptionEn: formDescEn,
        descriptionRw: formDescRw || formDescEn,
        requirementsEn: reqsEnArray,
        requirementsRw: reqsRwArray.length > 0 ? reqsRwArray : reqsEnArray,
        responsibilitiesEn: respEnArray,
        responsibilitiesRw: respRwArray.length > 0 ? respRwArray : respEnArray,
      });
    } else if (onAddJobPosting) {
      onAddJobPosting({
        titleEn: formTitleEn,
        titleRw: formTitleRw || formTitleEn,
        departmentEn: formDepartmentEn,
        departmentRw: formDepartmentRw || formDepartmentEn,
        location: formLocation,
        employmentType: formType,
        salaryRange: formSalary,
        deadline: formDeadline,
        status: formStatus,
        descriptionEn: formDescEn,
        descriptionRw: formDescRw || formDescEn,
        requirementsEn: reqsEnArray,
        requirementsRw: reqsRwArray.length > 0 ? reqsRwArray : reqsEnArray,
        responsibilitiesEn: respEnArray,
        responsibilitiesRw: respRwArray.length > 0 ? respRwArray : respEnArray,
      });
    }
    setIsJobFormOpen(false);
  };

  // Candidate Status update handler
  const handleStatusChange = (appId: string, newStatus: JobApplication['status']) => {
    if (onUpdateJobApplication) {
      onUpdateJobApplication(appId, { status: newStatus });
    } else if (onUpdateJobApplicationStatus) {
      onUpdateJobApplicationStatus(appId, newStatus);
    }
  };

  // Save inline comment
  const handleSaveInlineComment = (appId: string) => {
    if (onUpdateJobApplication) {
      onUpdateJobApplication(appId, { comment: commentDraft, notes: commentDraft });
    }
    setEditingCommentAppId(null);
  };

  // Create manual applicant
  const handleCreateApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim()) return;

    const selectedJob = jobPostings.find((j) => j.id === newAppJobId);
    const newRecord: Omit<JobApplication, 'id'> = {
      fullName: newAppName.trim(),
      email: newAppEmail.trim() || `${newAppName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      phone: newAppPhone.trim() || '0780000000',
      nationalId: newAppNid.trim() || '1199000000000000',
      jobId: newAppJobId,
      jobTitle: selectedJob ? selectedJob.titleEn : 'General Banking Application',
      residenceSector: newAppSector,
      educationLevel: newAppEdu,
      yearsExperience: Number(newAppExp) || 0,
      appliedDate: new Date().toISOString().split('T')[0],
      status: newAppStatus,
      coverLetter: newAppCover.trim() || 'Direct committee registration dossier.',
      notes: newAppComment.trim(),
      comment: newAppComment.trim(),
      verified: true,
      rating: 4,
    };

    if (onAddJobApplication) {
      onAddJobApplication(newRecord);
    }
    setIsAddApplicantOpen(false);
    setNewAppName('');
    setNewAppEmail('');
    setNewAppPhone('');
    setNewAppNid('');
    setNewAppCover('');
    setNewAppComment('');
  };

  // Filtered Vacancies
  const filteredJobs = jobPostings.filter((job) => {
    if (selectedType !== 'all' && job.employmentType !== selectedType) {
      return false;
    }
    if (selectedDepartment !== 'all') {
      const deptEn = job.departmentEn.toLowerCase();
      if (selectedDepartment === 'credit' && !deptEn.includes('credit')) return false;
      if (selectedDepartment === 'technology' && !deptEn.includes('it') && !deptEn.includes('tech')) return false;
      if (selectedDepartment === 'audit' && !deptEn.includes('audit')) return false;
      if (selectedDepartment === 'community' && !deptEn.includes('outreach') && !deptEn.includes('member')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.titleEn.toLowerCase().includes(q) || job.titleRw.toLowerCase().includes(q);
      const matchDept = job.departmentEn.toLowerCase().includes(q) || job.departmentRw.toLowerCase().includes(q);
      const matchLoc = job.location.toLowerCase().includes(q);
      if (!matchTitle && !matchDept && !matchLoc) return false;
    }
    return true;
  });

  // Filtered Job Applications
  const filteredJobApplications = jobApplications.filter((app) => {
    if (applicantStatusFilter !== 'all' && app.status !== applicantStatusFilter) {
      return false;
    }
    if (applicantJobFilter !== 'all' && app.jobId !== applicantJobFilter) {
      return false;
    }
    if (applicantSearch.trim()) {
      const q = applicantSearch.toLowerCase();
      const match =
        app.fullName.toLowerCase().includes(q) ||
        app.nationalId.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.phone.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q) ||
        app.residenceSector.toLowerCase().includes(q) ||
        (app.comment && app.comment.toLowerCase().includes(q)) ||
        (app.notes && app.notes.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Candidate Counts
  const totalApplicants = jobApplications.length;
  const pendingCount = jobApplications.filter((a) => a.status === 'pending').length;
  const shortlistedCount = jobApplications.filter((a) => a.status === 'shortlisted').length;
  const notShortlistedCount = jobApplications.filter((a) => a.status === 'not_shortlisted').length;
  const interviewCount = jobApplications.filter((a) => a.status === 'interview').length;
  const acceptedCount = jobApplications.filter((a) => a.status === 'accepted').length;
  const rejectedCount = jobApplications.filter((a) => a.status === 'rejected').length;
  const waitlistedCount = jobApplications.filter((a) => a.status === 'waitlisted').length;

  const getEmploymentBadge = (type: JobPosting['employmentType']) => {
    switch (type) {
      case 'full_time':
        return {
          label: currentLang === 'en' ? 'Full-Time Position' : 'Umukozi Uhoraho',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'contract':
        return {
          label: currentLang === 'en' ? 'Fixed-Term Contract' : 'Amasezerano y\'Igihe',
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
        };
      case 'internship':
        return {
          label: currentLang === 'en' ? 'Paid Internship' : 'Kumenyereza (Internship)',
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
        };
      default:
        return {
          label: 'Position',
          bg: 'bg-slate-50 text-slate-800 border-slate-200',
        };
    }
  };

  return (
    <section id="careers" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <Briefcase className="w-4 h-4 text-emerald-700" />
              <span>Career Opportunities · UBUMWE SACCO GAKENKE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              {currentLang === 'en' ? 'Work With Us & Build Gakenke' : 'Kazi n\'Amahirwe muri Koperative Yacu'}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-3xl">
              {currentLang === 'en'
                ? 'Join our dedicated team of professionals serving over 18,600 cooperative members across Gakenke District. We offer meaningful work, fair compensation, and community impact.'
                : 'Fatanya natwe mu guteza imbere abanyamuryango basaga 18,600 bo mu Mirenge 19 ya Gakenke. Dutanga umushahara uboneye, amahugurwa n\'agaciro k\'umukozi.'}
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isAdmin && (
              <>
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Job Vacancy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCareersTab(careersTab === 'applicants' ? 'vacancies' : 'applicants')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ring-1 ring-emerald-500/50"
                  title="Admin toggle to view all candidate applications"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>
                    {careersTab === 'applicants'
                      ? `View Vacancies (${jobPostings.length})`
                      : `Manage Applicants (${jobApplications.length})`}
                  </span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => handleOpenApplyModal(jobPostings[0] || null)}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>General Job Application</span>
            </button>
          </div>
        </div>

        {/* PRIMARY SUB-NAV SWITCHER: ONLY VISIBLE TO ADMIN */}
        {isAdmin && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCareersTab('vacancies')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  careersTab === 'vacancies'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'Job Vacancies' : 'Imirimo Ifunguye'} ({jobPostings.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setCareersTab('applicants')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  careersTab === 'applicants'
                    ? 'bg-slate-900 text-white shadow-md ring-2 ring-emerald-500/50'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 font-extrabold'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-500" />
                <span>{currentLang === 'en' ? 'Candidate Applications (CRUD)' : 'Abasabye Akazi'}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-xs">
                  {jobApplications.length}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {careersTab === 'applicants' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsAddApplicantOpen(true)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Register Applicant</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      exportApplicantsToExcel(
                        jobApplications,
                        `UBUMWE_SACCO_Job_Applicants_${new Date().toISOString().split('T')[0]}.csv`
                      )
                    }
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-bold flex items-center gap-1.5 border border-slate-600 shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export CSV</span>
                  </button>
                  {onResetJobApplications && (
                    <button
                      type="button"
                      onClick={onResetJobApplications}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1 cursor-pointer border border-slate-200"
                      title="Reload or restore initial sample candidates"
                    >
                      <RotateCcw className="w-3 h-3 text-emerald-600" />
                      <span>Reset Data</span>
                    </button>
                  )}
                </>
              ) : (
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredJobs.length} active employment vacancies
                </span>
              )}
            </div>
          </div>
        )}

        {/* VIEW 1: VACANCIES & OPENINGS (ALL USERS / APPLICANTS) */}
        {(!isAdmin || careersTab === 'vacancies') && (
          <div className="space-y-8 animate-in fade-in">
            {/* Highlight Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">{jobPostings.filter((j) => j.status === 'open').length}</div>
                  <div className="text-xs text-slate-500 font-medium">Active Openings</div>
                </div>
              </div>

              {isAdmin ? (
                <div
                  onClick={() => setCareersTab('applicants')}
                  className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-2xl border border-emerald-200 shadow-xs flex items-center gap-3 cursor-pointer transition-colors"
                  title="Admin: Click to view candidate applicants"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-emerald-950">{jobApplications.length} Candidates</div>
                    <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <span>Manage Applicants</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-slate-900">Equal Access</div>
                    <div className="text-xs text-slate-500 font-medium">Fair &amp; Transparent Hiring</div>
                  </div>
                </div>
              )}

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">RCA Certified</div>
                  <div className="text-xs text-slate-500 font-medium">Regulated Cooperative</div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">19 Sectors</div>
                  <div className="text-xs text-slate-500 font-medium">Gakenke Coverage</div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vacancies by title, location, or department..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Filter className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Type:</span>
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden"
                >
                  <option value="all">All Types</option>
                  <option value="full_time">Full-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden"
                >
                  <option value="all">All Departments</option>
                  <option value="credit">Credit &amp; Operations</option>
                  <option value="technology">IT &amp; Digital Banking</option>
                  <option value="audit">Audit &amp; Compliance</option>
                  <option value="community">Community Outreach</option>
                </select>
              </div>
            </div>

            {/* Job Postings List */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-700">No Job Openings Found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No vacancies match your current search filters. You can still submit a general application for future opportunities.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDepartment('all');
                      setSelectedType('all');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const badge = getEmploymentBadge(job.employmentType);
                  const isExpanded = expandedJobId === job.id;
                  const isClosed = job.status === 'closed';
                  const jobAppCount = jobApplications.filter(
                    (a) => a.jobId === job.id || a.jobTitle.toLowerCase() === job.titleEn.toLowerCase()
                  ).length;

                  return (
                    <div
                      key={job.id}
                      className={`bg-white rounded-3xl border ${
                        isClosed ? 'border-slate-200 opacity-75' : 'border-slate-200 hover:border-emerald-300'
                      } p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-6 relative group`}
                    >
                      {/* Top Job Header Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                            {badge.label}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                            {currentLang === 'en' ? job.departmentEn : job.departmentRw}
                          </span>
                          {isClosed ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-red-100 text-red-800">
                              Applications Closed
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              Accepting Applications
                            </span>
                          )}
                        </div>

                        {/* Admin / Actions Bar for Job Card */}
                        <div className="flex items-center gap-2">
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => {
                                setApplicantJobFilter(job.id);
                                setCareersTab('applicants');
                              }}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5 shadow-xs"
                              title="Admin: View candidates who applied for this vacancy"
                            >
                              <Users className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Applicants ({jobAppCount})</span>
                            </button>
                          )}

                          {isAdmin && (
                            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                              <button
                                type="button"
                                onClick={() => openEditModal(job)}
                                className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                                title="Edit Job Vacancy"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateJobPosting &&
                                  onUpdateJobPosting(job.id, {
                                    status: job.status === 'open' ? 'closed' : 'open',
                                  })
                                }
                                className="px-2 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                                title="Toggle Status"
                              >
                                {job.status === 'open' ? 'Close' : 'Open'}
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteJobPosting && onDeleteJobPosting(job.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                                title="Delete Job Vacancy"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Job Title & Summary */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                          {currentLang === 'en' ? job.titleEn : job.titleRw}
                        </h3>
                        <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                          {currentLang === 'en' ? job.descriptionEn : job.descriptionRw}
                        </p>
                      </div>

                      {/* Meta Tags: Location, Salary, Deadline */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{job.salaryRange || 'Competitive SACCO Package'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Deadline: <strong>{job.deadline}</strong></span>
                        </div>
                      </div>

                      {/* Collapsible Requirements and Responsibilities */}
                      {isExpanded && (
                        <div className="pt-4 border-t border-slate-100 space-y-6 animate-in fade-in">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Requirements &amp; Profile</span>
                              </h4>
                              <ul className="space-y-2 text-xs text-slate-700">
                                {(currentLang === 'en' ? job.requirementsEn : job.requirementsRw).map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <span>Key Responsibilities</span>
                              </h4>
                              <ul className="space-y-2 text-xs text-slate-700">
                                {(currentLang === 'en' ? job.responsibilitiesEn : job.responsibilitiesRw).map((resp, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <button
                          type="button"
                          onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Full Role Profile & Duties'}</span>
                          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                        </button>

                        <div className="flex items-center gap-3">
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => {
                                setApplicantJobFilter(job.id);
                                setCareersTab('applicants');
                              }}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                            >
                              <Users className="w-3.5 h-3.5 text-emerald-600" />
                              <span>View Applicants ({jobAppCount})</span>
                            </button>
                          )}

                          {!isClosed && (
                            <button
                              type="button"
                              onClick={() => handleOpenApplyModal(job)}
                              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                            >
                              <span>Apply for This Role</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: CANDIDATE APPLICATIONS & EVALUATION (ADMIN ONLY) */}
        {isAdmin && careersTab === 'applicants' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header Banner */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Candidate Management &amp; Deliberations
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    {totalApplicants} Total Applications
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
                  Job Candidates Who Have Applied
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
                  View and manage all applicants. Update status (Pending, Shortlisted, Not Shortlisted, etc.), enter committee deliberation comments, and review candidate dossiers.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddApplicantOpen(true)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ Register Applicant</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    exportApplicantsToExcel(
                      jobApplications,
                      `UBUMWE_SACCO_Job_Applicants_${new Date().toISOString().split('T')[0]}.csv`
                    )
                  }
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-600 shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Export All (Excel / CSV)</span>
                </button>
              </div>
            </div>

            {/* Clickable Status Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white rounded-2xl border border-slate-200 text-xs shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2">
                Filter Status:
              </span>
              <button
                type="button"
                onClick={() => setApplicantStatusFilter('all')}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  applicantStatusFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All ({totalApplicants})
              </button>
              <button
                type="button"
                onClick={() => setApplicantStatusFilter('pending')}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  applicantStatusFilter === 'pending'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                type="button"
                onClick={() => setApplicantStatusFilter('shortlisted')}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  applicantStatusFilter === 'shortlisted'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                Shortlisted ({shortlistedCount})
              </button>
              <button
                type="button"
                onClick={() => setApplicantStatusFilter('not_shortlisted')}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  applicantStatusFilter === 'not_shortlisted'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                Not Shortlisted ({notShortlistedCount})
              </button>
              <button
                type="button"
                onClick={() => setApplicantStatusFilter('interview')}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  applicantStatusFilter === 'interview'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                Interview ({interviewCount})
              </button>
              <button
                type="button"
                onClick={() => setApplicantStatusFilter('accepted')}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  applicantStatusFilter === 'accepted'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                Hired / Accepted ({acceptedCount})
              </button>
              <button
                type="button"
                onClick={() => setApplicantStatusFilter('waitlisted')}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  applicantStatusFilter === 'waitlisted'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200'
                }`}
              >
                Waitlisted ({waitlistedCount})
              </button>
              <button
                type="button"
                onClick={() => setApplicantStatusFilter('rejected')}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  applicantStatusFilter === 'rejected'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-red-50 text-red-900 hover:bg-red-100 border border-red-200'
                }`}
              >
                Rejected ({rejectedCount})
              </button>
            </div>

            {/* Search and Vacancy Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={applicantSearch}
                    onChange={(e) => setApplicantSearch(e.target.value)}
                    placeholder="Search candidate by name, NID, phone, vacancy, comments..."
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-emerald-500"
                  />
                  {applicantSearch && (
                    <button
                      type="button"
                      onClick={() => setApplicantSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={applicantJobFilter}
                    onChange={(e) => setApplicantJobFilter(e.target.value)}
                    className="px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-hidden"
                  >
                    <option value="all">All Vacancy Positions</option>
                    {jobPostings.map((job) => (
                      <option key={job.id} value={job.id}>
                        {currentLang === 'en' ? job.titleEn : job.titleRw}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-slate-900">{filteredJobApplications.length}</strong> of {totalApplicants} candidates
              </div>
            </div>

            {/* Applicant Records Table */}
            {filteredJobApplications.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">No applicants matching current criteria</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {applicantSearch || applicantStatusFilter !== 'all' || applicantJobFilter !== 'all'
                    ? 'Try resetting your search query or filters to see more candidates.'
                    : 'No candidate applications have been recorded yet.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {(applicantSearch || applicantStatusFilter !== 'all' || applicantJobFilter !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setApplicantSearch('');
                        setApplicantStatusFilter('all');
                        setApplicantJobFilter('all');
                      }}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  )}
                  {totalApplicants === 0 && onResetJobApplications && (
                    <button
                      type="button"
                      onClick={onResetJobApplications}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Load Sample Candidates (4 Records)</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-3 min-w-[180px]">Candidate Details</th>
                      <th className="py-3 px-3 min-w-[150px]">Position Applied</th>
                      <th className="py-3 px-3 min-w-[140px]">Contact &amp; Sector</th>
                      <th className="py-3 px-3 min-w-[130px]">Qualifications</th>
                      <th className="py-3 px-3 min-w-[160px]">Status (CRUD)</th>
                      <th className="py-3 px-3 min-w-[220px] bg-emerald-50/40">
                        <div className="flex items-center gap-1 text-emerald-950 font-bold">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Committee Comments &amp; Remarks</span>
                        </div>
                      </th>
                      <th className="py-3 px-3 text-right min-w-[160px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredJobApplications.map((app) => {
                      const isEditingComment = editingCommentAppId === app.id;
                      const currentComment = app.comment || app.notes || '';

                      return (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* 1. Candidate Details */}
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              {app.verified && (
                                <span title="NID Verified in Rwanda" className="shrink-0">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                </span>
                              )}
                              <span className="text-sm font-extrabold text-slate-900">{app.fullName}</span>
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                              NID: {app.nationalId}
                            </div>
                            {app.rating ? (
                              <div className="flex items-center gap-0.5 mt-1" title={`HR Rating: ${app.rating}/5`}>
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-3 h-3 ${
                                      s <= (app.rating ?? 0)
                                        ? 'text-amber-400 fill-amber-400'
                                        : 'text-slate-200'
                                    }`}
                                  />
                                ))}
                                <span className="text-[10px] text-slate-500 font-bold ml-1">{app.rating}/5</span>
                              </div>
                            ) : null}
                            {app.emailFeedbackSent && (
                              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-semibold mt-1">
                                <Mail className="w-3 h-3" />
                                <span>Feedback sent ({app.lastFeedbackDate})</span>
                              </div>
                            )}
                          </td>

                          {/* 2. Position Applied */}
                          <td className="py-3 px-3">
                            <span className="font-bold text-slate-800 block text-xs">
                              {app.jobTitle}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Applied: {app.appliedDate}</span>
                            </div>
                          </td>

                          {/* 3. Contact & Sector */}
                          <td className="py-3 px-3">
                            <div className="font-semibold text-slate-900">{app.phone}</div>
                            <div className="text-[11px] text-slate-600 truncate max-w-[150px]">{app.email}</div>
                            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>Sector: {app.residenceSector}</span>
                            </div>
                          </td>

                          {/* 4. Qualifications */}
                          <td className="py-3 px-3">
                            <div className="text-slate-800 font-medium">{app.educationLevel}</div>
                            <div className="text-[11px] text-slate-500 font-semibold">{app.yearsExperience} yrs exp</div>
                            {app.cvFileName && (
                              <div className="text-[11px] text-emerald-800 font-bold mt-1 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                <span className="truncate max-w-[120px]">{app.cvFileName}</span>
                              </div>
                            )}
                          </td>

                          {/* 5. Status (CRUD) */}
                          <td className="py-3 px-3">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as JobApplication['status'])}
                              className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-colors shadow-2xs ${
                                app.status === 'shortlisted'
                                  ? 'bg-blue-50 text-blue-900 border-blue-300 font-extrabold'
                                  : app.status === 'not_shortlisted'
                                  ? 'bg-rose-50 text-rose-900 border-rose-300 font-extrabold'
                                  : app.status === 'interview'
                                  ? 'bg-purple-50 text-purple-900 border-purple-300 font-extrabold'
                                  : app.status === 'accepted'
                                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-extrabold'
                                  : app.status === 'waitlisted'
                                  ? 'bg-teal-50 text-teal-900 border-teal-300 font-extrabold'
                                  : app.status === 'rejected'
                                  ? 'bg-red-50 text-red-900 border-red-300 font-extrabold'
                                  : 'bg-amber-50 text-amber-900 border-amber-300 font-extrabold'
                              }`}
                            >
                              <option value="pending">⏳ Pending Review</option>
                              <option value="shortlisted">⭐ Shortlisted</option>
                              <option value="not_shortlisted">❌ Not Shortlisted</option>
                              <option value="interview">📅 Interview Scheduled</option>
                              <option value="accepted">🎉 Hired / Accepted</option>
                              <option value="waitlisted">📋 Waitlisted / Reserve</option>
                              <option value="rejected">🚫 Regret / Rejected</option>
                            </select>
                          </td>

                          {/* 6. Committee Comments & Remarks (RESERVED PLACE FOR COMMENT) */}
                          <td className="py-3 px-3 bg-emerald-50/20">
                            {isEditingComment ? (
                              <div className="space-y-1.5">
                                <textarea
                                  rows={2}
                                  value={commentDraft}
                                  onChange={(e) => setCommentDraft(e.target.value)}
                                  placeholder="Enter deliberation notes or committee remarks..."
                                  className="w-full p-1.5 bg-white border border-emerald-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                                />
                                <div className="flex items-center gap-1.5 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => setEditingCommentAppId(null)}
                                    className="px-2 py-0.5 text-[10px] text-slate-600 hover:text-slate-800 cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSaveInlineComment(app.id)}
                                    className="px-2.5 py-0.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[10px] font-bold cursor-pointer"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="group/cmt flex items-start justify-between gap-1">
                                <div className="text-xs text-slate-700 italic flex-1">
                                  {currentComment ? (
                                    <span>&ldquo;{currentComment}&rdquo;</span>
                                  ) : (
                                    <span className="text-slate-400 not-italic">No remarks recorded yet</span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCommentAppId(app.id);
                                    setCommentDraft(currentComment);
                                  }}
                                  className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors cursor-pointer shrink-0"
                                  title="Edit Committee Comment"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>

                          {/* 7. Action Buttons */}
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setFeedbackApp(app)}
                                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                                title="Review Application Dossier & Send Email Notification"
                              >
                                <Mail className="w-3 h-3" />
                                <span>Review</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setDossierApp(app)}
                                className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                title="View & Print Official PDF Dossier"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                              {onDeleteJobApplication && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm(`Delete candidate application for ${app.fullName}?`)) {
                                      onDeleteJobApplication(app.id);
                                    }
                                  }}
                                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Application"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: GENERAL JOB APPLICATION MODAL (FOR CANDIDATES APPLYING) */}
      <JobApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setActiveApplyingJob(null);
        }}
        currentLang={currentLang}
        job={activeApplyingJob}
        allJobs={jobPostings}
        onSubmitApplication={(app) => {
          onSubmitJobApplication(app);
          setIsApplyModalOpen(false);
          setActiveApplyingJob(null);
          // Automatically switch to applicants tab so they see their submission!
          setCareersTab('applicants');
        }}
      />

      {/* MODAL 2: APPLICANT FEEDBACK & EMAIL DISPATCH MODAL */}
      {feedbackApp && (
        <ApplicantFeedbackModal
          isOpen={true}
          onClose={() => setFeedbackApp(null)}
          currentLang={currentLang}
          applicant={feedbackApp}
          onUpdateApplicant={(appId, updated) => {
            if (onUpdateJobApplication) {
              onUpdateJobApplication(appId, updated);
            } else if (updated.status && onUpdateJobApplicationStatus) {
              onUpdateJobApplicationStatus(appId, updated.status);
            }
            setFeedbackApp(null);
          }}
          onOpenDossier={(app) => {
            setFeedbackApp(null);
            setDossierApp(app);
          }}
        />
      )}

      {/* MODAL 3: CANDIDATE DOSSIER & PDF PRINT MODAL */}
      {dossierApp && (
        <ApplicantDossierModal
          isOpen={true}
          onClose={() => setDossierApp(null)}
          currentLang={currentLang}
          applicant={dossierApp}
        />
      )}

      {/* MODAL 4: MANUAL CANDIDATE REGISTRATION (+ REGISTER APPLICANT) */}
      {isAddApplicantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Register New Candidate Application</h4>
                  <p className="text-[11px] text-slate-500">Record a candidate file directly for evaluation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddApplicantOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApplicant} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newAppName}
                    onChange={(e) => setNewAppName(e.target.value)}
                    placeholder="e.g. Jean Damascene Uwiringiyimana"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rwandan National ID (16 digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={newAppNid}
                    onChange={(e) => setNewAppNid(e.target.value)}
                    placeholder="1199..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newAppEmail}
                    onChange={(e) => setNewAppEmail(e.target.value)}
                    placeholder="candidate@gmail.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number (MTN / Airtel) *</label>
                  <input
                    type="tel"
                    required
                    value={newAppPhone}
                    onChange={(e) => setNewAppPhone(e.target.value)}
                    placeholder="078..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Position Applied For *</label>
                  <select
                    value={newAppJobId}
                    onChange={(e) => setNewAppJobId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {jobPostings.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.titleEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Residence Sector (Gakenke) *</label>
                  <input
                    type="text"
                    required
                    value={newAppSector}
                    onChange={(e) => setNewAppSector(e.target.value)}
                    placeholder="e.g. Gakenke, Rushashi, Nemba"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Highest Education Level *</label>
                  <input
                    type="text"
                    required
                    value={newAppEdu}
                    onChange={(e) => setNewAppEdu(e.target.value)}
                    placeholder="e.g. Bachelor's in Accounting (A0)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Years of Relevant Experience *</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={newAppExp}
                    onChange={(e) => setNewAppExp(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Status *</label>
                  <select
                    value={newAppStatus}
                    onChange={(e) => setNewAppStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="pending">⏳ Pending Review</option>
                    <option value="shortlisted">⭐ Shortlisted</option>
                    <option value="not_shortlisted">❌ Not Shortlisted</option>
                    <option value="interview">📅 Interview Scheduled</option>
                    <option value="accepted">🎉 Hired / Accepted</option>
                    <option value="waitlisted">📋 Waitlisted / Reserve</option>
                    <option value="rejected">🚫 Regret / Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Committee Comments &amp; Deliberation Remarks</label>
                <textarea
                  rows={2}
                  value={newAppComment}
                  onChange={(e) => setNewAppComment(e.target.value)}
                  placeholder="Record interview notes, recommendation, or scoring rationale..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddApplicantOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Candidate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADMIN JOB VACANCY POST / EDIT FORM */}
      {isJobFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {editingJob ? 'Edit Vacancy' : 'New Employment Vacancy'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingJob ? editingJob.titleEn : 'Publish Vacancy for Gakenke'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsJobFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formTitleEn}
                    onChange={(e) => setFormTitleEn(e.target.value)}
                    placeholder="e.g. Senior Credit Officer"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title (Kinyarwanda)</label>
                  <input
                    type="text"
                    value={formTitleRw}
                    onChange={(e) => setFormTitleRw(e.target.value)}
                    placeholder="e.g. Umukozi Ushinzwe Inguzanyo"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={formDepartmentEn}
                    onChange={(e) => setFormDepartmentEn(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  >
                    <option value="full_time">Full-Time</option>
                    <option value="contract">Fixed Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold"
                  >
                    <option value="open">Open (Accepting Applications)</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Location</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Compensation / Salary</label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formDeadline}
                    onChange={(e) => setFormDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Description (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={formDescEn}
                  onChange={(e) => setFormDescEn(e.target.value)}
                  placeholder="Summary of the role..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Requirements (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formReqsEn}
                    onChange={(e) => setFormReqsEn(e.target.value)}
                    placeholder="Degree in Accounting or Finance&#10;2+ years experience&#10;Motorcycle license"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Key Responsibilities (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formRespEn}
                    onChange={(e) => setFormRespEn(e.target.value)}
                    placeholder="Conduct field appraisals&#10;Present files to committee&#10;Monitor repayments"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsJobFormOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingJob ? 'Update Vacancy' : 'Publish Vacancy'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
