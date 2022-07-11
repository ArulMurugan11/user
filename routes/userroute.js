const userController=require('../controllers/user');
const express=require('express');
const  {
    authenticateToken,
    generateAccessToken,
  } = require('../middlewares/auth');
const router=express.Router();



router.post('/register',userController.register);
router.post('/login',userController.login);
console.log(" -- - - ", authenticateToken);
router.get('/user-profile', authenticateToken, userController.userProfile);



module.exports=router;