import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import AllExcercise from './all_excercise'

import '../Css/navbar.css';

function Navbar() {

	const[logged_user ,setLoggedUser] = useState(0);
	let local_logged_user = JSON.parse( window.localStorage.getItem("logged_user"));
	let local_username;

	useEffect(()=>{
		console.log("useEffect executed, chage in logged user")
		local_logged_user &&  console.log("logged_user",logged_user,"and",local_logged_user.username)
	},[logged_user])


	function signOut(){
		let hostname;
			let port = process.env.REACT_APP_PORT || 5000

			if(process.env.REACT_APP_PRODUCTION =="development"){
				hostname =`http://localhost:${port}`
			}
			else{
				hostname = ""
			}

		axios.get(`${hostname}/users/signout`)
			.then(res=>{console.log(res.data)
						localStorage.removeItem("logged_user");
						if(local_logged_user){
							console.log("out now")
							setLoggedUser(logged_user+1);
							 window.location.href = "/";
						}
						})
		}

	  // let data = JSON.parse(window.localStorage.getItem("logged_user"));
	

	 //  const newTo = { 
		//   pathname: "/category/595212758daa6810cbba4104", 
		//   param1: "Par1" 
		// };
				




  return (
   <>
  	<div className="navbar">
  		<div className="navbar_contents">
  	{/* 
  		<Link to={{pathname:'/',state:{"name":"chija"}}} style={{ textDecoration: 'none'}}>
  	 */}
  		{/* 
  		<Link to={{pathname:'/',state:{all_excercies}}} style={{ textDecoration: 'none'}}>
	  		<p onClick={getExcercise}>All Excercise</p>
	  	</Link> */}
	  	<Link to={{ pathname: '/',  logged_user:logged_user}}>
	  		<p>All Excercise</p>
	  	</Link>
	  	{local_logged_user && <Link to="/myexcercises"><p>My Excercises </p></Link>}

	  	<Link to='/add_excercise'>
	  		<p>Add Excercise</p>
	  	</Link>

  		</div>

  		<div className="navbar_user">

			{!local_logged_user? <div style={{display:"flex"}}><Link to={{ pathname: '/login',  logged_user:logged_user,func:setLoggedUser }}>
	  			<p>login</p>
	  		</Link> 
	  		<Link to='/signup'>
	  			<p>signup</p>
	  		</Link>
	  		</div>: <div style={{display:"flex"}}><p>{local_logged_user.username}</p>
	  		
	  		<p onClick={signOut}>sign out</p></div>
	  	}

  		</div>
  		




  	</div>
 
   </>
  );
}

export default Navbar;
