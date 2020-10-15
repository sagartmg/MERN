import React,{Component,Fragment} from 'react';
import {Route,Redirect} from 'react-router-dom';



function Dashboard() {
 let localStorage_data = JSON.parse(localStorage.getItem("signed_user"));
 const {user:{_id,name,email,role}} = localStorage_data;

  return (
      <Fragment>
      <h1>welcome to Dashboard</h1>
      {name}
      {email}
      {role}


      </Fragment>


  )
     
      
}

export default Dashboard;
