const express=require("express");
const app=express();
const mongoose=require('mongoose');
const todoRoute=require('./route/todoList');
const userRoute=require('./route/user');
app.use(express.json());

const password=encodeURIComponent("ayush@123")
mongoose.connect(`mongodb+srv://ayush:${password}@cluster0.0cbdx.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> console.log("connected to mongodb")).catch((err)=>{
    console.log(err);
});
app.use('/',userRoute);
app.use('/user',todoRoute);

app.listen(3000,()=>
{
    console.log("listening at port 3000");
});