import React from 'react';

import axios from 'axios'


// in .env file  
// REACT_APP_PORT = 4001
// REACT_APP_PRODUCTION = development
// PORT = 4001  // in server file 


let PORT = process.env.REACT_APP_PORT || 5000
console.log(process.env)

console.log("ppoort",PORT)

let hostname;
if (process.env.NODE_ENV === "development"){
  hostname=`http://localhost:${PORT}`

}
else{
  hostname="";
}

console.log("hostname",hostname)
console.log(process.env)
// console.log("hos",hostname)
// console.log("key",process.env.REACT_APP_PRODUNCTIO)


let prod = process.env.PRODUCTION
if(prod){
  console.log("production is true")
}

function App() {
  function second(){
    // this wont work cause heroku don't have local host 
    axios.get("http://localhost:5000/second/hello")
      .then(res=>{
        console.log(res.data);
      })
      .catch(error=>console.log("second error"))
  }
  function toback(){
    // working !! hero don't have localhost
   axios.get('/first')
          .then(res=>{
              console.log(res.data)
              
                })
          .catch(error=>console.log("an error has occured-first"));
  }
  function fuck(){
   axios.get(`${hostname}/fuck`)
          .then(res=>{
              console.log(res.data)
              
                })
          .catch(error=>console.log("an error in fuck"));
  }
 
  return (
    <div>
      Fetch data from backend
        <button onClick={toback}>first axios</button>
        <button onClick={fuck}>fuck</button>

        <button onClick={second}>second via route axios</button>


    </div>
  );
}

export default App;
