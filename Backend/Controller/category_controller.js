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

exports.categoryById = (req,res,next,id) =>{
	Category.findById(id)
		.exec((err,category)=>{
			if(err || !category){
				res.status(400).json({
					error:"no category found by that id"
				})
			}
			req.category = category
			next();

		})

}
exports.read = (req,res) =>{
	res.json(
		req.category
	)
}

exports.all = (req,res) =>{
	Category.find()
		.exec((err,all)=>{
			if(err || !all){
			return res.json({
				error:err.message
			})
			}
			res.json({
				all
			})

		})
}

exports.update = (req,res) =>{

	new_category = req.category;
	new_category.name = req.body.name;

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
exports.remove=(req,res) =>{
	category = req.category;
	category.remove((err,category)=>{
		if(err || !category){
			res.json({
				error:"problem in removing"
			})
		}
		res.json({
			category,
			"message":"category removed"
		})
	})

}