
import React from 'react';
// Added Link to imports
import { Link } from 'react-router-dom';
import { useApp } from '../App';
// Added ShieldCheck to imports
import { LayoutDashboard, FileText, Bell, Clock, CheckCircle2, AlertCircle, Upload, MoreVertical, ShieldCheck } from 'lucide-react';
import { ApplicationStatus } from '../types';

const Dashboard = () => {
  const { user, applications } = useApp();

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.APPROVED: return 'bg-green-100 text-green-700 border-green-200';
      case ApplicationStatus.REJECTED: return 'bg-red-100 text-red-700 border-red-200';
      case ApplicationStatus.PENDING: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const myApps = applications.filter(a => a.userId === user?.id);

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 flex items-center gap-4 shadow-sm rounded">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl uppercase">
              {user?.name[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-gray-500 font-medium">Hello,</p>
              <p className="font-bold truncate">{user?.name}</p>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
              <LayoutDashboard size={18} className="text-blue-600" />
              <span className="font-bold text-gray-700 text-sm">CLIENT MENU</span>
            </div>
            <div className="p-2">
              <button className="w-full text-left p-3 rounded hover:bg-blue-50 text-blue-600 font-bold text-sm flex items-center gap-3">
                <FileText size={18} /> My Applications
              </button>
              <button className="w-full text-left p-3 rounded hover:bg-blue-50 text-gray-600 font-medium text-sm flex items-center gap-3">
                <Bell size={18} /> Notifications
              </button>
              <button className="w-full text-left p-3 rounded hover:bg-blue-50 text-gray-600 font-medium text-sm flex items-center gap-3">
                <Clock size={18} /> History
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white shadow-sm rounded-sm overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">My Legal Services</h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{myApps.length} ACTIVE APPLICATIONS</span>
            </div>
            
            <div className="divide-y">
              {myApps.length > 0 ? myApps.map((app) => (
                <div key={app.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center border text-2xl">
                        ⚖️
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900">{app.serviceName}</h4>
                          <span className="text-[10px] text-gray-400 font-bold border rounded px-1.5 py-0.5">{app.id}</span>
                        </div>
                        <p className="text-xs text-gray-500">Applied on {app.dateApplied}</p>
                        <div className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(app.status)}`}>
                          {app.status === ApplicationStatus.APPROVED ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                          {app.status}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-blue-700 transition">
                        <Upload size={14} /> Upload Docs
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded border">
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Tracking Timeline (Mini) */}
                  <div className="mt-8 flex items-center">
                    {[
                      { l: 'Pending', active: true },
                      { l: 'Documents', active: app.status !== ApplicationStatus.PENDING },
                      { l: 'Review', active: [ApplicationStatus.UNDER_REVIEW, ApplicationStatus.APPROVED].includes(app.status) },
                      { l: 'Approved', active: app.status === ApplicationStatus.APPROVED }
                    ].map((step, i, arr) => (
                      <React.Fragment key={i}>
                        <div className="flex flex-col items-center relative z-10">
                          <div className={`w-3 h-3 rounded-full ${step.active ? 'bg-green-500 ring-4 ring-green-100' : 'bg-gray-200'}`}></div>
                          <span className={`text-[10px] mt-2 font-bold ${step.active ? 'text-gray-700' : 'text-gray-300'}`}>{step.l}</span>
                        </div>
                        {i < arr.length - 1 && (
                          <div className={`flex-grow h-0.5 mx-2 -mt-4 ${arr[i+1].active ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="p-20 text-center space-y-4">
                  <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-blue-200" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-600">No applications yet</h3>
                  <p className="text-sm text-gray-400">Browse our legal services and start your application today.</p>
                  <Link to="/" className="inline-block bg-blue-600 text-white px-8 py-2 rounded font-bold hover:bg-blue-700 transition">Explore Services</Link>
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-[#172337] text-white p-6 rounded shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <h3 className="text-lg font-bold">Expert Legal Tip</h3>
              <p className="text-sm text-blue-200 leading-relaxed max-w-xl">
                Always ensure your 12A and 80G registrations are renewed before their expiry to continue enjoying tax exemptions. 
                Our system will notify you 3 months in advance.
              </p>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
