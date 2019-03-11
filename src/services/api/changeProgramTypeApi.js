import { baseUrl } from "../Constants";

export const changeProgramTypeApi = (title, type) => {
  return fetch(`${baseUrl}/programs/changetype`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      type
    })
  });
};
