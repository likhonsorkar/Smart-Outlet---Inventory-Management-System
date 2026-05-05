import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Identity */}
          <div className="space-y-8">
            <div className="text-3xl font-black tracking-tighter text-white">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-xl mr-2">S</span>
              OUTLET
            </div>
            <p className="text-lg leading-relaxed font-medium">
              Defining the next generation of retail. Premium electronics, unmatched service.
            </p>
            <div className="flex gap-4">
              {['facebook-f', 'x-twitter', 'instagram', 'youtube'].map((icon) => (
                <a key={icon} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/5">
                  <i className={`fa-brands fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Explore</h4>
            <ul className="space-y-4 font-bold">
              {['New Arrivals', 'Best Sellers', 'Tech Collections', 'Accessories'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-500 transition-all flex items-center group">
                    <span className="w-0 group-hover:w-4 h-[2px] bg-blue-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Assistance</h4>
            <ul className="space-y-4 font-bold">
              {['Track Order', 'Return Policy', 'Global Shipping', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-500 transition-all flex items-center group">
                    <span className="w-0 group-hover:w-4 h-[2px] bg-blue-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Stay Connected</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-600 transition-all font-bold placeholder:text-gray-600"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-black text-xs hover:bg-blue-700 transition-all">
                JOIN
              </button>
            </div>
            <p className="text-xs font-bold leading-relaxed">
              *By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-black tracking-widest uppercase text-gray-600">
            © 2026 Smart Outlet • Designed for the Future
          </div>
          <div className="flex gap-8 items-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <i className="fa-brands fa-cc-visa text-3xl"></i>
            <i className="fa-brands fa-cc-mastercard text-3xl"></i>
            <i className="fa-brands fa-cc-apple-pay text-3xl"></i>
            <i className="fa-brands fa-cc-paypal text-3xl"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
