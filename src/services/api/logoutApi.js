import { baseUrl } from "../Constants";

export const logoutApi = () => {
  return fetch(`${baseUrl}/users/logout`, {
    method: "GET",
    mode: "cors"
  });
};
