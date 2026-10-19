import React, { useState } from 'react';
import { SACCO_INFO } from '../data/saccoData';
import { X, Lock, ShieldCheck, UserCheck, AlertCircle, KeyRound, ShieldAlert, CheckCircle2, Users } from 'lucide-react';
import { ImigongoRibbon } from './ImigongoPattern';

interface ManagerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const ManagerLoginModal: React.FC<ManagerLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (
      cleanEmail === 'ubumwesaccogakenke@gmail.com' &&
      cleanPassword === 'gakenke2026'
    ) {
      setError('');
      onLoginSuccess({
        name: 'Mbitsemunda Phocas (Manager & Admin)',
        email: SACCO_INFO.email,
        role: 'Executive Administrator / Manager',
      });
      onClose();
    } else if (
      (cleanEmail === 'bartazal@ubumwesacco.rw' || cleanEmail === 'bartazal@gmail.com') &&
      cleanPassword === 'bartazal2026'
    ) {
      setError('');
      onLoginSuccess({
        name: 'Bartazal (Board Director)',
        email: 'bartazal@ubumwesacco.rw',
        role: 'Board Director & Governance Trustee',
      });
      onClose();
    } else if (
      cleanEmail === 'wellarse@ubumwesacco.rw' &&
      cleanPassword === 'wellarse2026'
    ) {
      setError('');
      onLoginSuccess({
        name: 'Wellarse (Board Director)',
        email: 'wellarse@ubumwesacco.rw',
        role: 'Board Director',
      });
      onClose();
    } else if (
      (cleanEmail === 'staff@ubumwesacco.rw' || cleanEmail === 'innocent@ubumwesacco.rw' || cleanEmail === 'credit@ubumwesacco.rw') &&
      (cleanPassword === 'staff2026' || cleanPassword === 'gakenke2026')
    ) {
      setError('');
      onLoginSuccess({
        name: 'Innocent Ndayisaba (Staff / Credit Officer)',
        email: 'staff@ubumwesacco.rw',
        role: 'Cooperative Staff & Operations',
      });
      onClose();
    } else {
      setError('Access Denied: Unauthorized staff credentials. Please select one of the default official logins below.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Imigongo skeleton ribbon */}
        <div className="absolute top-0 left-0 right-0">
          <ImigongoRibbon height={8} variant="light" bordered={false} />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-800 font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>OFFICIAL STAFF PORTAL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Staff &amp; Executive Login
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Authorized sign in for SACCO Staff, Executive Manager (Mbitsemunda Phocas), and Board Trustees (Wellarse, Bartazal).
          </p>
        </div>

        {/* Default Official Credentials Display with 1-click Auto-fill */}
        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <KeyRound className="w-3.5 h-3.5" />
              Default Staff &amp; Admin Credentials:
            </span>
            <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Click to Auto-fill
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Manager / Admin */}
            <button
              type="button"
              onClick={() => {
                setEmail('ubumwesaccogakenke@gmail.com');
                setPassword('gakenke2026');
                setError('');
              }}
              className="text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group shadow-2xs cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-900 group-hover:text-emerald-800 flex items-center justify-between">
                <span>Manager: Mbitsemunda</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">Use</span>
              </div>
              <div className="text-[10px] text-slate-600 font-mono truncate mt-0.5">ubumwesaccogakenke@gmail.com</div>
              <div className="text-[10px] text-emerald-700 font-mono font-semibold">PIN: gakenke2026</div>
            </button>

            {/* Board: Bartazal */}
            <button
              type="button"
              onClick={() => {
                setEmail('bartazal@ubumwesacco.rw');
                setPassword('bartazal2026');
                setError('');
              }}
              className="text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group shadow-2xs cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-900 group-hover:text-emerald-800 flex items-center justify-between">
                <span>Board: Bartazal</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">Use</span>
              </div>
              <div className="text-[10px] text-slate-600 font-mono truncate mt-0.5">bartazal@ubumwesacco.rw</div>
              <div className="text-[10px] text-emerald-700 font-mono font-semibold">PIN: bartazal2026</div>
            </button>

            {/* Board: Wellarse */}
            <button
              type="button"
              onClick={() => {
                setEmail('wellarse@ubumwesacco.rw');
                setPassword('wellarse2026');
                setError('');
              }}
              className="text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group shadow-2xs cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-900 group-hover:text-emerald-800 flex items-center justify-between">
                <span>Board: Wellarse</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">Use</span>
              </div>
              <div className="text-[10px] text-slate-600 font-mono truncate mt-0.5">wellarse@ubumwesacco.rw</div>
              <div className="text-[10px] text-emerald-700 font-mono font-semibold">PIN: wellarse2026</div>
            </button>

            {/* Staff / Credit */}
            <button
              type="button"
              onClick={() => {
                setEmail('staff@ubumwesacco.rw');
                setPassword('staff2026');
                setError('');
              }}
              className="text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group shadow-2xs cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-900 group-hover:text-emerald-800 flex items-center justify-between">
                <span>Staff: Innocent / Credit</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">Use</span>
              </div>
              <div className="text-[10px] text-slate-600 font-mono truncate mt-0.5">staff@ubumwesacco.rw</div>
              <div className="text-[10px] text-emerald-700 font-mono font-semibold">PIN: staff2026</div>
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Staff Email / ID
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              placeholder="ubumwesaccogakenke@gmail.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Staff Passcode / PIN
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                placeholder="Enter passcode (e.g. gakenke2026)"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <UserCheck className="w-4 h-4" />
              <span>Authenticate &amp; Open Staff / Admin Console</span>
            </button>
          </div>

          <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center gap-2 text-[11px] text-emerald-900">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
            <span>Staff Portal: Sign in to manage contacts, working hours, pictures, navs, and cooperative records.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
