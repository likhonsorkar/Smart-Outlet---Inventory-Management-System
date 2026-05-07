import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, [location]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    authService.logoutUser();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Shop', path: '#' },
    { name: 'Collections', path: '#' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <header 
        className={`container mx-auto px-6 py-3 flex items-center justify-between rounded-2xl transition-all duration-300 pointer-events-auto ${
          isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/20' 
          : 'bg-white shadow-sm border border-transparent'
        }`}
      >
        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter text-blue-600 relative z-50">
          <Link to="/" className="flex items-center gap-1">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded-lg">S</span>
            <span className="text-gray-900 uppercase">Outlet</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-10 font-semibold text-gray-600">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="hover:text-blue-600 transition-all hover:scale-105"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-gray-800 relative z-50">
          <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-blue-300 transition-all">
            <i className="fa-solid fa-magnifying-glass text-gray-400 mr-2"></i>
            <input type="text" placeholder="Search..." className="bg-transparent border-none focus:ring-0 text-sm w-32 lg:w-48 outline-none" />
          </div>
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="hover:text-red-600 transition-all relative p-2 rounded-full hover:bg-gray-100"
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket text-xl"></i>
            </button>
          ) : (
            <Link to="/login" className="hover:text-blue-600 transition-all relative p-2 rounded-full hover:bg-gray-100">
              <i className="fa-regular fa-user text-xl"></i>
            </Link>
          )}
          <a href="#" className="hover:text-blue-600 transition-all relative p-2 rounded-full hover:bg-gray-100">
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">2</span>
          </a>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-40 transition-all duration-500 md:hidden ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
            <div className="w-full max-w-sm">
               <div className="flex items-center bg-gray-100 rounded-2xl px-6 py-4 mb-10 border border-gray-200">
                <i className="fa-solid fa-magnifying-glass text-gray-400 mr-4 text-lg"></i>
                <input type="text" placeholder="Search products..." className="bg-transparent border-none focus:ring-0 text-lg w-full outline-none" />
              </div>
            </div>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-3xl font-black text-gray-900 hover:text-blue-600 transition-all tracking-tighter"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-10 flex gap-6">
               <a href="#" className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-xl hover:bg-blue-600 hover:text-white transition-all">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-xl hover:bg-blue-600 hover:text-white transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
