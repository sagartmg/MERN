const express = require("express");
const router = express.Router();


const {create} = require("../Controller/product_controller");
const {userById} = require("../Controller/user_controller");
const {productById,read,remove,update,all,related,distinctCategory,listBySearch,getPhoto} = require("../Controller/product_controller");
const {requireSignin,isAuth,isAdmin} = require("../Controller/user_auth_controller");




router.post("/create/:userId",create);
router.get("/read/:productId",read);
router.delete("/delete/:productId/:userId",requireSignin,isAuth,isAdmin,remove);
router.put("/update/:productId/:userId",requireSignin,isAuth,isAdmin,update)

router.get("/all",all)
router.get("/related/:productId",related)
router.get("/distinctcategory",distinctCategory)
router.post("/search",listBySearch)
router.get("/photo/:productId",getPhoto)


router.param("productId",productById);
router.param("userId",userById)


module.exports = router;


