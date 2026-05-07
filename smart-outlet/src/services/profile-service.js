import apiClient from "./api-client";

const getProfile = async () => {
  const response = await apiClient.get("/v1/api/profile/me/");
  return response.data;
};

const updateProfile = async (profileData) => {
  // Use FormData for profile image upload if needed
  const formData = new FormData();
  
  if (profileData.first_name) formData.append("first_name", profileData.first_name);
  if (profileData.last_name) formData.append("last_name", profileData.last_name);
  if (profileData.address) formData.append("address", profileData.address);
  if (profileData.phone_number) formData.append("phone_number", profileData.phone_number);
  
  if (profileData.profile) {
    if (profileData.profile.bio) formData.append("profile.bio", profileData.profile.bio);
    if (profileData.profile.gender) formData.append("profile.gender", profileData.profile.gender);
    if (profileData.profile.date_of_birth) formData.append("profile.date_of_birth", profileData.profile.date_of_birth);
    if (profileData.profile_image instanceof File) {
      formData.append("profile.profile_image", profileData.profile_image);
    }
  }

  const response = await apiClient.patch("/v1/api/profile/me/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default {
  getProfile,
  updateProfile,
};
