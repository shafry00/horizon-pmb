export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};
