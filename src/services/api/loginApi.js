import { baseUrl } from "../Constants";

export const loginApi = bodyString => {
  return fetch(`${baseUrl}/users/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
