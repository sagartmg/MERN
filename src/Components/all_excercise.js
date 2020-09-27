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

		  function getExcercise(){
		  	console.log("geyt")
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




		  }
		  console.log("all_excercies",all_excercies);
		  var mapping;
		  if(all_excercies){
		  	console.log("mapping");
		  	 mapping=all_excercies.map(element=>{
		  	return <div key={element._id}>
		  			{element.excercise_name}
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
		  },[])




	
	


  return (
   <>
  	<p onClick={getExcercise}>all excercise</p>
  	{mapping? mapping:null}

   </>
  );
}

export default AllExcercise;
