export const getUserLogin = () => localStorage.getItem("login");

export const getUserId = () => Number(localStorage.getItem("user-id"));

export const getAccessToken = () => localStorage.getItem("access-token");

export const getRefreshToken = () => localStorage.getItem("refresh-token");

export const getUserRole = () => localStorage.getItem("role");

export const getUserFacultyId = () =>
  Number(localStorage.getItem("faculty-id"));
