
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Service } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <Link 
      to={`/service/${service.id}`}
      className="bg-white group rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-blue-500/20 hover:shadow-[0_30px_60px_-15px_rgba(15, 23, 42, 0.15)] transition-all duration-700 flex flex-col h-full transform hover:-translate-y-2"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 bg-[#020617]/90 backdrop-blur-xl text-yellow-500 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-white/10">
          <ShieldCheck size={14} /> {service.category.split(' ')[0]}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent"></div>
      </div>

      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-black text-[#020617] uppercase tracking-widest">{service.rating}</span>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{service.reviews.toLocaleString()} Elite Clients</span>
        </div>

        <h3 className="text-2xl font-black text-[#020617] leading-tight mb-4 group-hover:text-blue-600 transition-colors tracking-tighter uppercase">
          {service.name}
        </h3>
        
        <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-2 mb-8 italic">
          {service.shortDescription}
        </p>

        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.3em] mb-1">Status</span>
            <span className="text-base font-black text-[#020617] flex items-center gap-2">
              <MessageSquare size={14} className="text-green-500" /> Open Consultation
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
