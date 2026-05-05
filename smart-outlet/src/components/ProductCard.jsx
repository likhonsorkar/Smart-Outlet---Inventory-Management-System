import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-[2rem] p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 border border-gray-100/50">
      {/* Badge */}
      {product.discount && (
        <span className="absolute top-6 left-6 z-10 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full">
          -{product.discount}%
        </span>
      )}
      
      {/* Image Container */}
      <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-50 mb-6">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3 pointer-events-none group-hover:pointer-events-auto">
          <button className="bg-white text-black p-3 rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-blue-600 hover:text-white">
            <i className="fa-regular fa-heart"></i>
          </button>
          <button className="bg-white text-black p-3 rounded-xl shadow-lg transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75 hover:bg-blue-600 hover:text-white">
            <i className="fa-solid fa-cart-plus"></i>
          </button>
          <Link to={`/product/${product.id}`} className="bg-white text-black p-3 rounded-xl shadow-lg transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-150 hover:bg-blue-600 hover:text-white flex items-center justify-center">
            <i className="fa-solid fa-eye"></i>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Category</span>
          <div className="flex items-center text-yellow-400 text-[10px]">
            <i className="fa-solid fa-star"></i>
            <span className="text-gray-900 font-bold ml-1">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">${product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through font-medium">${product.oldPrice}</span>
            )}
          </div>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
