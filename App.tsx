
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Search, User as UserIcon, LogIn, LayoutDashboard, ShoppingBag, Menu, X, ArrowRight, ShieldCheck, HelpCircle, FileText, Bell, MapPin, Globe, Phone, MessageSquare, Mail } from 'lucide-react';
import { Service, User, UserRole, Application, ApplicationStatus } from './types';
import { SERVICES, CATEGORIES } from './constants';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import LoginModal from './components/LoginModal';

// Context for global state
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  pendingServiceRedirect: string | null;
  setPendingServiceRedirect: (path: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const Navbar = () => {
  const { user, setUser, setIsLoginModalOpen, searchTerm, setSearchTerm } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-2xl border-b border-white/5">
      <div className="bg-[#1e293b] py-2 hidden md:block border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[11px] font-bold tracking-[0.15em] text-blue-100/60 uppercase">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-yellow-500/80"><ShieldCheck size={14}/> Govt. Certified Legal Advisory</span>
            <span className="flex items-center gap-2"><MapPin size={14}/> HQ: New Delhi | Global Reach</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:9266348507" className="flex items-center gap-2 hover:text-yellow-500 transition-colors duration-300"><Phone size={14}/> +91 92663 48507</a>
            <a href="mailto:contact@globalngo.legal" className="flex items-center gap-2 hover:text-yellow-500 transition-colors duration-300"><Mail size={14}/> tamanna@globalngo.legal</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Brand Identity */}
          <Link to="/" className="flex flex-col flex-shrink-0 group">
            <span className="font-extrabold text-2xl tracking-tighter leading-none group-hover:text-yellow-500 transition-colors duration-300">GLOBAL NGO</span>
            <span className="text-[10px] text-yellow-500 font-bold tracking-[0.3em] flex items-center gap-1 uppercase mt-1">
              Service <span className="text-white/30 font-light italic">| Legacy Advisory</span>
            </span>
          </Link>

          {/* Professional 8K Search Integration */}
          <div className="hidden md:flex flex-1 max-w-xl relative group">
            <input
              type="text"
              placeholder="Search 35+ Legal & Tech Services (e.g. 12A, Trademark, RERA)..."
              className="w-full bg-[#1e293b] py-3.5 px-6 pr-12 rounded-xl text-white placeholder-blue-100/30 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 border border-white/10 transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-0 top-0 bottom-0 px-5 flex items-center rounded-r-xl cursor-pointer hover:bg-white/5 transition-colors">
              <Search className="text-yellow-500/70" size={20} />
            </div>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-12 top-0 bottom-0 px-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Action Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link to="/services" className="text-sm font-bold tracking-widest hover:text-yellow-500 transition-colors uppercase">All Portfolio</Link>
            
            {user ? (
              <div className="flex items-center gap-8 pl-8 border-l border-white/10">
                <Link 
                  to={user.role === UserRole.ADMIN ? "/admin" : "/dashboard"} 
                  className="flex items-center gap-3 font-bold hover:text-yellow-500 transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 transition-all duration-300 shadow-xl overflow-hidden">
                    <UserIcon size={20} className="group-hover:text-[#0f172a] transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-gray-500">Authorized,</span>
                    <span className="text-xs uppercase tracking-wider font-extrabold">{user.name.split(' ')[0]}</span>
                  </div>
                </Link>
                <button 
                  onClick={() => setUser(null)}
                  className="text-[10px] font-black uppercase text-red-400 hover:text-red-300 transition-colors tracking-[0.2em] pt-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white text-[#0f172a] px-10 py-3 font-extrabold text-xs rounded-xl hover:bg-yellow-500 transition-all duration-500 uppercase tracking-widest shadow-2xl hover:-translate-y-0.5"
              >
                Client Login
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-6">
             {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-yellow-500">
                  <X size={20} />
                </button>
             )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0f172a] p-10 border-t border-white/5 flex flex-col gap-10 animate-fade-in">
          <div className="space-y-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Find legal services..."
                className="w-full bg-[#1e293b] py-4 px-6 rounded-xl text-white border border-white/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-5 top-4 text-gray-500" size={20} />
            </div>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-extrabold hover:text-yellow-500 transition-colors">Home</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-extrabold hover:text-yellow-500 transition-colors">Elite Portfolio</Link>
            <a href="https://wa.me/919266348507" className="block text-2xl font-extrabold text-green-400">WhatsApp Counsel</a>
          </div>
          {user ? (
            <div className="pt-10 border-t border-white/5 space-y-6">
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block font-bold text-lg">My Dashboard</Link>
              <button onClick={() => { setUser(null); setIsMenuOpen(false); }} className="text-red-400 font-bold text-lg">Secure Logout</button>
            </div>
          ) : (
            <button onClick={() => { setIsLoginModalOpen(true); setIsMenuOpen(false); }} className="w-full bg-white text-[#0f172a] py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl">Client Access</button>
          )}
        </div>
      )}
    </nav>
  );
};

