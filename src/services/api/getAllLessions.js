import { baseUrl } from "../Constants";

export const getAllLessions = () => {
  return fetch(`${baseUrl}/programs/lesson/fetchlesson`, {
    method: "GET",
    mode: "cors"
  });
};
