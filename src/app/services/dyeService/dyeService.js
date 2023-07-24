import axios from "axios";

const dye_url = 'api/dyes';

export async function getDyes(){
    return new Promise((resolve, reject) => {
        axios.get(dye_url).then((response) => {
          if (response) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export  function updateDye(data , id){
  return new Promise((resolve, reject) => {
       axios.put(dye_url+"/"+id , data).then((response) => {
          if(response.data.status == "success"){
            resolve(response.data);
          }else{
            reject(response)
          }

      })
    });
}

export  function deleteDye(id){
    return new Promise((resolve, reject) => {
         axios.delete(dye_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }