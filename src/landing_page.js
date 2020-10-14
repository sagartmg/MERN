import React,{useState} from 'react';

import UserSignUp from './Components/user_signup'
import UserSignIn from './Components/user_signin'

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
 console.log("localStorage_data",localStorage_data)

  return (
    <React.Fragment>
    <h1>LandingPage
    </h1>
    <p onClick={userSignOut}> signout</p>
     {!localStorage_data && <UserSignUp  />}
     {!localStorage_data && <UserSignIn setUser={setUser}/>}


      
    </React.Fragment>
  );
}

export default LandingPage;
