import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';



function PrivateRoute({component:Component,...rest}) {
 let localStorage_data = JSON.parse(localStorage.getItem("signed_user"));

  return (
      <Route {...rest} render={props=>localStorage_data?(<Component{...props}/>):
      (
        <Redirect to="/"/>
      )

      }/>
  );
     
      
}

export default PrivateRoute;
