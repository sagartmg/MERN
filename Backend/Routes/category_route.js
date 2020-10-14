const express = require("express");
const router = express.Router();


const {create,categoryById,read,update,remove,all} = require("../Controller/category_controller")
const {userById} = require("../Controller/user_controller");
const {requireSignin,isAuth,isAdmin} = require("../Controller/user_auth_controller");


// require sign in , is auth, is admin, 
	// expressjwt() and then check if the rq.auth from express jwt mathcesthe id.. and the the role 

//only admin can create a new category
router.post("/create/:userId",requireSignin,isAuth,isAdmin,create);
router.get("/read/:categoryId",read);
router.get("/all",all)

router.put("/update/:categoryId/:userId",requireSignin,isAuth,isAdmin,update)
router.delete("/remove/:categoryId/:userId",requireSignin,isAuth,isAdmin,remove)



router.param("categoryId",categoryById)
router.param("userId",userById);


module.exports = router;