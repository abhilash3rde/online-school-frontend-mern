import { baseUrl } from "../Constants";

export const getPasswordApi = bodyString => {
  return fetch(`${baseUrl}/users/view`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
