import { baseUrl } from "../Constants";

export const changeLessonTypeApi = (title, type) => {
  return fetch(`${baseUrl}/programs/lesson/changetype`, {
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
