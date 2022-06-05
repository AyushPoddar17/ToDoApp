const findTaskById= (toDoList,toDoId) => {
    for(var i=0;i<toDoList.length;i++)
       { 
        if(toDoList[i].toDoId==toDoId){
            return toDoList[i];
        }
    }
}
module.exports=findTaskById;