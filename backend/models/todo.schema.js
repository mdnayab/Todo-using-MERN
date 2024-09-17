import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({      //schema for saving the todo
    text : String,
    isDeleted : {type : Boolean, default : false},     // isDeleted parameter is used for set the value true or false for using it for strikethrough in todo list
})

const Todo = mongoose.model("Todo", todoSchema)

export default Todo;