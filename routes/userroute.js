const userController=require('../controllers/user');
const express=require('express');
const router=express.Router();



router.post('/register',userController.rigister);
router.post('/login',userController.login);
router.get('/user-profile',userController.userProfile);



module.exports=router;