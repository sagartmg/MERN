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


exports.productById = (req,res,next,id) =>{

	Product.findById(id)
		.exec((err,product)=>{
			if(err || !product){
				return res.status(400).json({
					error: "product not found"
				})
			}

			req.product = product;
			next();

		})

}

exports.read = (req,res) =>{
	req.product.photo = undefined;
	console.log(req.product)
	res.json(req.product)  // whle {req.product}, gave error why??


}


exports.remove = (req,res) =>{
	let product = req.product;
	// ohter way will be to delete.one from Product<<mongooseModel>>
	// the following proudct is also derived from findByONe in up-cases
	// if we use Product<<mondoose_Model>>.remove() , then all the data will be removed. 
	product.remove((err,deleted_product) =>{
		if(err || !deleted_product){
			return res.json({
				error:err.message
			})
		}
		res.json({
			deleted_product,
			message:"product deleted successfully"
		})
	})

}



exports.update = (req,res) =>{
	// one way use Proudct<<MONGOOSE_MODEL>>.updateONe(query,newdAta)

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
		new_product = req.product
		new_product = _.extend(new_product,fields) /// using lodash library

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