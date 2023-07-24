import axios from "axios";

const border_url = 'api/borders';

export async function getBorders(){
    return new Promise((resolve, reject) => {
        axios.get(border_url).then((response) => {
          if (response) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export  function deleteBorder(id){
    return new Promise((resolve, reject) => {
         axios.delete(border_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }