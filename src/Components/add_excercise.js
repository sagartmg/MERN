import React,{useEffect} from 'react';
import '../Css/all_excercise.css'
import axios from "axios"
function AddExcercise() {

	const addExcercise = (event) =>{
		// console.log
		event.preventDefault();
		const new_excercise = {
			excercise_name:event.target.name.value,
			category: event.target.category.value
		}

		axios.post("http://localhost:5000/excercises/add",new_excercise)
			.then(res=>{
				console.log(res.data)
			})

		event.target.reset();


	}




  return (
   <>
  	<p>add excercise</p>
  	<form onSubmit={addExcercise}>
  		<input type="text" placeholder="excercise" name="name" />
  		<input type="text" placeholder="category" name="category"/>
  		<input type="submit" value="add excercise"/>

  	</form>
 
   </>
  );
}

export default AddExcercise;
