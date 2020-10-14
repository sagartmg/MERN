const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")


// let User = require('./models/user.model');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000
// const port =5000;


app.use(cors());
app.use(express.json());



const mongoUri = " mongodb+srv://dbUser:dbUser@cluster0.dx5tn.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"
const uri = process.env.ATLAS_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})





// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
{/* 
app.use('/users', usersRouter);
 */}

app.use("/path",(req,res)=>{
	res.end(` resolve is response from server ${path.resolve(__dirname, 'build','index.html')}`)
})

// hello from the onther side, i jus  wanna say goodabye

// console.log("dirname",__dirname);

app.use(express.static(path.join(__dirname, 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'alias.html'))
})

// app.post('/users/add',(req,res)=>{
// 	 const username = req.body.username;

//   const newUser = new User({username});

//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));

// });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
