


exports.userSignupValidator = (req,res,next)=>{
	req.check("name","Name should not be empty").notEmpty()
	req.check("email","email etween 3-32 chars")
		.matches(/.+\@.+\..+/)
		.withMessage("Email must contain @")
		.isLength({
			min:4,
			max:32
		});
	req.check("password","password shoudl no empty").notEmpty()
	req.check("password")
		.isLength({
			min:5
		})
		.withMessage("password should be no less than 6 chars")
		.matches(/\d/)
		.withMessage("must have number");


		const erros = req.validationErrors();
		if(erros){
			const firstError = erros.map(error=>error.msg)[0];
			return res.status(400).json({error:firstError});
		}
		next();


};