import { baseUrl } from "../Constants";

export const changeRole = (role = "teacher", bodyString) => {
  return fetch(`${baseUrl}/users/edit/role/${role}`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: bodyString
    })
  });
};
