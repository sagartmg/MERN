const express = require("express");
const router = express.Router();


const {create} = require("../Controller/product_controller");
const {userById} = require("../Controller/user_controller");
const {productById,read,remove,update} = require("../Controller/product_controller");
const {requireSignin,isAuth,isAdmin} = require("../Controller/user_auth_controller");




router.post("/create/:userId",create);
router.get("/read/:productId",read);
router.delete("/delete/:productId/:userId",requireSignin,isAuth,isAdmin,remove);
router.put("/update/:productId/:userId",requireSignin,isAuth,isAdmin,update)


router.param("productId",productById);
router.param("userId",userById)


module.exports = router;


