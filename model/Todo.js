const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const ToDoSchema=new Schema({
    toDoList:[{
        toDoName:String,
        toDoId:String,
    }],
    User:{type:Schema.Types.ObjectId,ref:'User',required:true}

});

module.exports=mongoose.model('ToDo',ToDoSchema);

