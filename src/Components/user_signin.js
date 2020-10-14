import React,{useState,useEffect} from 'react';
import axios from "axios";

function UserSignIn(props) {
  const [values,setValues] = useState({
    email:"",
    password:'',
    server_error:""
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



  const signInUser = (e) =>{
    e.preventDefault()
    let old_user = {
      name:values.email,
      password:values.password
    }
    axios.post(`${hostname}/users/signin`,old_user)
      .then(res=>{console.log(res.data)
              setValues({
                  ...values,email:"",password:"",server_error:""
              });

              if(typeof window !== "undefined"){
              localStorage.setItem("signed_user",JSON.stringify(res.data))

              }
              props.setUser("ok")

              

      })
      .catch(err=>{
        if(err.response){
          console.log(err.response.data.error)
          setValues({...values,server_error:err.response.data.error})
          // return;
        }
      })

      console.log("complete")


  }

 
   
    


      
  
  useEffect(()=>{
  
  },[])




  return (
    <React.Fragment>
      {values.server_error && <h4>{values.server_error}</h4>}
      <form onSubmit={signInUser}>
        
        <input  type="text" placeholder = "email" value={values.email} onChange={(e)=>changeHandler(e,"email")}/>
        <input  type="password" placeholder = "password " value={values.password} onChange={(e)=>changeHandler(e,"password")}/>
        <input type="submit" value="SignIn"/>



      
      </form>

      
    </React.Fragment>
  );
}

export default UserSignIn;
