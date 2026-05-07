import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          const dashboardMap = {
            admin: '/dashboard/admin',
            manager: '/dashboard/manager',
            customer: '/dashboard/customer',
            outlet_manager: '/dashboard/manager',
          };
          navigate(dashboardMap[user.role] || '/dashboard/customer');
        } catch (error) {
          // Token might be invalid, stay on login
        }
      }
    };
    checkUser();
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');
    try {
      const credentials = {
        phone_number: `${data.countryCode}${data.mobile}`,
        password: data.password,
        remember_me: data.rememberMe || false,
      };
      const response = await authService.loginUser(credentials);
      // Fetch user data to get the role
      const user = await authService.getCurrentUser();
      const dashboardMap = {
        admin: '/dashboard/admin',
        manager: '/dashboard/manager',
        customer: '/dashboard/customer',
        outlet_manager: '/dashboard/manager',
      };
      navigate(dashboardMap[user.role] || '/dashboard/customer');    } catch (error) {
      console.error('Login Error:', error);
      if (error.response?.data?.detail) {
        setApiError(error.response.data.detail);
      } else if (error.response?.status === 401) {
        setApiError('Invalid phone number or password.');
      } else {
        setApiError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const countryCodes = [
    { code: '+880', country: 'BD' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+971', country: 'UAE' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF] pt-24 pb-12 px-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-10 border border-gray-100">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Welcome Back</span>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">MEMBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">LOGIN</span></h2>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold text-center">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Mobile Number</label>
            <div className="flex gap-2">
              <select
                {...register("countryCode")}
                className="w-24 px-2 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-gray-700 text-sm"
              >
                {countryCodes.map(c => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="tel"
                  {...register("mobile", { 
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Digits only"
                    }
                  })}
                  className={`w-full pl-11 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.mobile ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
                  placeholder="1234567890"
                />
              </div>
            </div>
            {errors.mobile && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.mobile.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full pl-11 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between ml-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                {...register("rememberMe")}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
              />
              <span className="text-sm font-bold text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm font-bold text-blue-600 hover:text-indigo-600 transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-600/20 active:scale-[0.98] mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN TO ACCOUNT'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-600 font-bold">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-indigo-600 transition-colors">Create one now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
