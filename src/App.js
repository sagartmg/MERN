import React,{useEffect,useState} from 'react';
import axios from 'axios'
import Navbar from './Components/navbar'
import {Route,Switch,Redirect} from 'react-router-dom'
import AllExcercise from './Components/all_excercise'
import AddExcercise from './Components/add_excercise'
import Login from './Components/login'

import Signup from './Components/signup'


import './Css/styles.css'
function App() {
    const[username,setUsername] = useState(); 
  {/* 
  const [all_excercies,setAllExcercise] = useState();


  
    // window.addEventListener('DOMContentLoaded', (event) => {
    //   getExcercise();

    // }); 

  function getExcercise(){
    alert("ok")
    axios.get('http://localhost:5000/excercises/')
      .then(res=>{console.log(res.data);
            const {user} = res.data;
            console.log("all_excercies_before",all_excercies)


            setAllExcercise(user);
            console.log("user",user)
            console.log("all_excercies_afger",all_excercies)
            })
      .catch(error=>console.log(error))
  }
  // alert('ol')
  // getExcercise()

    window.addEventListener('DOMContentLoaded', (event) => {
      getExcercise();

    }); 
     */}




  return (
   <>
   <Navbar/>
   <Switch>

   <Route exact path="/" component={AllExcercise}/>
   <Route exact path="/myexcercises" component={AllExcercise}/>

   <Route exact path="/add_excercise" component={AddExcercise}/>
   <Route exact path="/login" component={Login}/>
   <Route exact path="/signup" component={Signup}/>
   <Redirect to="/" />



   </Switch>
 
   </>
  );
}

export default App;
