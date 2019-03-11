import { baseUrl } from "../Constants";

// return fetch(`${baseUrl}/programs/lesson/fetchlesson`, {
export const getAllLessons = () => {
  return fetch(`${baseUrl}/programs/lesson/fetchall`, {
    method: "GET",
    mode: "cors"
  });
};
