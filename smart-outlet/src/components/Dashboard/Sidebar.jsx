import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/auth-service';

const Sidebar = ({ role, isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = {
    customer: [
      { name: 'Overview', icon: 'fa-gauge', path: '/dashboard/customer' },
      { name: 'My Orders', icon: 'fa-box', path: '/dashboard/customer/orders' },
      { name: 'Wishlist', icon: 'fa-heart', path: '/dashboard/customer/wishlist' },
      { name: 'Profile', icon: 'fa-user', path: '/dashboard/customer/profile' },
      { name: 'Settings', icon: 'fa-gear', path: '/dashboard/customer/settings' },
    ],
    admin: [
      { name: 'Dashboard', icon: 'fa-chart-line', path: '/dashboard/admin' },
      { name: 'Categories', icon: 'fa-tags', path: '/dashboard/admin/categories' },
      { name: 'Products', icon: 'fa-laptop', path: '/dashboard/admin/products' },
      { name: 'Users', icon: 'fa-users', path: '/dashboard/admin/users' },
      { name: 'Orders', icon: 'fa-shopping-cart', path: '/dashboard/admin/orders' },
      { name: 'Profile', icon: 'fa-user', path: '/dashboard/admin/profile' },
      { name: 'Reports', icon: 'fa-file-invoice-dollar', path: '/dashboard/admin/reports' },
    ],
    manager: [
      { name: 'POS Terminal', icon: 'fa-cash-register', path: '/dashboard/manager' },
      { name: 'Categories', icon: 'fa-tags', path: '/dashboard/manager/categories' },
      { name: 'Inventory', icon: 'fa-warehouse', path: '/dashboard/manager/inventory' },
      { name: 'Custom Orders', icon: 'fa-clipboard-list', path: '/dashboard/manager/custom-orders' },
      { name: 'Customers', icon: 'fa-user-group', path: '/dashboard/manager/customers' },
      { name: 'Profile', icon: 'fa-user', path: '/dashboard/manager/profile' },
      { name: 'Outlet Stats', icon: 'fa-chart-simple', path: '/dashboard/manager/stats' },
    ],
  };

  const handleLogout = () => {
    authService.logoutUser();
    navigate('/login');
  };

  const currentMenu = menuItems[role] || (role === 'outlet_manager' ? menuItems.manager : []);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col h-screen z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:top-0 shadow-sm`}>
        <div className="p-8 flex items-center justify-between">
          <Link to="/" className="text-xl font-black tracking-tighter text-blue-600 uppercase">
            {role} <span className="text-gray-900">Panel</span>
          </Link>
          <button 
            className="lg:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <nav className="flex-grow px-4 space-y-2 overflow-y-auto scrollbar-hide">
          {currentMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <span className="w-6 text-center">
                <i className={`fa-solid ${item.icon}`}></i>
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50 space-y-2">
          <Link 
            to="/" 
            className="flex items-center gap-4 px-4 py-3 w-full text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-all"
          >
            <i className="fa-solid fa-house"></i>
            Back to Home
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
