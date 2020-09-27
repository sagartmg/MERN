

const express = require('express');
const userRouter = express.Router();

//controllers import. 
const  {signIn,signUp,signOut} = require("../Controllers/user_controller")




userRouter.post('/signin',signIn);

userRouter.post('/signup',signUp);
userRouter.get('/signout',signOut);


// exports.router;
module.exports = userRouter;