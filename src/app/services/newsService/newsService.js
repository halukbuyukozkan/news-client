import axios from "axios";

const news_url = "api/news";

export async function getNews() {
  return new Promise((resolve, reject) => {
    axios.get(news_url).then((response) => {
      if (response) {
        resolve(response.data);
      } else {
        reject(response.data.error);
      }
    });
  });
}
