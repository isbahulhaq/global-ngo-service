
import React, { useState, useMemo } from 'react';
import CategoryBar from '../components/CategoryBar';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../constants';
import { useApp } from '../App';
import { ShieldCheck, ArrowRight, Search, Globe, Award, UserCheck } from 'lucide-react';

const Home = () => {
  const { searchTerm, setSearchTerm } = useApp();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => {
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = searchLower === '' || 
        s.name.toLowerCase().includes(searchLower) ||
        s.shortDescription.toLowerCase().includes(searchLower);
      
      const matchesCategory = activeCategory === null || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="bg-[#fcfdfe] min-h-screen">
      <CategoryBar 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-32 space-y-24">
        {/* Elite 8K Corporate Hero Section */}
        <section className="relative rounded-[3.5rem] bg-[#020617] overflow-hidden shadow-2xl min-h-[750px] flex items-center border border-white/5">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,58,138,0.25),transparent_70%)]"></div>
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=100&w=2500" 
              className="w-full h-full object-cover opacity-10 mix-blend-overlay"
              alt="Corporate Background"
            />
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 p-12 md:p-24 items-center">
            <div className="lg:col-span-7 space-y-12">
              <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-6 py-2.5 rounded-full">
                <ShieldCheck size={18} className="text-blue-400" />
                <span className="text-[11px] font-black text-blue-300 uppercase tracking-[0.4em]">India's Premier Legal Advisor</span>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.9]">
                Architecting <br/>
                <span className="text-blue-500">Legal Excellence</span> <br/>
                Globally.
              </h1>
              
              <p className="text-2xl text-blue-100/50 max-w-2xl font-medium leading-relaxed border-l-4 border-blue-600 pl-10 italic">
                Strategic counsel directed by <span className="text-white font-black underline decoration-blue-600 underline-offset-[12px]">Advocate Tamanna</span>. Empowering NGOs, Corporations, and Global Enterprises with 100% verified legal ecosystems.
              </p>

              <div className="flex flex-wrap gap-8 pt-6">
                <button 
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-[#020617] px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 hover:text-white transition-all duration-500 flex items-center gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-2"
                >
                  Explore Portfolio <ArrowRight size={18} />
                </button>
                <a 
                  href="https://wa.me/919266348507" 
                  className="bg-white/5 border border-white/10 px-12 py-6 rounded-2xl font-black text-white uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  Private Consultation
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block relative group">
              {/* Profile Image: HD Indian Professional Woman in Sharp Black Blazer/Coat */}
              <div className="relative z-10 rounded-[4rem] overflow-hidden border-[12px] border-white/5 shadow-3xl ring-2 ring-white/10 group-hover:scale-[1.03] transition-all duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=100&w=1200" 
                  className="w-full aspect-[4/5] object-cover transition-all duration-1000"
                  alt="Advocate Tamanna - Indian Professional Lawyer in Black Suit"
                />
                <div className="absolute bottom-0 inset-x-0 p-12 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent">
                  <div className="space-y-1">
                    <p className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Tamanna</p>
                    <p className="text-[11px] text-yellow-500 font-bold uppercase tracking-[0.5em] mt-3 flex items-center gap-2">
                      <Award size={14} /> Principal Legal Counsel
                    </p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10 flex gap-10">
                     <div className="space-y-1">
                        <p className="text-white font-black text-2xl tracking-tighter">15k+</p>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Clients Served</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-white font-black text-2xl tracking-tighter">100%</p>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Success Rate</p>
                     </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-[120px]"></div>
            </div>
          </div>
        </section>

        {/* Global Impact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { icon: Globe, l: 'National Presence', s: 'Presence across 28 States' },
            { icon: ShieldCheck, l: 'Verified Desk', s: 'Authorized Govt. Liaison' },
            { icon: Award, l: 'Elite Benchmarking', s: 'ISO 9001:2015 Firm' },
            { icon: UserCheck, l: 'Advocate-Led', s: 'Senior Advisory Panel' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 flex flex-col items-center text-center gap-6 hover:border-blue-500/30 hover:shadow-3xl transition-all duration-500 group cursor-default">
              <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-blue-600 group-hover:bg-[#020617] group-hover:text-white transition-all duration-500 shadow-inner">
                <item.icon size={36} />
              </div>
              <div>
                <p className="font-black text-[#0f172a] uppercase tracking-tighter text-xl">{item.l}</p>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2">{item.s}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Section */}
        <div id="portfolio" className="space-y-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 border-b-2 border-gray-100 pb-16">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-8xl font-black text-[#0f172a] tracking-tighter uppercase leading-none">
                {activeCategory || 'Elite Compliance Portfolio'}
              </h2>
              <p className="text-2xl text-gray-400 font-medium italic border-l-[10px] border-blue-600 pl-12 py-4">
                Discover {SERVICES.length}+ premium professional assets built for high-scale organizational impact.
              </p>
            </div>
            {searchTerm && (
              <div className="bg-blue-50 px-10 py-5 rounded-[2rem] flex items-center gap-5 border border-blue-100 shadow-sm">
                <Search size={22} className="text-blue-600" />
                <span className="text-base font-black text-blue-900 uppercase tracking-widest">Searching: "{searchTerm}"</span>
                <button onClick={() => setSearchTerm('')} className="text-[11px] text-red-500 font-black uppercase tracking-[0.3em] ml-8 border-b-2 border-red-500 hover:text-red-700 transition-colors">Clear</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-60 bg-gray-50 rounded-[5rem] border-4 border-dashed border-gray-200">
              <div className="text-[140px] mb-12 grayscale opacity-10">⚖️</div>
              <p className="text-4xl font-black text-gray-300 uppercase tracking-[0.4em]">No matching assets found.</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory(null); }}
                className="mt-16 text-[#020617] font-black text-base uppercase tracking-[0.2em] border-b-4 border-blue-600 pb-2 hover:text-blue-600 transition-colors"
              >
                Reset Compliance Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
