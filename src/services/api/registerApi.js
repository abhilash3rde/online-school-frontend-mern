import { baseUrl } from "../Constants";

export const registerApi = bodyString => {
  return fetch(`${baseUrl}/users/register`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
