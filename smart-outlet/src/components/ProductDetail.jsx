import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '../data';

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4">Product Not Found</h2>
          <Link to="/" className="text-blue-600 font-bold hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 cursor-pointer hover:border-blue-600 transition-all">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-600/10 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  In Stock
                </span>
                <div className="flex items-center text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-200'}`}></i>
                  ))}
                  <span className="text-gray-900 font-bold ml-2">{product.rating}</span>
                  <span className="text-gray-400 ml-1">({product.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl font-black text-gray-900">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-2xl text-gray-400 line-through font-medium">${product.oldPrice}</span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-black">
                    SAVE {product.discount}%
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium">
                {product.description}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-8 mb-12">
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-4">Select Color</h4>
                <div className="flex gap-4">
                  {['#000', '#3b82f6', '#ef4444', '#10b981'].map(color => (
                    <button 
                      key={color} 
                      className="w-10 h-10 rounded-full border-2 border-white ring-2 ring-gray-100 transition-all hover:scale-110 active:scale-90"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl shadow-blue-600/30 active:scale-95">
                ADD TO CART
              </button>
              <button className="w-20 h-20 rounded-[2rem] border-2 border-gray-100 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-all active:scale-95">
                <i className="fa-regular fa-heart text-2xl"></i>
              </button>
            </div>

            {/* Features */}
            <div className="mt-16 pt-12 border-t border-gray-100 grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600">
                  <i className="fa-solid fa-truck-fast text-xl"></i>
                </div>
                <div>
                  <h5 className="font-black text-sm text-gray-900">Free Delivery</h5>
                  <p className="text-xs text-gray-500">Orders over $500</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600">
                  <i className="fa-solid fa-shield-halved text-xl"></i>
                </div>
                <div>
                  <h5 className="font-black text-sm text-gray-900">2 Year Warranty</h5>
                  <p className="text-xs text-gray-500">Full coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
