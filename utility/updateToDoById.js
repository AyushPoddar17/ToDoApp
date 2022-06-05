const updateToDoById= (toDoList,toDoId,toDoName) => {

    toDoList.forEach(element => {
        if(element.toDoId===toDoId)
            element.toDoName=toDoName;
        return toDoList;
    });
}

module.exports=updateToDoById;