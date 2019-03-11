import { baseUrl } from "../Constants";

export const declineTeacherApi = bodyString => {
  return fetch(`${baseUrl}/users/permissions/decline`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
