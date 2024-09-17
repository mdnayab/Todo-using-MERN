import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import allRoutes from './routes/index.js'        //importing all routes which is connected to all controllers 

const app = express();
app.use(express.json())  
app.use(cors())       //Middleware

  // When you call app.use(express.json()), you're telling Express.js to use 
  // the express.json() middleware function to parse incoming requests with JSON payloads.

app.get("/", (req, res) => {
  res.send("Working");
});

app.use('/api/v1', allRoutes)          //here we especify the routes

mongoose
  .connect("mongodb+srv://madegamer:made141@cluster0.xq6liil.mongodb.net/todo")
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.listen(3001, () => {
  console.log("server listening on port 3001");
});
