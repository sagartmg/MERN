

const express = require('express');
const excerciseRouter = express.Router();
const Excercise = require("../Models/excercise_model");

//controllers import. 
const  {deletion,addition} = require("../Controllers/excercise_controller")




excerciseRouter.post('/add',addition)

excerciseRouter.post('/delete',deletion);

excerciseRouter.get('/',(req,res)=>{
	Excercise.find({},(err,excercise)=>{
		if(err || !excercise){
			return res.status(400).json({
				err
			})
		}
		return res.json({
			excercise
		})
	})


});


excerciseRouter.post('/:users',(req,res)=>{
	const {username} = req.body
	Excercise.find({username},(err,excercise)=>{
		if(err || !excercise){
			return res.status(400).json({
				err
			})
		}
		return res.json({
			excercise
		})
		


	})


});




// exports.router;
module.exports = excerciseRouter;