import { baseUrl } from "../Constants";
export const getTaskByTitleApi = title => {
  return fetch(`${baseUrl}/tasks/getbytitle`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title
    })
  });
};
