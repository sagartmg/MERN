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
		  let hostname;
			let port = process.env.REACT_APP_PORT || 5000

			if(process.env.REACT_APP_PRODUCTION =="development"){
				hostname =`http://localhost:${port}`
			}
			else{
				hostname = ""
			}
			// console.log(hostname)
			// console.log(process.env)

		 const [all_excercies,setAllExcercise] = useState();
		 const [count, setCount ] = useState(0);

		  function getExcercise(){
		  	// console.log("geyt")
		    axios.get(`${hostname}/excercises/`)
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
		  	let excercise_name = event.target.getAttribute("excercise_name")
		  	// console.log(excercise_name);

		  	let excercise_name_json = {
		  		"excercise_name":excercise_name
		  	}
		  	// console.log( "excercise_name_json",excercise_name_json)
		  	axios.post(`${hostname}/excercises/delete`,excercise_name_json)
		  		.then((res)=>{console.log(res.data);
		  					 setCount(count+1)})
		  		.catch((error)=>console.log("deleted error",error));


		  }

		  var mapping;

		  if(all_excercies){
		  	 mapping=all_excercies.map(element=>{
		  	return <div key={element._id}>
		  			{element.excercise_name}
		  			<button excercise_name={`${element.excercise_name}`} onClick={deleteExcercise}>delete</button>
		  			</div>
		  })

		  }
		     
		    

		  
		  
		  useEffect(()=>{
		  	getExcercise();
		  	// console.log("useeffect mounded")
		  },[count]);

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
