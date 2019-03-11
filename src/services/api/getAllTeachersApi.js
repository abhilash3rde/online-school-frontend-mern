import { baseUrl } from "../Constants";

export const getAllTeachersApi = () => {
  return fetch(`${baseUrl}/users/getallteachers`, {
    method: "GET",
    mode: "cors"
  });
};