// Fix: Modified ProtectedRoute to make children optional in props and moved useEffect to follow Hook rules.
const ProtectedRoute = ({ children, role }: { children?: React.ReactNode, role?: UserRole }) => {
  const { user, setIsLoginModalOpen, setPendingServiceRedirect } = useApp();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setPendingServiceRedirect(location.pathname);
      setIsLoginModalOpen(true);
    }
  }, [user, location.pathname, setIsLoginModalOpen, setPendingServiceRedirect]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const Footer = () => (
  <footer className="bg-[#0f172a] text-gray-400 py-24 px-6 mt-auto border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 pb-20">
      <div className="space-y-10">
        <Link to="/" className="flex flex-col group">
          <span className="text-white font-extrabold text-3xl tracking-tighter uppercase">GLOBAL NGO</span>
          <span className="text-yellow-500 font-bold text-[10px] tracking-[0.5em] uppercase mt-1">Advisory Elite</span>
        </Link>
        <p className="text-sm leading-[2] font-medium opacity-80">
          India's most trusted legal and corporate advisory firm. Specializing in high-value registrations, NGO compliance, and advanced tech solutions. Directed by <span className="text-white">Advocate Tamanna</span>.
        </p>
        <div className="flex gap-6">
          {[Globe, ShieldCheck, Mail].map((Icon, i) => (
            <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-[#0f172a] transition-all duration-300 cursor-pointer shadow-xl">
              <Icon size={20} />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-12">Advisory</h4>
        <ul className="space-y-5 text-sm font-semibold">
          <li className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">NGO Registration</li>
          <li className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">12A & 80G Approval</li>
          <li className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">Pvt Ltd Formation</li>
          <li className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">Digital Ecosystem</li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-12">Compliance</h4>
        <ul className="space-y-5 text-sm font-semibold">
          <li className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">FCRA Registration</li>
          <li className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">RERA & APEDA</li>
          <li className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">Trademark Defense</li>
          <li className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">Annual ROC Filings</li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-12">Secure Reach</h4>
        <div className="space-y-8">
          <div className="flex items-start gap-5">
            <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-2xl border border-yellow-500/10"><Phone size={22}/></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">WhatsApp Direct</p>
              <p className="text-base font-extrabold text-white tracking-tight">+91 92663 48507</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl border border-blue-500/10"><Mail size={22}/></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Legal Mail</p>
              <p className="text-base font-extrabold text-white tracking-tight">tamanna@globalngo.legal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold tracking-widest uppercase text-gray-500">
      <p>© 2024 Global NGO Service Group | Lead Counsel: Advocate Tamanna | Registered Govt Firm</p>
      <div className="flex gap-10 mt-6 md:mt-0">
        <span className="hover:text-white transition-colors cursor-pointer">Security Protocol</span>
        <span className="hover:text-white transition-colors cursor-pointer">Transparency</span>
        <span className="text-yellow-500/40">Verified Legal Tech</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingServiceRedirect, setPendingServiceRedirect] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedApps = localStorage.getItem('applications');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedApps) setApplications(JSON.parse(savedApps));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  return (
    <AppContext.Provider value={{ 
      user, setUser, applications, setApplications, 
      isLoginModalOpen, setIsLoginModalOpen, 
      pendingServiceRedirect, setPendingServiceRedirect,
      searchTerm, setSearchTerm
    }}>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f8fafc]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Home />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
              <Route path="/dashboard" element={<ProtectedRoute role={UserRole.CLIENT}><Dashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute role={UserRole.ADMIN}><AdminPanel /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <LoginModal />
          
          <a 
            href="https://wa.me/919266348507" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-10 right-10 z-[100] bg-green-500 text-white p-6 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(34,197,94,0.5)] hover:bg-green-600 hover:-translate-y-2 transition-all duration-500 group"
          >
            <MessageSquare size={32} />
            <span className="absolute right-full mr-6 bg-white text-[#0f172a] px-5 py-3 rounded-2xl text-[11px] font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-x-4 group-hover:translate-x-0 uppercase tracking-widest border border-gray-100">
              Consult with Tamanna
            </span>
          </a>
        </div>
      </Router>
    </AppContext.Provider>
  );
}
