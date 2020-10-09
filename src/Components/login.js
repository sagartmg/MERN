import React,{useEffect} from 'react';
import axios from 'axios'
import '../Css/all_excercise.css'
function Login() {

	let hostname;
	let PORT = process.env.REACT_APP_PORT || 5000;
	if(process.env.REACT_APP_PRODUCTION =="development"){
		hostname=`http://localhost:${PORT}`;
	}
	else{
		hostname = "";
	}
	console.log(process.env)
	console.log(hostname)


	function login(event){
		// alert("logged in")
		event.preventDefault();

		const user = {
			username:event.target.username.value,
			password: event.target.password.value
		}
		// console.log(user);
		axios.post(`${hostname}/users/signin`,user)
			.then(res=>console.log("res",res.data))
			.catch(error=>console.log("err",error))



// todo axios for loggin in . 
		event.target.reset();

		// check if the username is vlaid. 
	}






  return (
   <>
  	<form onSubmit={login}>
  	<input type="text" name="username" placeholder = "username"/>
  	<input type="password" name="password" placeholder="password"/>
  	<input type="submit" value="login" />
  	</form>
 
   </>
  );
}

export default Login;
