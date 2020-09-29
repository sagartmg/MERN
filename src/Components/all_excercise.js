import React,{useState,useEffect} from 'react';
import axios from 'axios'
import '../Css/all_excercise.css'



function AllExcercise(props) {
		{/* 
		console.log("match.params",props)
		const {state} = props;
		console.log(state);

		if(state){
			var mapping =state.map(element=>{
			return <div key={element._id}>
				<p>{element.excercise_name}</p>
			</div>
		    })
		}
		 */}

		 const [all_excercies,setAllExcercise] = useState();
		 const [count, setCount ] = useState(0);

		  function getExcercise(){
		  	// console.log("geyt")
		    axios.get('http://localhost:5000/excercises/')
		      .then(res=>{
		            const {user} = res.data;
		            // console.log("all_excercies_before",all_excercies)
		            // alert(user);

		            setAllExcercise(user);
		            // console.log("user",user)
		            // console.log("all_excercies_afger",all_excercies)
		            })
		      .catch(error=>console.log("an erro has occured"))




		  };

		  function deleteExcercise(event){
		  	setCount(count+1);
		  	// console.log("delete",event.target);
		  	let excercise_name = event.target.getAttribute("excercise_name")
		  	// console.log(excercise_name);

		  	let excercise_name_json = {
		  		"excercise_name":excercise_name
		  	}
		  	// console.log( "excercise_name_json",excercise_name_json)
		  	axios.post("http://localhost:5000/excercises/delete",excercise_name_json)
		  		.then((res)=>console.log("deleted data",res.data))
		  		.catch((error)=>console.log("deleted error",error));

		  	// getExcercise();

		  }

		  console.log("all_excercies",all_excercies);
		  var mapping;

		  if(all_excercies){
		  	console.log("mapping");
		  	 mapping=all_excercies.map(element=>{
		  	return <div key={element._id}>
		  			{element.excercise_name}
{/* 
		  			<button data="help me" onClick={deleteExcercise}>delete</button>
 */}
		  			<button excercise_name={`${element.excercise_name}`} onClick={deleteExcercise}>delete</button>
		  			</div>
		  })

		  }
		     {/* 
                mapping = all_excercies.map(element=>{
		      	return <div>
		      			ok
		      			{element.excercise_name}
		      			</div>
		      })
		
		     */}
		    

		   {/* 
		    window.addEventListener("DOMContentLoaded",()=>{
		    	getExcercise();	
		    });
		 
		  */}
		  
		  useEffect(()=>{
		  	getExcercise();
		  	console.log("useeffect mounded")
		  },[count])
		  //to set anohter state that represents the deletion of excercise and pass as sencond parameter to useEffect and it re-renders and so do the 
		  // child compoentnes. 




	
	


  return (
   <>
  	<p>all excercise</p>
  	{mapping? mapping:null}

   </>
  );
}

export default AllExcercise;
