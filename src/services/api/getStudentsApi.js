import { baseUrl } from "../Constants";

export const getStudentsApi = bodyString => {
  return fetch(`${baseUrl}/users/getstudents`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
