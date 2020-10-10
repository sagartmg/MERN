import React,{useEffect} from 'react';
import {Route,Link} from 'react-router-dom'
import axios from 'axios'
import '../Css/all_excercise.css'
function Login(props) {
	console.log("loginprops",props)
	let setLoggedUser = props.location.func;
	let logged_user = props.location.logged_user;
	console.log("setLoggedUser",setLoggedUser)

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
			.then(res=>{console.log("res",res.data)
					window.localStorage.setItem("logged_user",JSON.stringify(user));
					setLoggedUser(logged_user+1);
					window.location.href = "/";
			})
			.catch(error=>console.log("err",error))


		


		event.target.reset();

	}
	useEffect(()=>{
		console.log("useEFfect in loginpage")

	},[logged_user])

	






  return (
   <>
  	<form onSubmit={login} className="new_login">
  	<input type="text" name="username" placeholder = "username"/>
  	<input type="password" name="password" placeholder="password"/>
  	<input type="submit" value="login" />
  	</form>
 
   </>
  );
}

export default Login;
