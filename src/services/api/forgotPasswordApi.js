import { baseUrl } from "../Constants";

export const forgotPasswordApi = bodyString => {
  return fetch(`${baseUrl}/users/forgotpassword/token`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyString)
  });
};
