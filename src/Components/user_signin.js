import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import {authenticate} from './authenticate'
// import LandingPage from '../landing_page'

function UserSignIn(props) {
  const [values,setValues] = useState({
    email:"",
    password:'',
    server_error:"",
    redirect:false,
  })
  const [local ,setLocal] = useState(11);

  let local_logged_user = JSON.parse( window.localStorage.getItem("signed_user"));


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

  // console.log(props.location.setUser)
  useEffect(()=>{

  //      if(props.location.setUser){
  //   console.log("setuser")
  // console.log(props.location.setUser.setUser)
  // props.location.setUser.setUser("somedata")

    // props.location.setUser("onload")

  // }


  },[])
 


   const signInUser = (e) =>{
    e.preventDefault()
    let old_user = {
      name:values.email,
      password:values.password
    }
    // setValues({...values,server_error:"dummytorefresh"})


     axios.post(`${hostname}/users/signin`,old_user)
      .then(res=>{console.log(res.data)
              setValues({
                  ...values,email:"",password:"",server_error:"",redirect:true
              });

              if(typeof window !== "undefined"){
              localStorage.setItem("signed_user",JSON.stringify(res.data))

              }



              // props.location.setUser.setuser("ok")

              

      })
      .catch(err=>{
        if(err.response){
          console.log(err.response.data.error)
          setValues({...values,server_error:err.response.data.error})
          // return;
        }
      })

  }
  function getLocalData(){
    console.log("getlocaldata")
    let data = localStorage.getItem("signed_user");

    if(data){
       return JSON.parse(data);


    }
    else{
      return false;
    }
  }

//   function redirectUser(){
//     console.log("redirect user")
//     console.log(getLocalData())

//     if(getLocalData()){
    
//       console.log("loca inside")
//       if(getLocalData().user.role===0){
//         // return <Redirect to="/dashboard"/>
//         return <p>done 0</p>
//       }
//       if(getLocalData().user.role===1){
//         // return <Redirect to="/dashboard/admin"/>
//         return <p>done 1</p>
      
//       }

//     };
//     return <p>redirectUser</p>;

//   }
//   }
// }

 function getLocal(){
   return JSON.parse(localStorage.getItem("signed_user"));
}


 function another() {
   if(values.redirect) {
    authenticate();
     let data = getLocal();
     console.log(data);
     if(data?.user && data?.user.role==0){
      return <Redirect to="dashboard"/>
     }
     else return false;
    
  }
}
  // useEffect(()=>{
  //     console.log("mounded render")
  // })
  console.log("render")


  // useEffect(()=>{
  //     console.log("mounded render")

  //   let dataa = window.localStorage.getItem("signed_user");
    
  //   // if(dataa){
  //     // alert("data cnageding now ")

     
  //   // setTimeout(()=>{
  //   setLocal(dataa)


  //   // },1000)
  // // }

  // },[values.redirect])

  console.log("getlocal",getLocal())
  // setLocal(local+1)
  console.log("local",local)

  // incase of setting dat to local storage we donot get the object instantly
  // becuase axios is asynchronous, we set locally a little late while rendering component we are asking localstorage data instantly and getting null.cause a need of one more render. 
    useEffect(()=>{
    // let dataa = window.localStorage.getItem("signed_user");

      // console.log("mounded render")
      setLocal(getLocal())


  },[values.redirect]);
 

 

  return (
    <React.Fragment>
      {/* <LandingPage/> */}
      {values.server_error && <h4>{values.server_error}</h4>}
      <form onSubmit={signInUser}>
        
        <input  type="text" placeholder = "email" value={values.email} onChange={(e)=>changeHandler(e,"email")}/>
        <input  type="password" placeholder = "password " value={values.password} onChange={(e)=>changeHandler(e,"password")}/>
        <input type="submit" value="SignIn"/>



      
      </form>
    {/* 
      {another()}


     */}

      {local_logged_user && <Redirect to="dashboard"/>}


      
    </React.Fragment>
  );
}

export default UserSignIn;
