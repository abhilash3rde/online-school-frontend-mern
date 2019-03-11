import { baseUrl } from "../Constants";

export const changePlan = (plan = "Free plan", bodyString) => {
  return fetch(`${baseUrl}/users/students/changeplan`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: bodyString,
      plan: plan
    })
  });
};
