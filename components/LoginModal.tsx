
import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Phone, Lock } from 'lucide-react';
import { useApp } from '../App';
import { UserRole } from '../types';

const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setUser, pendingServiceRedirect, setPendingServiceRedirect } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = email.toLowerCase().includes('admin') ? UserRole.ADMIN : UserRole.CLIENT;
    
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0] || 'Premium Client',
      email: email || 'client@global.legal',
      phone: '9876543210',
      role: role
    };

    setUser(mockUser);
    setIsLoginModalOpen(false);
    
    if (pendingServiceRedirect) {
      window.location.hash = pendingServiceRedirect;
      setPendingServiceRedirect(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-xl p-6">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20">
        {/* Left Side (Branding) */}
        <div className="bg-[#0f172a] text-white p-16 md:w-[45%] flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Client <br/><span className="text-yellow-500">Authorized</span> Access</h2>
            <p className="text-blue-100/50 text-lg leading-relaxed font-medium border-l-4 border-yellow-500 pl-8">
              Access your legal documents, track service status, and consult directly with our legal team.
            </p>
          </div>
          <div className="relative z-10 space-y-4 pt-10">
            <div className="flex items-center gap-4 text-sm font-bold opacity-60">
                <ShieldCheck className="text-yellow-500" /> Govt. Verified Platform
            </div>
            <div className="flex items-center gap-4 text-sm font-bold opacity-60">
                <Lock className="text-yellow-500" /> End-to-End Encryption
            </div>
          </div>
          {/* Decorative */}
          <ShieldCheck size={400} className="absolute -bottom-20 -right-20 opacity-5" />
        </div>

        {/* Right Side (Form) */}
        <div className="p-16 md:w-[55%] relative bg-white flex flex-col justify-center">
          <button 
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-10 right-10 text-gray-400 hover:text-[#0f172a] transition-colors"
          >
            <X size={32} />
          </button>

          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-[#0f172a]">Verify Identity</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global NGO Service | Legacy Platform</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Professional Email / Mobile</label>
                <div className="relative">
                    <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 py-5 px-6 rounded-2xl focus:border-yellow-500 focus:outline-none transition-all font-bold text-[#0f172a]"
                    placeholder="e.g. counsel@global.legal"
                    />
                    <Mail className="absolute right-6 top-5 text-gray-300" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Security Password</label>
                <div className="relative">
                    <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 py-5 px-6 rounded-2xl focus:border-yellow-500 focus:outline-none transition-all font-bold text-[#0f172a]"
                    placeholder="••••••••"
                    />
                    <Lock className="absolute right-6 top-5 text-gray-300" size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <button 
                type="submit"
                className="w-full bg-[#0f172a] text-yellow-500 py-6 font-black rounded-2xl shadow-2xl hover:bg-yellow-500 hover:text-[#0f172a] transition-all duration-500 uppercase tracking-[0.3em] text-xs hover:-translate-y-1"
              >
                Authorize Login
              </button>
              <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">New Associate? <span className="text-blue-600 cursor-pointer hover:underline">Request Account</span></p>
              </div>
            </div>
          </form>
          
          <div className="mt-12 flex items-center justify-center gap-3 text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">
            <ShieldCheck size={12} />
            <span>Advocate-Led Advisory Compliance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
