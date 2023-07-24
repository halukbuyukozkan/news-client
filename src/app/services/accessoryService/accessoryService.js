import axios from "axios";

const accessory_url = 'api/accessories';

export async function getAccessories(){
    return new Promise((resolve, reject) => {
        axios.get(accessory_url).then((response) => {
          if (response) {
            console.log('AKSESUARLAR',response.data);
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export  function updateAccessory(data , id){
  return new Promise((resolve, reject) => {
       axios.put(accessory_url+"/"+id , data).then((response) => {
          if(response.data.status == "success"){
            resolve(response.data);
          }else{
            reject(response)
          }

      })
    });
}

export  function deleteAccessory(id){
    return new Promise((resolve, reject) => {
         axios.delete(accessory_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }