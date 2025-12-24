
import React, { useState } from 'react';
import { useApp } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, FileStack, TrendingUp, CheckCircle, Clock, Search, MoreVertical, Filter, Download } from 'lucide-react';
import { ApplicationStatus } from '../types';

const AdminPanel = () => {
  const { applications, setApplications } = useApp();
  const [filter, setFilter] = useState('');

  const stats = [
    { label: 'Total Leads', val: applications.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Review', val: applications.filter(a => a.status === ApplicationStatus.PENDING).length, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Completed', val: applications.filter(a => a.status === ApplicationStatus.APPROVED).length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Docs Uploaded', val: applications.filter(a => a.status === ApplicationStatus.DOCUMENTS_SUBMITTED).length, icon: FileStack, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ];

  // Mock data for chart
  const chartData = [
    { name: 'NGO', leads: 45 },
    { name: 'Company', leads: 32 },
    { name: 'Tax', leads: 28 },
    { name: 'IPR', leads: 15 },
    { name: 'Audit', leads: 10 }
  ];

  const updateStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const filteredApps = applications.filter(a => 
    a.userName.toLowerCase().includes(filter.toLowerCase()) || 
    a.serviceName.toLowerCase().includes(filter.toLowerCase()) ||
    a.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Command Center</h1>
            <p className="text-sm text-gray-500 font-medium">Global NGO Service | Management Portal</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border p-2 rounded hover:bg-gray-50 text-gray-600"><Download size={20} /></button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">Export CSV</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded shadow-sm border-l-4 border-blue-600 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.val}</p>
              </div>
              <div className={`p-3 rounded-full ${s.bg} ${s.color}`}>
                <s.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2 bg-white rounded shadow-sm overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider">Service Leads Management</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search leads..." 
                  className="pl-8 pr-4 py-1.5 border rounded-sm text-sm focus:outline-none focus:border-blue-500 w-64"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                <Search className="absolute left-2.5 top-2 text-gray-400" size={16} />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-widest border-b">
                  <tr>
                    <th className="px-6 py-4">App ID</th>
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-blue-600">{app.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{app.userName}</td>
                      <td className="px-6 py-4 text-gray-600">{app.serviceName}</td>
                      <td className="px-6 py-4">
                        <select 
                          className="bg-transparent font-semibold focus:outline-none text-xs border rounded px-2 py-1"
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                        >
                          {Object.values(ApplicationStatus).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        <MoreVertical size={16} className="cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-gray-400 italic">No matching leads found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Analytics */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded shadow-sm h-full">
              <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider mb-8">Performance by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="leads" fill="#2874f0" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2874f0' : '#fb641b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 p-4 bg-gray-50 rounded space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase">Growth Insights</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-green-600 font-bold flex items-center gap-1"><TrendingUp size={14} /> +12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avg Lead Response</span>
                  <span className="text-blue-600 font-bold">1.2 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
