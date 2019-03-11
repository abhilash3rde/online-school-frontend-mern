import { baseUrl } from "../Constants";

export const editParentApi = bodyString => {
  return fetch(`${baseUrl}/users/edit/parent`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
