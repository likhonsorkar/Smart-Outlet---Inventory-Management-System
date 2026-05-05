import React from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import StatCard from '../components/Dashboard/StatCard';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
        <StatCard title="Total Revenue" value="$128,430" icon="fa-dollar-sign" trend="up" trendValue="12.5%" color="green" />
        <StatCard title="Total Users" value="1,240" icon="fa-users" trend="up" trendValue="5.2%" color="blue" />
        <StatCard title="Active Orders" value="48" icon="fa-shopping-bag" color="indigo" />
        <StatCard title="Conversion Rate" value="3.4%" icon="fa-chart-pie" trend="down" trendValue="0.8%" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-50">
           <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter mb-8 md:mb-12">Sales <span className="text-blue-600">Analytics</span></h3>
           <div className="h-48 md:h-64 flex items-end justify-between gap-2 md:gap-4 px-2 md:px-4">
              {[60, 45, 75, 50, 90, 65, 80].map((h, i) => (
                <div key={i} className="flex-grow flex flex-col items-center gap-2 md:gap-4 group">
                  <div 
                    style={{ height: `${h}%` }} 
                    className="w-full bg-blue-50 group-hover:bg-blue-600 rounded-t-xl md:rounded-t-2xl transition-all relative"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${h * 100}
                    </div>
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-tighter">Day {i+1}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-50">
           <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter mb-8 md:mb-12">Recent <span className="text-indigo-600">Activity</span></h3>
           <div className="space-y-6 md:space-y-8">
              {[
                { user: 'Sarah J.', action: 'Purchased Smart Watch', time: '2 mins ago', icon: 'fa-cart-shopping', color: 'bg-blue-100 text-blue-600' },
                { user: 'Mike R.', action: 'New account created', time: '15 mins ago', icon: 'fa-user-plus', color: 'bg-indigo-100 text-indigo-600' },
                { user: 'System', action: 'Low stock alert: Air Purifier', time: '1 hour ago', icon: 'fa-triangle-exclamation', color: 'bg-red-100 text-red-600' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-sm md:text-base ${activity.color}`}>
                    <i className={`fa-solid ${activity.icon}`}></i>
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-900 font-bold text-sm md:text-base">{activity.user} <span className="text-gray-400 font-medium">{activity.action}</span></p>
                    <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">{activity.time}</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
