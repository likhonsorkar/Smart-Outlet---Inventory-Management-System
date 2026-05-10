import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import goodsService from '../services/goods-service';
import categoryService from '../services/category-service';

const ProductStockManagement = ({ role }) => {
  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  
  const [stockForm, setStockForm] = useState({
    goods: '',
    batch_no: '',
    quantity: 0,
    purchase_price: 0,
    selling_price: 0,
    manufacture_date: '',
    expiry_date: '',
    status: 'received',
    note: ''
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

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (selectedBatch) {
        await goodsService.updateBatch(selectedBatch.id, stockForm);
      } else {
        await goodsService.createBatch({ ...stockForm, goods: selectedProduct.id });
      }
      setShowStockModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving stock:", error);
    } finally {
        setIsSaving(false);
    }
  };

  const openStockModal = (product, batch = null) => {
    setSelectedProduct(product);
    setSelectedBatch(batch);
    if (batch) {
      setStockForm({
        goods: product.id,
        batch_no: batch.batch_no,
        quantity: batch.quantity,
        purchase_price: batch.purchase_price,
        selling_price: batch.selling_price,
        manufacture_date: batch.manufacture_date || '',
        expiry_date: batch.expiry_date || '',
        status: batch.status,
        note: batch.note || ''
      });
    } else {
      setStockForm({
        goods: product.id,
        batch_no: `BTCH-${Date.now()}`,
        quantity: 0,
        purchase_price: 0,
        selling_price: 0,
        manufacture_date: '',
        expiry_date: '',
        status: 'received',
        note: ''
      });
    }
    setShowStockModal(true);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <DashboardLayout role={role}>
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
            INVENTORY <span className="text-blue-600">MANAGEMENT</span>
          </h2>
          <p className="text-gray-500 font-bold mt-2">Track batches, stock levels, and detailed product history.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Product Info</th>
                    <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Current Stock</th>
                    <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Category</th>
                    <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {goods.map((product) => (
                    <React.Fragment key={product.id}>
                      <tr className={`group hover:bg-gray-50/50 transition-all cursor-pointer ${expandedId === product.id ? 'bg-blue-50/30' : ''}`} onClick={() => toggleExpand(product.id)}>
                        <td className="py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-blue-600 overflow-hidden">
                              {product.images && product.images.length > 0 ? (
                                  <img src={product.images[0].image} alt="" className="w-full h-full object-cover" />
                              ) : (
                                  <i className="fa-solid fa-box-open text-lg"></i>
                              )}
                            </div>
                            <div>
                              <p className="font-black text-gray-900 leading-tight">{product.name}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.brand || 'No Brand'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6">
                          <div className="flex flex-col gap-1">
                            <span className={`text-sm font-black ${product.total_stock <= product.low_stock_threshold ? 'text-red-600' : 'text-green-600'}`}>
                              {product.total_stock} {product.unit}
                            </span>
                            {product.total_stock <= product.low_stock_threshold && (
                              <span className="text-[8px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full w-fit font-black uppercase tracking-tighter">Low Stock</span>
                            )}
                          </div>
                        </td>
                        <td className="py-6 font-bold text-gray-500 uppercase text-xs">{product.category_name}</td>
                        <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button 
                              onClick={(e) => { e.stopPropagation(); openStockModal(product); }}
                              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-black text-[10px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                            >
                              ADD STOCK
                            </button>
                            <i className={`fa-solid fa-chevron-${expandedId === product.id ? 'up' : 'down'} text-gray-300 transition-all`}></i>
                          </div>
                        </td>
                      </tr>
                      {expandedId === product.id && (
                        <tr>
                          <td colSpan="4" className="bg-gray-50/50 p-8">
                            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                                    <div className="space-y-4">
                                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</h5>
                                        <p className="text-sm font-bold text-gray-600 leading-relaxed">{product.description || 'No description available.'}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Details</h5>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[8px] font-black text-gray-300 uppercase">Barcode (Global)</p>
                                                <p className="text-xs font-black text-gray-900">{product.global_code || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-gray-300 uppercase">Barcode (Local)</p>
                                                <p className="text-xs font-black text-gray-900">{product.local_code || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-gray-300 uppercase">Threshold</p>
                                                <p className="text-xs font-black text-gray-900">{product.low_stock_threshold} {product.unit}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-gray-300 uppercase">Status</p>
                                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${product.is_active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {product.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Actions</h5>
                                        <div className="flex flex-wrap gap-2">
                                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                                                <i className="fa-solid fa-barcode"></i> Print Barcodes
                                            </button>
                                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                                                <i className="fa-solid fa-file-export"></i> Stock Report
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-sm font-black text-gray-900 uppercase tracking-tight">Batch History</h5>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">{product.batches?.length || 0} Batches found</span>
                                    </div>
                                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="p-4 font-black text-gray-400 uppercase text-[8px]">Batch No</th>
                                                    <th className="p-4 font-black text-gray-400 uppercase text-[8px]">Qty (Rem)</th>
                                                    <th className="p-4 font-black text-gray-400 uppercase text-[8px]">Prices (P/S)</th>
                                                    <th className="p-4 font-black text-gray-400 uppercase text-[8px]">Exp. Date</th>
                                                    <th className="p-4 font-black text-gray-400 uppercase text-[8px]">Status</th>
                                                    <th className="p-4 font-black text-gray-400 uppercase text-[8px] text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {product.batches && product.batches.length > 0 ? product.batches.map(batch => (
                                                    <tr key={batch.id} className="hover:bg-gray-50 transition-all">
                                                        <td className="p-4 text-xs font-black text-gray-900">{batch.batch_no}</td>
                                                        <td className="p-4 text-xs font-bold text-gray-600">{batch.quantity} <span className="text-gray-400">({batch.remaining_quantity})</span></td>
                                                        <td className="p-4 text-xs font-black text-blue-600">${batch.purchase_price} <span className="text-gray-300 font-bold mx-1">/</span> ${batch.selling_price}</td>
                                                        <td className="p-4 text-xs font-bold text-gray-500">{batch.expiry_date || 'None'}</td>
                                                        <td className="p-4">
                                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                                                                batch.status === 'received' ? 'bg-green-100 text-green-600' : 
                                                                batch.status === 'sent' ? 'bg-blue-100 text-blue-600' : 
                                                                batch.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                                {batch.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); openStockModal(product, batch); }}
                                                                className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center mx-auto lg:ml-auto"
                                                            >
                                                                <i className="fa-solid fa-pen text-[10px]"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="6" className="p-8 text-center">
                                                            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">No batch records found</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Stock Modal */}
      {showStockModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
                    {selectedBatch ? 'UPDATE' : 'ADD'} <span className="text-blue-600">STOCK</span>
                    </h3>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">FOR: {selectedProduct?.name}</p>
                </div>
                <button onClick={() => setShowStockModal(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <form onSubmit={handleStockSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Batch Number</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                      value={stockForm.batch_no}
                      onChange={(e) => setStockForm({...stockForm, batch_no: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Quantity ({selectedProduct?.unit})</label>
                    <input 
                      type="number" 
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                      value={stockForm.quantity}
                      onChange={(e) => setStockForm({...stockForm, quantity: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Purchase Price</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                      value={stockForm.purchase_price}
                      onChange={(e) => setStockForm({...stockForm, purchase_price: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Selling Price</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                      value={stockForm.selling_price}
                      onChange={(e) => setStockForm({...stockForm, selling_price: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Manufacture Date</label>
                    <input 
                      type="date" 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                      value={stockForm.manufacture_date}
                      onChange={(e) => setStockForm({...stockForm, manufacture_date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Expiry Date</label>
                    <input 
                      type="date" 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all"
                      value={stockForm.expiry_date}
                      onChange={(e) => setStockForm({...stockForm, expiry_date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Status</label>
                    <select 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none"
                      value={stockForm.status}
                      onChange={(e) => setStockForm({...stockForm, status: e.target.value})}
                    >
                      <option value="pending">Pending</option>
                      <option value="sent">Sent</option>
                      <option value="received">Received (Impacts Stock)</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="flex gap-4 pt-6">
                  <button 
                    type="button"
                    disabled={isSaving}
                    onClick={() => setShowStockModal(false)}
                    className="flex-grow py-5 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex-grow py-5 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 disabled:bg-gray-400 flex items-center justify-center gap-3"
                  >
                    {isSaving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            SAVING...
                        </>
                    ) : (
                        selectedBatch ? 'UPDATE BATCH' : 'ADD TO STOCK'
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

export default ProductStockManagement;
