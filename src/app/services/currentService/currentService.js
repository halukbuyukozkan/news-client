import axios from "axios";

const current_url = 'api/currents';

export async function getCurrents(){
    return new Promise((resolve, reject) => {
        axios.get(current_url).then((response) => {
          if (response) {
            console.log(response.data);
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export  function deleteCurrent(id){
    return new Promise((resolve, reject) => {
         axios.delete(current_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }