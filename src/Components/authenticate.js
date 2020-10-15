
export const authenticate = () =>{
	console.log("authenticate");
	if(localStorage.getItem("signed_user")){
	let data = JSON.parse(window.localStorage.getItem("signed_user"));
	console.log("data",data);
	return data;


	}
	else{
		return false;
	}
}