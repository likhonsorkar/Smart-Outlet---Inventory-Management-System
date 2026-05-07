import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import profileService from '../services/profile-service';

const ProfileSettings = ({ role }) => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    profile: {
      bio: '',
      gender: '',
      date_of_birth: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage({ type: 'error', text: 'Failed to load profile' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const field = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          [field]: value
        }
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const updateData = { ...profile };
      if (imageFile) {
        updateData.profile_image = imageFile;
      }
      await profileService.updateProfile(updateData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role={role}>
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role}>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-50'>
          <h2 className='text-3xl font-black text-gray-900 tracking-tighter mb-8'>
            Profile <span className='text-blue-600'>Settings</span>
          </h2>

          {message.text && (
            <div className='p-4 rounded-2xl mb-8 font-bold '>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-8'>
            <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
              <div className='relative group'>
                <div className='w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg'>
                  {imageFile ? (
                    <img src={URL.createObjectURL(imageFile)} alt='Preview' className='w-full h-full object-cover' />
                  ) : profile.profile?.profile_image ? (
                    <img src={profile.profile.profile_image} alt='Profile' className='w-full h-full object-cover' />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-300 text-4xl'>
                      <i className='fa-solid fa-user'></i>
                    </div>
                  )}
                </div>
                <label className='absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-all'>
                  <i className='fa-solid fa-camera'></i>
                  <input type='file' className='hidden' onChange={handleImageChange} accept='image/*' />
                </label>
              </div>

              <div className='flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                <div>
                  <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>First Name</label>
                  <input
                    type='text'
                    name='first_name'
                    value={profile.first_name || ''}
                    onChange={handleChange}
                    className='w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-gray-900'
                  />
                </div>
                <div>
                  <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Last Name</label>
                  <input
                    type='text'
                    name='last_name'
                    value={profile.last_name || ''}
                    onChange={handleChange}
                    className='w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-gray-900'
                  />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Phone Number</label>
                <input
                  type='text'
                  name='phone_number'
                  value={profile.phone_number || ''}
                  onChange={handleChange}
                  className='w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-gray-900'
                />
              </div>
              <div>
                <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Email (Read-only)</label>
                <input
                  type='email'
                  value={profile.email || ''}
                  disabled
                  className='w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-400 cursor-not-allowed'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Address</label>
              <textarea
                name='address'
                value={profile.address || ''}
                onChange={handleChange}
                rows='3'
                className='w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-gray-900 resize-none'
              ></textarea>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Gender</label>
                <select
                  name='profile.gender'
                  value={profile.profile?.gender || ''}
                  onChange={handleChange}
                  className='w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-gray-900'
                >
                  <option value=''>Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>
              <div>
                <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Date of Birth</label>
                <input
                  type='date'
                  name='profile.date_of_birth'
                  value={profile.profile?.date_of_birth || ''}
                  onChange={handleChange}
                  className='w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-gray-900'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Bio</label>
              <textarea
                name='profile.bio'
                value={profile.profile?.bio || ''}
                onChange={handleChange}
                rows='4'
                className='w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-gray-900 resize-none'
              ></textarea>
            </div>

            <div className='flex justify-end pt-8'>
              <button
                type='submit'
                disabled={saving}
                className='px-12 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50'
              >
                {saving ? 'SAVING...' : 'SAVE CHANGES'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings;

