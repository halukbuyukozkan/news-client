import axios from "axios";

const company_url = 'api/companies';

export async function getCompanies(){
    return new Promise((resolve, reject) => {
        axios.get(company_url).then((response) => {
          if (response) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export  function deleteCompany(id){
    return new Promise((resolve, reject) => {
         axios.delete(company_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }