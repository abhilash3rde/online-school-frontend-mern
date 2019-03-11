import { baseUrl } from "../Constants";

export const getAllProgramsApi = () => {
  return fetch(`${baseUrl}/programs/fetchall`, {
    method: "GET",
    mode: "cors"
  });
};
