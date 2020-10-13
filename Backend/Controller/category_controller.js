const  Category = require("../Model/category_model")

const {showError} = require("../Helper/db_error_helper")

exports.create = (req,res) =>{
	
	const new_category = new Category(req.body);

	new_category.save((err,category)=>{
		if(err || !category){
			return res.status(400).json({
				err:err.message
			})
		}
		res.json({
			category
		})
	})




}