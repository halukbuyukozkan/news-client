import axios from "axios";

const product_url = "api/products";

export async function updateProduct(data, id) {
  return new Promise((resolve, reject) => {
    axios.put(product_url + "/" + id, data).then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  });
}

export async function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    axios.delete(product_url + "/" + id).then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  });
}
