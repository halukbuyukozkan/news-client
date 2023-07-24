import axios from "axios";

const package_url = "api/packages";

export async function getPackages() {
  return new Promise((resolve, reject) => {
    axios.get(package_url).then((response) => {
      if (response) {
        console.log(response.data);
        resolve(response.data);
      } else {
        reject(response.data.error);
      }
    });
  });
}

export function updatePackage(data, id) {
  return new Promise((resolve, reject) => {
    axios.put(package_url + "/" + id, data).then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  });
}

export function deletePackage(id) {
  return new Promise((resolve, reject) => {
    axios.delete(package_url + "/" + id).then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  });
}

export function createPackage(data) {
  return new Promise((resolve, reject) => {
    axios.post(package_url, data).then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  });
}
