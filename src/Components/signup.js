import React,{useEffect} from 'react';
import axios from 'axios'
import '../Css/all_excercise.css'
function Signup() {

	let hostname;
	let PORT = process.env.REACT_APP_PORT || 5000;
	if(process.env.REACT_APP_PRODUCTION =="development"){
		hostname=`http://localhost:${PORT}`;
	}
	else{
		hostname = "";
	}
	

	function createUser(event){
		event.preventDefault();
		let new_user = {
			username:event.target.username.value,
			password:event.target.password.value
		}

		axios.post(`${hostname}/users/signup`,new_user)
			.then(res =>console.log("res",res.data))
			.catch(error=>console.log("err",error))





		event.target.reset();
	}



  return (
   <>
  	<p>all signup</p>
  	<form onSubmit={createUser}>
  		<input type="text" placeholder="username" name="username"/>
  		<input type="text" placeholder="password" name="password"/>
  		<input type="submit" value = "sign up"/>

  	</form>
 
   </>
  );
}

export default Signup;
