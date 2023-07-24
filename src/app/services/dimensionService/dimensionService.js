import axios from "axios";

const dimension_url = 'api/dimensions';

export async function getDimensions(){
    return new Promise((resolve, reject) => {
        axios.get(dimension_url).then((response) => {
          if (response) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export  function deleteDimension(id){
    return new Promise((resolve, reject) => {
         axios.delete(dimension_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }