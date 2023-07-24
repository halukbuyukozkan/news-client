import axios from "axios";

const preference_url = "api/preferences";

export async function getPreferences() {
  return new Promise((resolve, reject) => {
    axios.get(preference_url).then((response) => {
      if (response) {
        resolve(response.data);
      } else {
        reject(response.data.error);
      }
    });
  });
}
