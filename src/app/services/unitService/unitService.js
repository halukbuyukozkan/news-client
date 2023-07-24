import axios from "axios";

const unit_url = 'api/units';

export async function getUnits(){
    return new Promise((resolve, reject) => {
        axios.get(unit_url).then((response) => {
          if (response) {
            console.log(response.data);
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export function createUnit(data){
  console.log('Unit Service'.data);
  return new Promise((resolve, reject) => {
        axios.post(unit_url, data).then((response) => {
          if(response){
            resolve(response.data);
          }else{
            reject(response.data.error);
          }
      });
    });
}

export  function deleteUnit(id){
    return new Promise((resolve, reject) => {
         axios.delete(unit_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }