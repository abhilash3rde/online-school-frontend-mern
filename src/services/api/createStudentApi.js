import { baseUrl } from "../Constants";

export const createStudentApi = bodyString => {
  return fetch(`${baseUrl}/users/createstudent`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
