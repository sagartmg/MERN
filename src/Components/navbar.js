import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import AllExcercise from './all_excercise'

import '../Css/navbar.css';

function Navbar() {
	const [all_excercies,setAllExcercise] = useState();


{/* 

	 const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> */}




	function addExcercise(event){
		axios.post('https://localhost:5000/excercises/add',)
			.then(res=>console.log(res.data));
	}
	{/* 
	function getExcercise(){
		axios.get('http://localhost:5000/excercises/')
			.then(res=>{console.log(res.data);
						const {user} = res.data;
						console.log("all_excercies_before",all_excercies)


						setAllExcercise(user);
						console.log("user",user)
						console.log("all_excercies_afger",all_excercies)
						})
			.catch(error=>console.log(error))
	} */}

		{/* 
		window.addEventListener('DOMContentLoaded', (event) => {
			getExcercise();

		}); */}


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
	  	<Link to='/'>
	  		<p>All Excercise</p>
	  	</Link>

	  	<Link to='/add_excercise'>
	  		<p>Add Excercise</p>
	  	</Link>

  		</div>

  		<div className="navbar_user">
  			<Link to='/login'>
	  			<p>login</p>
	  		</Link>
	  		<Link to='/signup'>
	  			<p>singup</p>
	  		</Link>
  			
  		</div>
  		




  	</div>
 
   </>
  );
}

export default Navbar;
