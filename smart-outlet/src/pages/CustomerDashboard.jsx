import React from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import StatCard from '../components/Dashboard/StatCard';

const CustomerDashboard = () => {
  const recentOrders = [
    { id: '#ORD-7721', date: 'Oct 12, 2023', status: 'Delivered', total: '$299.00' },
    { id: '#ORD-7654', date: 'Oct 05, 2023', status: 'Processing', total: '$89.99' },
    { id: '#ORD-7521', date: 'Sep 28, 2023', status: 'Shipped', total: '$1,299.00' },
  ];

  return (
    <DashboardLayout role="customer">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
        <StatCard title="Total Orders" value="12" icon="fa-box" color="blue" />
        <StatCard title="Saved Items" value="24" icon="fa-heart" color="indigo" />
        <StatCard title="Active Tickets" value="2" icon="fa-headset" color="green" />
        <StatCard title="Reward Points" value="1,250" icon="fa-star" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">Recent <span className="text-blue-600">Orders</span></h3>
            <button className="text-xs md:text-sm font-bold text-gray-400 hover:text-blue-600 transition-all">View All</button>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="pb-4 font-black text-gray-400 uppercase text-[10px] md:text-xs tracking-widest">Order ID</th>
                  <th className="pb-4 font-black text-gray-400 uppercase text-[10px] md:text-xs tracking-widest">Date</th>
                  <th className="pb-4 font-black text-gray-400 uppercase text-[10px] md:text-xs tracking-widest">Status</th>
                  <th className="pb-4 font-black text-gray-400 uppercase text-[10px] md:text-xs tracking-widest text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-gray-50/50 transition-all">
                    <td className="py-4 md:py-6 font-bold text-gray-900 text-sm md:text-base">{order.id}</td>
                    <td className="py-4 md:py-6 text-gray-500 font-medium text-sm md:text-base">{order.date}</td>
                    <td className="py-4 md:py-6">
                      <span className={`px-3 md:px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 md:py-6 font-black text-gray-900 text-right text-sm md:text-base">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-black tracking-tighter mb-8 text-white/90">Personal <span className="text-white">Profile</span></h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/20 p-1 mb-6">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-blue-600 text-2xl md:text-3xl font-black">L</div>
              </div>
              <h4 className="text-lg md:text-xl font-bold mb-1">MD. Likhon Sorkar</h4>
              <p className="text-white/60 font-medium text-xs md:text-sm mb-8">Premium Member since 2023</p>
              
              <div className="w-full space-y-3 md:space-y-4">
                <button className="w-full py-3 md:py-4 bg-white text-blue-600 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/10">
                  EDIT PROFILE
                </button>
                <button className="w-full py-3 md:py-4 bg-white/10 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-white/20 transition-all border border-white/20">
                  ACCOUNT SETTINGS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
