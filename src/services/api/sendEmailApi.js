import { baseUrl } from "../Constants";

export const sendEmailApi = bodyString => {
  return fetch(`${baseUrl}/users/token`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
