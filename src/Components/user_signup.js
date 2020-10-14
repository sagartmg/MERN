import React,{useState,useEffect} from 'react';
import axios from "axios";

function UserSignUp() {
  const [values,setValues] = useState({
    name:'',
    email:"",
    password:''
  })

  function changeHandler(e,name){
    setValues({...values,[name]:e.target.value})
  }

  let hostname;
  if(process.env.NODE_ENV =="development"){
    hostname=process.env.REACT_APP_HOSTNAME;
  }
  else{
    hostname = ""
  }


  //higher order function ....a function that returns a funciton. 
  // encountered a problem where ohter open consonle prints everysingle time.
  //   caused becuase, we change state and it cause re-render of componet and so does teh console-log functions 
  const changeHandlerr = name => event =>{
    setValues({...values,[name]:event.target.value})
  }

  const signUpUser = (e) =>{
    e.preventDefault()
    let new_user = {
      name:values.name,
      email:values.email,
      password:values.password
    }
    axios.post(`${hostname}/users/signup`,new_user)
      .then(res=>console.log(res.data));
    e.target.reset();
    setValues({
    name:'',
    email:"",
    password:''
    })
  }
  
  useEffect(()=>{
    // console.log("useEffect mounted")
    console.log("hostname:",hostname);
    document.querySelector(".username").focus();
    console.log(process.env)
  },[])


  // function changeHandler2(name){  // this is immediately called
  //   return function ok(event){  // this aint immediately called and on change 
  //                               // this executes 
  //     console.log(name)
  //     console.log(event.target)
  //   }
  // }


  return (
    <React.Fragment>
      <form onSubmit={signUpUser}>
        {/*   ohter ways of doing the operation
        <input type="text" placeholder = "change " onChange={changeHandler2("change_name")}/>
        <input className="username" type="text" placeholder="username" onChange={changeHandlerr("name")}/>
         */}
        <input  className="username" type="text" placeholder = "username " onChange={(e)=>changeHandler(e,"name")}/>
        <input  type="email" placeholder = "email " onChange={(e)=>changeHandler(e,"email")}/>
        <input  type="password" placeholder = "password " onChange={(e)=>changeHandler(e,"password")}/>
        <input type="submit" value="signup"/>



      
      </form>

      
    </React.Fragment>
  );
}

export default UserSignUp;
