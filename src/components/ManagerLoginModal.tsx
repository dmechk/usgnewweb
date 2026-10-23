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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    setError('');
    setLoading(true);

    // 1. Try Backend API first if backend is running on port 5000
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);

      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.data?.user) {
          if (data.data.accessToken) {
            try {
              localStorage.setItem('ubumwe_access_token', data.data.accessToken);
            } catch {}
          }
          onLoginSuccess({
            name: data.data.user.name || 'Executive Staff (Backend)',
            email: data.data.user.email || cleanEmail,
            role: data.data.user.role || 'Admin',
          });
          setLoading(false);
          onClose();
          return;
        }
      }
    } catch {
      // Backend unavailable or timed out; proceed with local verified accounts
    }

    setLoading(false);

    // 2. Verified Local SACCO Executive, Board, and Operations Credentials
    if (
      (cleanEmail === 'ubumwesaccogakenke@gmail.com' || cleanEmail === 'ubumwesaccogakenke@gmaill.com' || cleanEmail === 'manager@ubumwesacco.rw' || cleanEmail === 'phocas@ubumwesacco.rw') &&
      (cleanPassword === 'gakenke2026' || cleanPassword === 'admin2026' || cleanPassword === 'admin123')
    ) {
      onLoginSuccess({
        name: 'Mbitsemunda Phocas (Manager & Admin)',
        email: SACCO_INFO.email,
        role: 'Executive Administrator / Manager',
      });
      onClose();
    } else if (
      (cleanEmail === 'admin@example.com' || cleanEmail === 'admin@ubumwesacco.rw' || cleanEmail === 'admin') &&
      (cleanPassword === 'replace-with-a-secure-password' || cleanPassword === 'gakenke2026' || cleanPassword === 'admin123' || cleanPassword === 'admin')
    ) {
      onLoginSuccess({
        name: 'System Administrator',
        email: cleanEmail.includes('@') ? cleanEmail : 'admin@ubumwesacco.rw',
        role: 'System Administrator',
      });
      onClose();
    } else if (
      (cleanEmail === 'bartazal@ubumwesacco.rw' || cleanEmail === 'bartazal@gmail.com') &&
      (cleanPassword === 'bartazal2026' || cleanPassword === 'gakenke2026')
    ) {
      onLoginSuccess({
        name: 'Bartazal (Board Director)',
        email: 'bartazal@ubumwesacco.rw',
        role: 'Board Director & Governance Trustee',
      });
      onClose();
    } else if (
      cleanEmail === 'wellarse@ubumwesacco.rw' &&
      (cleanPassword === 'wellarse2026' || cleanPassword === 'gakenke2026')
    ) {
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
      onLoginSuccess({
        name: 'Innocent Ndayisaba (Staff / Credit Officer)',
        email: 'staff@ubumwesacco.rw',
        role: 'Cooperative Staff & Operations',
      });
      onClose();
    } else {
      setError('Access Denied: Incorrect credentials. Use one of the 1-click official staff logins below or enter your registered account.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 relative shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Top Imigongo skeleton ribbon */}
        <div className="absolute top-0 left-0 right-0">
          <ImigongoRibbon height={6} variant="light" bordered={false} />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close login dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Compact Centered Header */}
        <div className="text-center pt-1 pb-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 mb-2 shadow-xs">
            <Lock className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
            Staff &amp; Board Login
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            UBUMWE SACCO GAKENKE Management &amp; Board Portal
          </p>
        </div>

        {/* Compact 1-Click Fill Credentials Chips */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl mb-3">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
            <span className="flex items-center gap-1 text-emerald-800">
              <KeyRound className="w-3 h-3" />
              1-Click Demo Logins:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setEmail('ubumwesaccogakenke@gmail.com');
                setPassword('gakenke2026');
                setError('');
              }}
              className="text-left px-2 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-[10px] font-bold text-slate-800 truncate cursor-pointer transition-colors shadow-2xs"
              title="Manager: Mbitsemunda Phocas (ubumwesaccogakenke@gmail.com)"
            >
              👑 Manager: Mbitsemunda
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail('bartazal@ubumwesacco.rw');
                setPassword('bartazal2026');
                setError('');
              }}
              className="text-left px-2 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-[10px] font-bold text-slate-800 truncate cursor-pointer transition-colors shadow-2xs"
              title="Board: Bartazal (bartazal@ubumwesacco.rw)"
            >
              🏛️ Board: Bartazal
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail('wellarse@ubumwesacco.rw');
                setPassword('wellarse2026');
                setError('');
              }}
              className="text-left px-2 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-[10px] font-bold text-slate-800 truncate cursor-pointer transition-colors shadow-2xs"
              title="Board: Wellarse (wellarse@ubumwesacco.rw)"
            >
              ⭐ Board: Wellarse
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail('staff@ubumwesacco.rw');
                setPassword('staff2026');
                setError('');
              }}
              className="text-left px-2 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-[10px] font-bold text-slate-800 truncate cursor-pointer transition-colors shadow-2xs"
              title="Staff / Credit: Innocent (staff@ubumwesacco.rw)"
            >
              💼 Staff: Innocent
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Compact Form */}
        <form onSubmit={handleLogin} className="space-y-2.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Staff Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              placeholder="ubumwesaccogakenke@gmail.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Passcode / PIN
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-slate-500 hover:text-slate-800 cursor-pointer"
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
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                placeholder="Enter passcode (e.g. gakenke2026)"
              />
              <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Sign In to Admin Hub</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
