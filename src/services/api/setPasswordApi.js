import { baseUrl } from "../Constants";

export const setPasswordApi = (bodyString, token) => {
  return fetch(`${baseUrl}/users/setpassword/${token}`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
