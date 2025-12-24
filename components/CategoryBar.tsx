
import React from 'react';
import { CATEGORIES } from '../constants';
import { Shield, Globe, Landmark, Code, FileSearch, Briefcase, Plus } from 'lucide-react';

const CategoryBar = ({ activeCategory, onCategoryChange }: { 
  activeCategory: string | null, 
  onCategoryChange: (cat: string | null) => void 
}) => {
  const getIcon = (cat: string) => {
    if (cat.includes('NGO')) return Shield;
    if (cat.includes('Company')) return Briefcase;
    if (cat.includes('License')) return Landmark;
    if (cat.includes('Finance')) return FileSearch;
    if (cat.includes('Tech')) return Code;
    if (cat.includes('Other')) return Plus;
    return Globe;
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-20 z-40 overflow-x-auto hide-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center py-6 space-x-12 min-w-max">
        <button 
          onClick={() => onCategoryChange(null)}
          className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition-all duration-500 font-black uppercase tracking-[0.2em] text-[10px] ${!activeCategory ? 'bg-[#0f172a] text-yellow-500 shadow-2xl' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
        >
          <Globe size={16} />
          <span>General</span>
        </button>
        {CATEGORIES.map((cat) => {
          const Icon = getIcon(cat);
          return (
            <button 
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition-all duration-500 font-black uppercase tracking-[0.2em] text-[10px] whitespace-nowrap ${activeCategory === cat ? 'bg-[#0f172a] text-yellow-500 shadow-2xl' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Icon size={16} />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
