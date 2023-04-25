import api from "./serverData";

let token = null;

//Set token in the token variable
const setToken = (newToken) => (token = newToken);

//Add the token in the authorization header
const setAuthHeader = () => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

//Get all the profiles for the given logged in user
const getAllProfiles = async () => {
  try {
    const response = await api.get("/profiles", setAuthHeader());
    return response.data
  } catch (err) {
    console.log(err)
  }
}

//
