import React,{useState,useEffect} from 'react';
import axios from 'axios'
import '../Css/all_excercise.css'



function AllExcercise(props) {
	console.log("props",props)
	let logged_user = JSON.parse( window.localStorage.getItem("logged_user"));
	let logged_user_from_navbar = props.location.logged_user;
	

	console.log(logged_user_from_navbar)


	let local_user = logged_user?.username;
	// alert(local_user)
	// or rather from window.usernmaem...
		
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
		  	// {local_user? alert("preseent"):alert("not")}

		  	if(local_user && props.location.pathname=="/myexcercises"){
		  		axios.post(`${hostname}/excercises/${local_user}`,logged_user)
		  			.then(res=>{console.log(res.data)
		  						const{ excercise} = res.data;
		  						setAllExcercise(excercise);
		  						});

		  	}
		  	else{
		  		axios.get(`${hostname}/excercises/`)
		      .then(res=>{
		            const {excercise} = res.data;
		            // console.log("all_excercies_before",all_excercies)
		            // alert(user);

		            setAllExcercise(excercise);
		            // console.log("user",user)
		            // console.log("all_excercies_afger",all_excercies)
		            })
		      .catch(error=>console.log("an erro has occured"))

		  	}
		    




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
		  	return <div key={element._id} className="each_excercises">
		  			<div className="each_excercises_name">{element.excercise_name}</div>
		  			{element.username==local_user &&<div className="delete"><button excercise_name={`${element.excercise_name}`} onClick={deleteExcercise}>delete</button></div>}
		  			</div>
		  })

		  }
		     
		    

		  
		  
		  useEffect(()=>{
		  	getExcercise();
		  	console.log("useeffect mounded")
		  },[count,props.location.pathname,props.location]);

		  //to set anohter state that represents the deletion of excercise and pass as sencond parameter to useEffect and it re-renders and so do the 
		  // child compoentnes. 




	
	


  return (
   <>
  	{mapping? mapping:null}

   </>
  );
}

export default AllExcercise;
