import Todo from "../models/todo.schema.js"  //Take schema from todo schema file

//controller of create the Todo

export const createTodo = async (req, res) => {           
    try {
        const {text} = req.body
        if(!text) return res        //if todo is empty its shows error
        .status(404)
        .json({success : false, error: "Todo is required"})

        const isTodoExist = await Todo.findOne({text, isDeleted : false})    //this line is for finding dupliactes of todo

        if(isTodoExist){
            return res
            .status(404)
            .json({success : false, error:"Todo is already exists"})
        }

        const newTodo = new Todo({     //use the todo schema for saving the todo
            text,
        })

        await newTodo.save()          //here we save the new todo in db

        const allTodos = await Todo.find({isDeleted : false})
        
        return res
        .status(201)
        .json({success : true, allTodos, message: "Todo created successfully"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success : false, error})
    }
}


//controller of edit the Todo

export const editTodo = async (req, res) => {       
    try {
        const {todoId, newTodoText} = req.body       //todoId is the id of the todo which we want to change
        if(!todoId || !newTodoText){                 //newTodoText is the text which we want to replace from old todo
            return res                               //both are taken fron frontend
            .status(404)
            .json({success : false, error: "All fields are required"})      //here we check the value is empty or not??
        }

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
            text: newTodoText,                          //here we update the old todo from text using todoId
        },
        {
            new : true
        })

        const allTodos = await Todo.find({isDeleted: false})       //here we have to show all todo after update 

        return res
        .status(200)
        .json({success : true, allTodos, message: "Todo updated successfully"})    //so, we add alltodos func in json response

    } catch (error) {
        return res.status(500).json({success : false, error})
    }
}


//controller of delete the Todo

export const deleteTodo = async (req, res) => {      
    try {
        const {todoId} = req.body

        if(!todoId){         //here we check the todo id is empty or not??
            return res
            .status(404)
            .json({success : false, error: "Todo id is required"})
        }

        await Todo.findByIdAndUpdate(todoId, {isDeleted: true})    //here we delete the selected todo
        const allTodos = await Todo.find({isDeleted: false})       //here we have to
        return res                                                 //In this, if the value of isDeleted is true the todo is seen in response but the todo is available in db
        .status(200)
        .json({success : true, allTodos, message: "Todo deleted successfully"})

    } catch (error) {
        return res.status(500).json({success : false, error})
    }
}


//controller of read the Todo

export const getTodos = async (req, res) => {     
    try {
        const todos = await Todo.find({isDeleted : false})     //we use find func without any condition to fetch all todos
        return res
        .status(200)
        .json({success : true, todos})
    } catch (error) {
        return res.status(500).json({success : false, error})
    }
}