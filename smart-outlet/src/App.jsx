import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import Banner from './components/Banner';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import { featuredProducts, popularProducts } from './data';

// Dashboards
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import OutletManagerDashboard from './pages/OutletManagerDashboard';
import ProfileSettings from './pages/ProfileSettings';
import CategoryManagement from './pages/CategoryManagement';
import ProductStockManagement from './pages/ProductStockManagement';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardRedirect from './pages/DashboardRedirect';

const HomePage = () => (
  <main className="flex-grow pt-24">
    {/* Hero Section */}
    <section className="px-4 mb-12">
      <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10">
        <HeroSlider />
      </div>
    </section>
    
    {/* Banner Section */}
    <Banner />

    {/* Featured Products */}
    <section className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Selected for you</span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">UNITS</span></h2>
        </div>
        <a href="#" className="group flex items-center gap-3 font-bold text-gray-900 hover:text-blue-600 transition-all">
          EXPLORE ALL 
          <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>

    {/* Popular Products */}
    <section className="py-24 relative overflow-hidden">
      {/* Background Detail */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-50 -z-10 skew-y-3 origin-right scale-110"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Trending Now</span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">MOST <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">POPULAR</span></h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <button className="bg-white border-2 border-gray-900 text-gray-900 px-12 py-4 rounded-2xl font-black hover:bg-gray-900 hover:text-white transition-all shadow-xl hover:shadow-gray-900/20 active:scale-95">
            LOAD MORE INNOVATIONS
          </button>
        </div>
      </div>
    </section>
  </main>
);

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {!isDashboard && <Header />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/dashboard/customer" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/profile" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <ProfileSettings role="customer" />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/products" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ProductStockManagement role="admin" />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/categories" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CategoryManagement role="admin" />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/profile" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ProfileSettings role="admin" />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/manager" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ManagerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/manager/inventory" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ProductStockManagement role="manager" />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/manager/categories" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <CategoryManagement role="manager" />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/manager/profile" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ProfileSettings role="manager" />
          </ProtectedRoute>
        } />

        {/* Outlet Manager Routes */}
        <Route path="/dashboard/outlet-manager" element={
          <ProtectedRoute allowedRoles={['outlet_manager']}>
            <OutletManagerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/outlet-manager/inventory" element={
          <ProtectedRoute allowedRoles={['outlet_manager']}>
            <ProductStockManagement role="outlet_manager" />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/outlet-manager/profile" element={
          <ProtectedRoute allowedRoles={['outlet_manager']}>
            <ProfileSettings role="outlet_manager" />
          </ProtectedRoute>
        } />
      </Routes>

      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
