import api from "./serverData"

//Get all the profiles for the given logged in user
export const getAllProfiles = async () => await api.get("/profiles");

//Get single profile with given id
export const getSingleProfile = async (id) =>
  await api.get(`/profiles/${id}`);

//Post request to create a new profile
export const createProfile = async (profileData) =>
  await api.post("/profiles", profileData);

//DELETE request to delete a profile
export const deleteProfile = async (profileId) =>
  await api.delete(`/profiles/${profileId}`);

//DELETE request to delete a link with given id
export const deleteLink = async (linkId) =>
  await api.delete(`/profiles/links/${linkId}`);

//PUT request to update a profile with given id
export const updateProfile = async (profileId, profileData) =>
  await api.put(`/profiles/${profileId}`, profileData);
