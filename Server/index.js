var express = require('express');
var app = express();

require('dotenv').config()

var PORT = process.env.PORT
const path = require("path")
const cors = require("cors")
const morgan = require("morgan")


app.use(cors())
app.use(morgan("dev"))

const secondRouter = require("./Routes/second_route");

app.use("/path",(req,res)=>{
  res.end(`path resolve is response from server ${path.resolve(__dirname, '../build')}`)
})



app.use("/first",(req,res)=>{
	res.end("conntected to backedn from index.js server")
})

app.use("/fuck",(req,res)=>{
	res.end("fuck off")
})

app.use("/second",secondRouter);




//no build locally
app.use(express.static(path.join(__dirname,'build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'build'))
})





app.listen(PORT,function(){
  console.log('server successfully started on port '+PORT);
});