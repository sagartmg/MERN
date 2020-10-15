import React,{useState,useEffect} from 'react';

import UserSignUp from './Components/user_signup'
import UserSignIn from './Components/user_signin'
import {Link} from 'react-router-dom'

function LandingPage() {
  const[user ,setUser] = useState();

  function userSignOut(){
    if(typeof window !=="undefined"){
      localStorage.removeItem("signed_user")


    }
    setUser("singed_out");
    // history.push("/");
  }


 let localStorage_data = JSON.parse(localStorage.getItem("signed_user"));

 useEffect(()=>{
 console.log("localStorage_data",localStorage_data)
 localStorage_data?.user.role==0 &&  console.log("user is normal")
 })
  return (
    <React.Fragment>
    <h1>LandingPage
    </h1>
    {!localStorage_data && <Link to='/signup'>signup</Link>}
   {!localStorage_data && <Link to={{pathname:"/signin" ,setUser:{setUser}}}>signin</Link>}
    <Link to="/dashboard"> dashboard </Link>



    { localStorage_data && <p onClick={userSignOut}> signout</p>}
    {/* 
     {!localStorage_data && <UserSignUp  />}
     {!localStorage_data && <UserSignIn setUser={setUser}/>}
      */}


      
    </React.Fragment>
  );
}

export default LandingPage;
