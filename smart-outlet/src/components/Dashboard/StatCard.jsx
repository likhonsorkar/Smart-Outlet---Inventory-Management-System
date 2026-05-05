import React from 'react';

const StatCard = ({ title, value, icon, trend, trendValue, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-6 hover:shadow-md transition-shadow">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${colorClasses[color]}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider">{title}</h3>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-black text-gray-900 tracking-tighter">{value}</span>
          {trend && (
            <span className={`text-xs font-bold mb-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              <i className={`fa-solid fa-caret-${trend} mr-1`}></i>
              {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
