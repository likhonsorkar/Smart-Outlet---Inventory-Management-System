import React, { useState } from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { allProducts } from '../data';

const OutletManagerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [customer, setCustomer] = useState({ name: 'Walk-in Customer', email: 'N/A' });

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <DashboardLayout role="outlet_manager">
      <div className="mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">OUTLET <span className="text-blue-600">POS</span></h2>
        <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-xs">Manage local sales and customers</p>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="xl:hidden flex mb-6 bg-gray-100 p-1.5 rounded-2xl">
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex-grow py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-laptop mr-2"></i>
          Products
        </button>
        <button 
          onClick={() => setActiveTab('cart')}
          className={`flex-grow py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all relative ${activeTab === 'cart' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-receipt mr-2"></i>
          Summary
          {cartCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px]">{cartCount}</span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
        <div className={`xl:col-span-2 flex flex-col gap-6 md:gap-8 ${activeTab === 'products' ? 'flex' : 'hidden xl:flex'}`}>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-14 md:pl-16 pr-8 py-4 md:py-6 bg-white border border-gray-100 rounded-2xl md:rounded-[2rem] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="bg-white p-3 md:p-6 rounded-2xl md:rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="aspect-square rounded-xl md:rounded-3xl overflow-hidden mb-3 md:mb-4 bg-gray-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-black text-gray-900 leading-tight mb-1 md:mb-2 line-clamp-2 text-[10px] sm:text-xs md:text-base">{product.name}</h4>
                <p className="text-blue-600 font-black text-xs md:text-lg">${product.price}</p>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>

        <div className={`xl:col-span-1 ${activeTab === 'cart' ? 'block' : 'hidden xl:block'}`}>
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-xl border border-gray-100 flex flex-col sticky top-8 h-fit max-h-[calc(100vh-120px)]">
            <div className="relative z-10 flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between mb-6 md:mb-10">
                <h3 className="text-lg md:text-2xl font-black text-gray-900 tracking-tighter">Order <span className="text-blue-600">Summary</span></h3>
                <i className="fa-solid fa-receipt text-gray-200 text-2xl md:text-3xl"></i>
              </div>

              {/* Cart List */}
              <div className="flex-grow overflow-y-auto mb-6 md:mb-8 pr-2">
                {cart.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-gray-300 gap-4 opacity-50">
                    <i className="fa-solid fa-cart-shopping text-4xl md:text-5xl"></i>
                    <p className="font-black uppercase tracking-widest text-[8px] md:text-xs">No items yet</p>
                  </div>
                ) : (
                  <div className="space-y-4 md:space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-3 md:gap-4 group">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold text-gray-900 text-[10px] md:text-sm line-clamp-1">{item.name}</p>
                          <p className="text-blue-600 font-black text-[10px] md:text-xs">${item.price} x {item.quantity}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                        >
                          <i className="fa-solid fa-trash-can text-[10px]"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between mb-8">
                  <span className="text-lg md:text-xl font-black text-gray-900">Total</span>
                  <span className="text-2xl md:text-3xl font-black text-blue-600 tracking-tighter">${total.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 md:py-4 bg-gray-900 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm hover:bg-gray-800 transition-all">
                    CASH
                  </button>
                  <button className="py-3 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                    PAYMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OutletManagerDashboard;
