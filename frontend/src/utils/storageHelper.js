const keyToken = "profilerUser";

//Save the user in local storage
export const saveUser = (user) => {
  localStorage.setItem(keyToken, JSON.stringify(user));
};

//Load the user from the local storage & return it
export const loadUser = () => JSON.parse(localStorage.getItem(keyToken));

//Delete the user from the local storage
export const deleteUser = () => localStorage.removeItem(keyToken);
