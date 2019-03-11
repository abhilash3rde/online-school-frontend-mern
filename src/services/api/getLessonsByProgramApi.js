import { baseUrl } from "../Constants";

export const getLessonsByProgramApi = title => {
  return fetch(`${baseUrl}/programs/getlessons`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title
    })
  });
};
