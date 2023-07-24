import axios from "axios";

const user_url = "api/users";

export async function getUsers() {
  return new Promise((resolve, reject) => {
    axios.get(user_url).then((response) => {
      if (response) {
        resolve(response.data);
      } else {
        reject(response.data.error);
      }
    });
  });
}

export function updateUser(data, id, preferences) {
  data.preferences = preferences;
  console.log("Data:", data);
  return new Promise((resolve, reject) => {
    axios.put(user_url + "/" + id, data).then((response) => {
      console.log("Response:", response);
      if (response) {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  });
}

export function createUser(data) {
  return new Promise((resolve, reject) => {
    axios.post(user_url, data).then((response) => {
      if (response) {
        resolve(response.data);
      } else {
        reject(response.data.error);
      }
    });
  });
}

export function deleteUser(id) {
  return new Promise((resolve, reject) => {
    axios.delete(user_url + "/" + id).then((response) => {
      if (response.data.status == "success") {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  });
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    axios.get("api/auth/user").then((response) => {
      if (response) {
        resolve(response.data);
      } else {
        reject(response.data.error);
      }
    });
  });
}
