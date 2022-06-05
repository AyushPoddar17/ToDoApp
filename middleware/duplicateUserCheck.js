const mongoose=require('mongoose');
const UserModel = require('../model/User');

const duplicateUserCheck = async (req,res,next)=>{
    const user= await UserModel.find({"name":req.body.name});
    if(user.length!=0)
        return res.send("User already exists").status(400);
    next();
};

module.exports=duplicateUserCheck;
