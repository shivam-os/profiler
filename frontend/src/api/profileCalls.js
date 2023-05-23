import api from "./serverData";

// let token = null;

// //Set token in the token variable
// export const setToken = (newToken) => (token = newToken);

// //Add the token in the authorization header
// const setAuthHeader = () => {
//   return {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   };
// };

//Get all the profiles for the given logged in user
export const getAllProfiles = async () => {
  const response = await api.get("/profiles");
  return response;
};

//Get single profile with given id
export const getSingleProfile = async (id) => {
  const response = await api.get(`/profiles/${id}`);
  return response;
};

//Post request to create a new profile
export const createProfile = async (profileData) => {
  const response = await api.post("/profiles", profileData);
  return response;
};

//DELETE request to delete a profile
export const deleteProfile = async (profileId) => {
  const response = await api.delete(`/profiles/${profileId}`);
  return response;
};

//DELETE request to delete a link with given id
export const deleteLink = async (linkId) => {
  const response = await api.delete(`/profiles/links/${linkId}`);
  return response;
};

//PUT request to update a profile with given id
export const updateProfile = async (profileId, profileData) => {
  const response = await api.put(`/profiles/${profileId}`, profileData);
  return response;
};
