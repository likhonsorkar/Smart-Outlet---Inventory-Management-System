import apiClient from "./api-client";

const getProfile = async () => {
  const response = await apiClient.get("/v1/api/profile/me/");
  return response.data;
};

const updateProfile = async (profileData) => {
  const formData = new FormData();
  
  if (profileData.first_name !== undefined) formData.append("first_name", profileData.first_name);
  if (profileData.last_name !== undefined) formData.append("last_name", profileData.last_name);
  if (profileData.address !== undefined) formData.append("address", profileData.address);
  if (profileData.phone_number !== undefined) formData.append("phone_number", profileData.phone_number);
  
  if (profileData.profile) {
    if (profileData.profile.bio !== undefined) formData.append("profile.bio", profileData.profile.bio);
    if (profileData.profile.gender !== undefined) formData.append("profile.gender", profileData.profile.gender);
    if (profileData.profile.date_of_birth !== undefined) formData.append("profile.date_of_birth", profileData.profile.date_of_birth);
  }

  // Handle profile image if it's at the root or nested
  const image = profileData.profile_image || (profileData.profile && profileData.profile.profile_image);
  if (image instanceof File) {
    formData.append("profile.profile_image", image);
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
