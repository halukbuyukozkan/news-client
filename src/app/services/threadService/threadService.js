import axios from "axios";

const thread_url = 'api/threads';

export async function getThreads(){
    return new Promise((resolve, reject) => {
        axios.get(thread_url).then((response) => {
          if (response) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
      });
}

export  function deleteThread(id){
    return new Promise((resolve, reject) => {
         axios.delete(thread_url+"/"+id).then((response) => {
            if(response.data.status == "success"){
              resolve(response.data);
            }else{
              reject(response)
            }
  
        })
      });
  }