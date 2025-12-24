
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, CheckCircle2, Clock, Calendar, ChevronRight, Share2, Info, FileText, Download, MessageSquare } from 'lucide-react';
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
              {/* Fixed: Changed service.icon to service.image */}
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
                className="bg-[#ff9f00] text-white py-4 font-black rounded-xl shadow-lg hover:shadow-2xl hover:bg-orange-500 transition-all flex flex-col items-center justify-center gap-1 uppercase tracking-widest text-xs"
              >
                <CheckCircle2 size={24} /> 
                Apply for Registration
              </button>
              <button className="bg-[#fb641b] text-white py-4 font-black rounded-xl shadow-lg hover:shadow-2xl hover:bg-orange-600 transition-all flex flex-col items-center justify-center gap-1 uppercase tracking-widest text-xs">
                <MessageSquare size={24} /> 
                Talk to Tamanna
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-dashed border-gray-300">
              <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-widest">Pricing Transparency</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Professional Fee</span>
                  <span className="font-bold text-gray-900">₹{service.price}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Government Charges</span>
                  <span className="font-bold text-blue-600">As per actuals</span>
                </div>
                <div className="pt-2 border-t mt-2 flex justify-between font-bold text-sm">
                  <span>Total Payable</span>
                  <span className="text-gray-900">Starts at ₹{service.price}</span>
                </div>
              </div>
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
              <span className="text-blue-600 font-light text-2xl tracking-normal">Comprehensive Legal Registration Service</span>
            </h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                {service.rating} <Star size={12} fill="currentColor" />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest border-l pl-4">{service.reviews.toLocaleString()} Client Testimonials</span>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-4" />
            </div>
          </div>

          {/* Special Banner */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg text-white shadow-lg"><Download size={20} /></div>
              <div>
                <p className="font-black text-green-800 text-sm">Download Legal Checklist</p>
                <p className="text-[10px] text-green-600 uppercase font-bold tracking-widest">Available for Limited Time</p>
              </div>
            </div>
            <button className="text-green-800 font-black text-xs uppercase hover:underline">Get PDF</button>
          </div>

          {/* Highlights */}
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Service Pillars
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
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
                      <Clock className="text-blue-600" size={32} />
                      <div>
                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">SLA Timeframe</p>
                        <p className="font-black text-blue-900 text-lg">{service.timeframe}</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 flex items-center gap-4">
                      <Calendar className="text-yellow-600" size={32} />
                      <div>
                        <p className="text-[10px] text-yellow-500 font-black uppercase tracking-widest">Certificate Validity</p>
                        <p className="font-black text-yellow-900 text-lg">{service.validity}</p>
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
                  {service.faqs.map((faq, idx) => (
                    <details key={idx} className="group border-2 border-gray-50 rounded-2xl p-6 bg-white cursor-pointer hover:border-blue-100 transition shadow-sm">
                      <summary className="font-black text-sm text-gray-900 flex justify-between items-center list-none uppercase tracking-tight">
                        {faq.question}
                        <ChevronRight className="group-open:rotate-90 transition text-gray-400" size={18} />
                      </summary>
                      <p className="text-sm text-gray-600 mt-4 pt-4 border-t font-medium leading-relaxed">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-8 bg-blue-900 text-white rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                <ShieldCheck size={40} className="text-yellow-400" />
              </div>
              <div className="text-center md:text-left space-y-2">
                <h4 className="text-xl font-black uppercase tracking-widest">Global NGO Service Assurance</h4>
                <p className="text-sm text-blue-200 font-medium italic">"We handle the complexity, so you can focus on your impact."</p>
                <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-blue-900" alt="Avatar"/>)}
                  </div>
                  <span className="text-[10px] font-bold text-blue-300 uppercase">Trusted by 500+ NGOs this month</span>
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
