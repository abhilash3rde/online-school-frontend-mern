import { baseUrl } from "../Constants";

export const getStudentPassword = bodyString => {
  return fetch(`${baseUrl}/users/student/view`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
