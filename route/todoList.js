const route=require('express').Router();
const verifyToken = require('../middleware/verifyToken.js');
const ToDoModel=require('../model/Todo.js');
const deleteToDoById = require('../utility/deleteToDoById');
const updateToDoById = require('../utility/updateToDoById.js');
const findTaskById = require('../utility/findToDoById.js');

route.post('/add',verifyToken,async (req,res)=>{
    try{
    const toDoNameUser=await ToDoModel.findOne({"User":req.user_id});
    const todoId="task_"+(toDoNameUser.toDoList.length+1);
     toDoNameUser.toDoList.push({ toDoName:req.body.toDoName,
         toDoId:todoId});
     const addResult=await toDoNameUser.save();
     return res.json({ toDoName:req.toDoName,toDoId:todoId}).status(201);
     }
     catch(err){
         res.err(err).status(401);
     }
});

route.get('/',verifyToken,async (req,res)=>{
    try{
    const toDoNameUser=await ToDoModel.findOne({"User":req.user_id});
    const toDoList=toDoNameUser.toDoList;
    res.send(toDoList).status(201);
    }
    catch(err){
        res.err(err).status(401);
    }
});

route.get('/:todoId',verifyToken,async (req,res)=>{
    try{
    const todoId=req.params.todoId;
    const toDoNameUser=await ToDoModel.findOne({"User":req.user_id});
    const data=findTaskById(toDoNameUser.toDoList,todoId);
    if(data)
        return res.status(201).json(data);
    else    
        return res.status(401).send("error");
    }
    catch(err){
        res.err(err).status(401);
    }
});
route.put('/:todoId',verifyToken,async (req,res)=>{
    try{
    const toDoId=req.params.todoId;
    const toDoNameUser=await ToDoModel.findOne({"User":req.user_id});
    const resulta=toDoNameUser.updateOne(
        { "toDoList.toDoId":toDoId },
        { $set: { "toDoList.$.toDoName" : req.body.toDoName } }
     );
     
    const result=await toDoNameUser.save();
    res.send("Updated taks successfully").status(201);
    }
    catch(err){
        res.err(err).status(401);
    }
});

route.delete('/:todoId',verifyToken,async (req,res)=>{
    
    try{
    const toDoId=req.params.todoId;
    console.log(toDoId);
    const toDoNameUser=await ToDoModel.findOne({"User":req.user_id});
    const reult=toDoNameUser.updateOne(
        {} ,
        { $pull: { toDoList: { "toDoList.toDoId":toDoId} } }
      );
    const result=await toDoNameUser.save();
    res.send("Deleted taks successfully").status(201);
    }
    catch(err){
        res.err(err).status(401);
    }
});



module.exports=route;
