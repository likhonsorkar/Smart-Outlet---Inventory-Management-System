import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import goodsService from '../services/goods-service';
import categoryService from '../services/category-service';

const ManagerDashboard = () => {
  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    unit: 'pcs',
    brand: '',
    low_stock_threshold: 10,
    global_code: '',
    local_code: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [goodsRes, catData] = await Promise.all([
        goodsService.getAllGoods(),
        categoryService.getCategories()
      ]);
      setGoods(goodsRes.data);
      setCategories(catData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    
    // Create preview URLs for the new files
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      Object.keys(productForm).forEach(key => {
        if (productForm[key] !== null && productForm[key] !== '') {
            formData.append(key, productForm[key]);
        }
      });
      
      selectedFiles.forEach(file => {
        formData.append('uploaded_images', file);
      });

      if (selectedProduct) {
        await goodsService.updateGoods(selectedProduct.id, formData);
      } else {
        await goodsService.createGoods(formData);
      }
      setShowProductModal(false);
      setSelectedFiles([]);
      setPreviewUrls([]);
      fetchData();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
        setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      try {
        await goodsService.deleteGoods(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const openProductModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setProductForm({
        name: product.name,
        description: product.description,
        category: product.category || '',
        unit: product.unit,
        brand: product.brand,
        low_stock_threshold: product.low_stock_threshold,
        global_code: product.global_code || '',
        local_code: product.local_code || ''
      });
    } else {
      setSelectedProduct(null);
      setProductForm({
        name: '',
        description: '',
        category: '',
        unit: 'pcs',
        brand: '',
        low_stock_threshold: 10,
        global_code: '',
        local_code: ''
      });
    }
    setSelectedFiles([]);
    setPreviewUrls([]);
    setShowProductModal(true);
  };

  const filteredGoods = goods.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.brand && g.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout role="manager">
      <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">
            Product <span className="text-blue-600">Management</span>
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Add, update or remove items from your catalog</p>
        </div>
        <button 
          onClick={() => openProductModal()}
          className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <i className="fa-solid fa-plus-circle"></i>
          NEW PRODUCT
        </button>
      </div>

      <div className="mb-8 relative">
        <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input 
          type="text" 
          placeholder="Search products by name or brand..." 
          className="w-full pl-16 pr-8 py-5 bg-white border-2 border-transparent rounded-[2rem] font-bold text-gray-900 focus:outline-none focus:border-blue-600/20 focus:bg-white transition-all shadow-xl shadow-blue-900/5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGoods.map((product) => (
            <div key={product.id} className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gray-50 hover:border-blue-100 transition-all group relative overflow-hidden">
                <div className="aspect-square rounded-[2rem] bg-gray-50 mb-6 overflow-hidden relative">
                    {product.images && product.images.length > 0 ? (
                        <img src={product.images[0].image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                            <i className="fa-solid fa-box-open text-5xl"></i>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                        <button 
                            onClick={() => openProductModal(product)}
                            className="w-10 h-10 rounded-xl bg-white text-blue-600 shadow-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                        >
                            <i className="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                        <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="w-10 h-10 rounded-xl bg-white text-red-600 shadow-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                        >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{product.category_name}</span>
                    <h4 className="font-black text-gray-900 leading-tight line-clamp-2 min-h-[3rem]">{product.name}</h4>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Stock</span>
                            <span className={`font-black ${product.total_stock <= product.low_stock_threshold ? 'text-red-600' : 'text-gray-900'}`}>
                                {product.total_stock} <small className="text-[10px]">{product.unit}</small>
                            </span>
                        </div>
                        {product.total_stock <= product.low_stock_threshold && (
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter animate-pulse">Low Stock</span>
                        )}
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-4xl my-8 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
                  {selectedProduct ? 'EDIT' : 'ADD'} <span className="text-blue-600">PRODUCT</span>
                </h3>
                <button onClick={() => setShowProductModal(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Product Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Brand</label>
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({...productForm, brand: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Description</label>
                    <textarea 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all h-32"
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Category</label>
                    <select 
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none"
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Unit</label>
                    <select 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none"
                      value={productForm.unit}
                      onChange={(e) => setProductForm({...productForm, unit: e.target.value})}
                    >
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilogram</option>
                      <option value="gm">Gram</option>
                      <option value="ltr">Liter</option>
                      <option value="ml">Milliliter</option>
                      <option value="box">Box</option>
                      <option value="pack">Pack</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Product Images</label>
                    
                    {/* Existing Images */}
                    {selectedProduct && selectedProduct.images && selectedProduct.images.length > 0 && (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                            {selectedProduct.images.map((img, idx) => (
                                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-gray-100 relative group">
                                    <img src={img.image} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-[8px] font-bold">EXISTING</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* New Previews */}
                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                            {previewUrls.map((url, idx) => (
                                <div key={idx} className="aspect-square rounded-xl overflow-hidden border-2 border-blue-100 relative shadow-lg shadow-blue-600/10">
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute top-1 right-1">
                                        <span className="bg-blue-600 text-white text-[8px] px-2 py-0.5 rounded-full font-bold">NEW</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="relative group">
                        <input 
                            type="file" 
                            multiple
                            accept="image/*"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <label 
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-32 px-6 py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group"
                        >
                            <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-300 group-hover:text-blue-500 transition-colors mb-2"></i>
                            <p className="text-sm font-bold text-gray-400 group-hover:text-blue-600">Click to upload new images</p>
                            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1">PNG, JPG or WEBP (MAX. 2MB)</p>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Barcode</label>
                        <input 
                        type="text" 
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                        value={productForm.global_code}
                        onChange={(e) => setProductForm({...productForm, global_code: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Low Stock Threshold</label>
                        <input 
                        type="number" 
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                        value={productForm.low_stock_threshold}
                        onChange={(e) => setProductForm({...productForm, low_stock_threshold: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button 
                    type="button"
                    disabled={isSaving}
                    onClick={() => setShowProductModal(false)}
                    className="flex-grow py-5 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex-grow py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center gap-3"
                  >
                    {isSaving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            SAVING...
                        </>
                    ) : (
                        selectedProduct ? 'SAVE CHANGES' : 'CREATE PRODUCT'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManagerDashboard;
