import { baseUrl } from "../Constants";

export const editAdminApi = bodyString => {
  return fetch(`${baseUrl}/users/edit/admin`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
