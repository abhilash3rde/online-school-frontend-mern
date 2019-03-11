import { baseUrl } from "../Constants";

export const editStudentApi = bodyString => {
  return fetch(`${baseUrl}/users/students/edit`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
