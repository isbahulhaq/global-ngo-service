
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, CheckCircle2, Clock, Calendar, ChevronRight, Share2, Info, FileText, Download, MessageSquare, Award } from 'lucide-react';
import { SERVICES } from '../constants';
import { useApp } from '../App';
import { ApplicationStatus } from '../types';

const ServiceDetail = () => {
  const { id } = useParams();
  const { user, setApplications, setIsLoginModalOpen, setPendingServiceRedirect } = useApp();
  const service = SERVICES.find(s => s.id === id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!service) return <div className="p-20 text-center font-bold">Service not found</div>;

  const handleApply = () => {
    if (!user) {
      setPendingServiceRedirect(`/service/${service.id}`);
      setIsLoginModalOpen(true);
      return;
    }

    const newApp = {
      id: `APP-${Math.floor(Math.random() * 90000) + 10000}`,
      userId: user.id,
      userName: user.name,
      serviceId: service.id,
      serviceName: service.name,
      status: ApplicationStatus.PENDING,
      dateApplied: new Date().toISOString().split('T')[0],
      documents: []
    };

    setApplications(prev => [...prev, newApp]);
    alert(`${service.name} application initiated! Track it in your dashboard.`);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-12">
        
        {/* Left Side (HD Visual & Sticky CTA) */}
        <div className="md:w-[45%]">
          <div className="sticky top-24 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
              <img 
                src={service.image} 
                className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={service.name}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="flex items-center gap-2 text-white">
                  <div className="bg-yellow-400 p-1 rounded-full"><ShieldCheck size={16} className="text-blue-900" /></div>
                  <span className="font-bold text-sm tracking-widest uppercase">Certified Legal Service</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleApply}
                className="bg-[#0f172a] text-yellow-500 py-6 font-black rounded-xl shadow-lg hover:shadow-2xl hover:bg-[#1e293b] transition-all flex flex-col items-center justify-center gap-1 uppercase tracking-widest text-[10px]"
              >
                <CheckCircle2 size={24} className="mb-1" /> 
                Apply Now
              </button>
              <a 
                href="https://wa.me/919266348507"
                className="bg-green-600 text-white py-6 font-black rounded-xl shadow-lg hover:shadow-2xl hover:bg-green-700 transition-all flex flex-col items-center justify-center gap-1 uppercase tracking-widest text-[10px]"
              >
                <MessageSquare size={24} className="mb-1" /> 
                Direct Chat
              </a>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Award size={20} className="text-blue-600" />
                <h4 className="font-black text-blue-900 text-xs uppercase tracking-widest">Consultation Policy</h4>
              </div>
              <p className="text-[11px] text-blue-800/70 leading-relaxed font-bold uppercase tracking-tight">
                Fees for legal drafting and liaison are determined based on specific organizational scale and case complexity. Apply to receive a customized professional proposal.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side (Content) */}
        <div className="md:w-[55%] space-y-8">
          <nav className="text-[10px] text-gray-400 font-bold flex items-center gap-2 uppercase tracking-widest">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <ChevronRight size={10} />
            <span className="hover:text-blue-600 cursor-pointer transition">{service.category}</span>
            <ChevronRight size={10} />
            <span className="text-gray-900">{service.name}</span>
          </nav>

          <div className="space-y-4">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {service.name} <br/>
              <span className="text-blue-600 font-light text-2xl tracking-normal">Premium Strategic Compliance Asset</span>
            </h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                {service.rating} <Star size={12} fill="currentColor" />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest border-l pl-4">{service.reviews.toLocaleString()} Enterprise Partners</span>
              <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-yellow-200">
                Advocate Led
              </div>
            </div>
          </div>

          {/* Special Banner */}
          <div className="bg-[#0f172a] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500 p-2.5 rounded-xl text-[#0f172a] shadow-lg"><Download size={20} /></div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-tighter">Compliance Checklist v4.0</p>
                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-[0.2em]">Mandatory Pre-filing Documents</p>
              </div>
            </div>
            <button className="text-yellow-500 font-black text-[10px] uppercase tracking-widest hover:underline px-4">Download PDF</button>
          </div>

          {/* Highlights */}
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Core Deliverables
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-transparent hover:border-blue-100 hover:bg-white transition shadow-sm group">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-gray-700 leading-relaxed uppercase tracking-tighter">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Tabs */}
          <div className="pt-4">
            <div className="flex gap-8 border-b scroll-x-auto hide-scrollbar">
              {['overview', 'documents', 'process', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="py-8 animate-in fade-in duration-500">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <p className="text-gray-700 leading-loose text-sm font-medium border-l-4 border-gray-200 pl-6 italic">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-gray-900 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                      <Clock className="text-yellow-500" size={32} />
                      <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">SLA Timeframe</p>
                        <p className="font-black text-white text-lg tracking-tighter">{service.timeframe}</p>
                      </div>
                    </div>
                    <div className="bg-blue-600 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                      <Calendar className="text-white" size={32} />
                      <div>
                        <p className="text-[10px] text-blue-200 font-black uppercase tracking-widest">Certificate Validity</p>
                        <p className="font-black text-white text-lg tracking-tighter">{service.validity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white p-5 border rounded-2xl shadow-sm hover:shadow-md transition cursor-default">
                      <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><FileText size={20} /></div>
                      <span className="text-xs font-bold text-gray-800 uppercase tracking-tight">{doc}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'process' && (
                <div className="space-y-8 relative pl-6 border-l-2 border-gray-100 ml-4">
                  {service.process.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shadow-lg">
                        {idx + 1}
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <h4 className="font-black text-gray-900 text-xs uppercase tracking-widest mb-1">Phase {idx + 1}</h4>
                        <p className="text-sm text-gray-600 font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200 text-center">
                     <Info size={40} className="mx-auto text-gray-300 mb-4" />
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Direct Consultation Required for Q&A</p>
                     <p className="text-[11px] text-gray-400 mt-2">Due to high case volume, FAQs are provided during the strategy call.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 bg-[#0f172a] text-white rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                <ShieldCheck size={40} className="text-yellow-400" />
              </div>
              <div className="text-center md:text-left space-y-2">
                <h4 className="text-xl font-black uppercase tracking-widest">Elite Assurance Protocol</h4>
                <p className="text-sm text-blue-200 font-medium italic">"Every case is personal. Every organization is a legacy." — Advocate Tamanna</p>
                <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/40?img=${i+20}`} className="w-8 h-8 rounded-full border-2 border-gray-900" alt="Avatar"/>)}
                  </div>
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Network of 1200+ Registered NGOs</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck size={180} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
