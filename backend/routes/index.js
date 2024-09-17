import { Router } from "express";
import todoRoutes from './todoRoutes.js'    //import all routes in one file from 

const router = Router()

router.use('/todo', todoRoutes)       //we can use all routes

export default router