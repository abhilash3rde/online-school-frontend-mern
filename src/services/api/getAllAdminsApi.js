import { baseUrl } from "../Constants";

export const getAllAdminsApi = () => {
  return fetch(`${baseUrl}/users/getalladmins`, {
    method: "GET",
    mode: "cors"
  });
};
