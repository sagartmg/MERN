const Excercise = require("../Models/excercise_model");
const mongoose = require("mongoose");


module.exports.deletion = (req,res)=>{

	const {excercise_name} = req.body;
	Excercise.findOne({excercise_name},(err,user)=>{
		if(err || !user){
			return res.status(400).json({
				err:"no such excercise name"
			})
		}
		if(user){
			Excercise.deleteOne({excercise_name:excercise_name},(err)=>{
				if(err){
				console.log(err)
				}
				console.log(`successful deletion of ${excercise_name}`);
			})
		}
		return res.end(`delete successful !! ,${excercise_name} no longer exists`);



	})

}




module.exports.addition = (req,res)=>{
	const {excercise_name, category} = req.body;

	const new_excercise = new Excercise(req.body);

	new_excercise.save((err,user)=>{
		if(err){
			return res.status(400).json({
				err1:err,
				err:"same name"
			})
		}
		return res.json({
			user
		})
	})
}
