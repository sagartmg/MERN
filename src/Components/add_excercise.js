import React,{useEffect} from 'react';
import '../Css/all_excercise.css'
import axios from "axios"
function AddExcercise() {


	 let hostname;
			let port = process.env.REACT_APP_PORT || 5000

			if(process.env.REACT_APP_PRODUCTION =="development"){
				hostname =`http://localhost:${port}`
			}
			else{
				hostname = ""
			}
	console.log(hostname,"addExcercise")
	console.log(process.env)

	const addExcercise = (event) =>{
		// console.log
		event.preventDefault();
		const new_excercise = {
			excercise_name:event.target.name.value,
			category: event.target.category.value,
			username: JSON.parse( window.localStorage.getItem("logged_user"))?.username
		}

		axios.post(`${hostname}/excercises/add`,new_excercise)
			.then(res=>{
				console.log(res.data)
			})

		event.target.reset();


	}




  return (
   <>
  	<form onSubmit={addExcercise} className="add_excercise">
  		<input type="text" placeholder="excercise" name="name" />
  		<input type="text" placeholder="category" name="category"/>
  		<input type="submit" value="add excercise"/>

  	</form>
 
   </>
  );
}

export default AddExcercise;
