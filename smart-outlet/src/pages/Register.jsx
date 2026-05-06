import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');
    try {
      const registrationData = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: `${data.countryCode}${data.mobile}`,
        password: data.password,
      };

      await authService.registerUser(registrationData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error);
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'object') {
          const firstKey = Object.keys(data)[0];
          setApiError(`${firstKey}: ${data[firstKey]}`);
        } else {
          setApiError('Registration failed. Please try again.');
        }
      } else {
        setApiError('Registration failed. Please try again.');
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
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF] pt-28 pb-12 px-6">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-10 border border-gray-100">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Join our community</span>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ACCOUNT</span></h2>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold text-center capitalize">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">First Name</label>
            <input
              type="text"
              {...register("first_name", { required: "First name is required" })}
              className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.first_name ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
              placeholder="First Name"
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.first_name.message}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Last Name</label>
            <input
              type="text"
              {...register("last_name", { required: "Last name is required" })}
              className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.last_name ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
              placeholder="Last Name"
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.last_name.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Mobile Number</label>
            <div className="flex gap-3">
              <select
                {...register("countryCode")}
                className="w-32 px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-gray-700"
              >
                {countryCodes.map(c => (
                  <option key={c.code} value={c.code}>{c.country} ({c.code})</option>
                ))}
              </select>
              <input
                type="tel"
                {...register("mobile", { 
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Digits only"
                  }
                })}
                className={`flex-grow px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.mobile ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
                placeholder="1234567890"
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.mobile.message}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <input
              type="password"
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" }
              })}
              className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.password.message}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { 
                required: "Please confirm password",
                validate: value => value === password || "Passwords do not match"
              })}
              className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.confirmPassword.message}</p>}
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-600/20 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE MY ACCOUNT'}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-600 font-bold">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-indigo-600 transition-colors">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
