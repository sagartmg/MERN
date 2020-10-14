var express = require('express');
var app = express();
const mongoose = require("mongoose")

require('dotenv').config();
  
// in .env file  
// REACT_APP_PORT = 4001
// REACT_APP_PRODUCTION = development
// PORT = 4001  // in server file 

var PORT = process.env.PORT || 5000
const path = require("path")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
// const expressValidator = require('express-validator');

// ok


app.use(cors())
app.use(morgan("dev"))
app.use(express.json());

app.use(cookieParser())
// app.use(expressValidator())

const secondRouter = require("./Routes/second_route");
const user_auth_router = require('./Backend/Routes/user_auth_route');
const user_router = require('./Backend/Routes/user_route');
const category_router = require('./Backend/Routes/category_route');
const product_router = require('./Backend/Routes/product_route');

app.use("/path",(req,res)=>{
  res.end(`path resolve is response from server ${path.resolve(__dirname, '../build')}`)
})



app.use("/first",(req,res)=>{
	res.end("first-backend-connected ")
})

app.use("/fuck",(req,res)=>{
	res.end("fucking-backend-connected ")
})



app.use("/second",secondRouter);




let DATABASE
if(process.env.NODE_ENV==="development"){
	DATABASE = process.env.DATABASE;

}
else{
	DATABASE = process.env.MONGO_ATLAS
}


mongoose.connect(process.env.DATABASE,{
	useNewUrlParser: true,
    useCreateIndex:true,
   useUnifiedTopology: true


}).then(()=>console.log('connected to MONGODB'))

app.use('/users',user_auth_router);
app.use("/users",user_router);
app.use("/category",category_router)
app.use("/product",product_router)

//no build locally
app.use(express.static(path.join(__dirname,'build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'build'))
})





app.listen(PORT,'0.0.0.0',()=>{
	console.log("server running at prot ",PORT)
});