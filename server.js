const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Server/Routes/user_route");
const excerciseRouter = require("./Server/Routes/excercise_route");
const morgan = require("morgan");
const cors = require("cors")
const path = require('path');

//middleware
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//router middlewares.
app.use("/users",userRouter);
app.use("/excercises",excerciseRouter);

// app.get("/users",(req,res)=>{
// 	res.end("user apge");
// });


require('dotenv').config()
var PORT = process.env.PORT || 5000;

// const port =5000;
const url = "mongodb://localhost/tracker";
const atlas_url = process.env.ATLAS_URL

// connection to database
mongoose.connect(atlas_url,{
	useNewUrlParser: true,
    useCreateIndex:true,
   useUnifiedTopology: true


}).then(()=>console.log('connected to MONGODB'))

app.use("/path",(req,res)=>{
  res.end(`path resolve is response from server at  ${path.resolve(__dirname, "dirname")}`)
})

//no build locally
app.use(express.static(path.join(__dirname,'build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'build'))
})





app.listen(PORT,"0.0.0.0",(res)=>{
	console.log(`server started at port ${PORT}`);

})