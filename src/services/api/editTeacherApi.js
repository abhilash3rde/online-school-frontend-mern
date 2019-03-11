import { baseUrl } from "../Constants";

export const editTeacherApi = bodyString => {
  return fetch(`${baseUrl}/users/edit/teacher`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
