import axios from "axios";

const pattern_url = 'api/patterns';

export async function getPatterns(){
    return new Promise((resolve, reject) => {
        axios.get(pattern_url).then((response) => {
          if (response) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export  function deletePattern(id){
    return new Promise((resolve, reject) => {
         axios.delete(pattern_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }