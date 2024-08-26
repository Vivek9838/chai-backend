// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";
import connectDB from "./db/index.js"

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed !!! ", err);
    
})
















//1st approach//
/*
import express from "express"
const app = express()
( async ()=>{
try {
   await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
   app.on("error",(error)=>{
    console.log("error",error);
    
   })
   app.listen(process.env.PORT,()=>{
    console.log(`app is listing on port ${process.env.PORT}`);
    
   })
} catch (error) {
    console.log("error",error)
    throw err
}
})()
*/