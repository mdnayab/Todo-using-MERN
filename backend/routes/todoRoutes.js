import { Router } from "express";
import { createTodo, deleteTodo, editTodo, getTodos } from "../controllers/todo.controllers.js";

const router = Router()

router.post('/create-todo', createTodo)     //these are routes which 
router.post('/edit-todo', editTodo)         //is connected to each controllers
router.post('/delete-todo', deleteTodo)
router.get('/get-todos', getTodos)

export default router