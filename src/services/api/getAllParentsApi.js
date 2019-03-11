import { baseUrl } from "../Constants";

export const getAllParentsApi = () => {
  return fetch(`${baseUrl}/users/getallparents`, {
    method: "GET",
    mode: "cors"
  });
};
