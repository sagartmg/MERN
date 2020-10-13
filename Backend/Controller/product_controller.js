const  Product = require("../Model/product_model")
const formidable = require("formidable")
const fs = require("fs");
const _ = require("lodash")

const {showError} = require("../Helper/db_error_helper")

exports.create = (req,res) =>{
	let new_product;
	const form = new formidable.IncomingForm();
	form.keepExtentions = true;
	form.parse(req,(err,fields,files)=>{
		const{name,description,price,category,quantity,shipping} = fields

		if(!name || !description || !price || !category || !quantity || !shipping){

			let ls=[name,description,price,category,quantity,shipping];
			let ls_name = ["name","description","price","category","quantity","shipping"];
			let ls_index;

			ls.find((field,index)=>{
				ls_index=index;
			 return field == undefined});

				return res.status(400).json({
				error: `${ls_name[ls_index]} field missing`
			     })

			
			
		}



		if(err || !fields){
			return res.status(400).json({
				error:err.message
			})
		}
		new_product = Product(fields);

		if(files.photo){
			if(files.photo.size>1000000){
				return res.status(400).json({
					error:"image size exceed more than 1mb"
				})
			}
			new_product.photo.data = fs.readFileSync(files.photo.path);
			new_product.photo.contentType = files.photo.type
		}

		new_product.save((err,product)=>{
		if(err || !product){
			return res.status(400).json({
				error: err.message
			})
		}
		res.json({
			product
		})
		})


	})

	




}