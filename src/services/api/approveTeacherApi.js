import { baseUrl } from "../Constants";

export const approveTeacherApi = bodyString => {
  return fetch(`${baseUrl}/users/permissions/approve`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
