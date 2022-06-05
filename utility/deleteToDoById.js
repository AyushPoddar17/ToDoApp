const deleteToDoById= (toDoList,toDoId) => {
    const result=toDoList.filter(function(x){
        return x.toDoId!==toDoId;
    });
    return result;
};

module.exports=deleteToDoById;