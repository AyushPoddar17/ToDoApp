const route=require('express').Router();
const UserModel=require('../model/User');
const ToDoModel=require('../model/Todo');
var jwt = require('jsonwebtoken');
var duplicateUserCheck=require('../middleware/duplicateUserCheck');

route.post('/register',duplicateUserCheck,async (req,res)=>{
    try{
    const userAdd=new UserModel({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
    });
    const addResult=await userAdd.save();
    const addToDo=new ToDoModel({
        User:addResult._id
    });
    const addResultTodo=await addToDo.save();
    
    res.send("User added successfully");
    }
    catch(err){
        res.err(err).status(401);
    }
});

route.post('/login',async (req,res)=>{
    try{
    const username=req.body.username;
    const pwd=req.body.password;
    const user= await UserModel.findOne({"name":username});
    if(user)
       {
           const authToken= jwt.sign({"id":user._id},process.env.JWT_SEC);
           return res.send(authToken).status(201);
       }
       return res.send("User not found").status(401); 
    }
    catch(err){
        res.err(err).status(401);
    }

});

route.get('/logout',(req,res)=>{
    res.send("User Logged Out Sucessfull").status(201);
});




module.exports=route;
