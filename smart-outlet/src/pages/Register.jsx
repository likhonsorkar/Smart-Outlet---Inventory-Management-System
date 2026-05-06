import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("password", "");

  const onSubmit = (data) => {
    console.log('Registration Data:', data);
    alert('Registration successful! Check console for data.');
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

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.fullName.message}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
              placeholder="example@mail.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.email.message}</p>}
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
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-600/20 active:scale-[0.98]"
            >
              CREATE MY ACCOUNT
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
