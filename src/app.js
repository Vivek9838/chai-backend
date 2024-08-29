import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin:process.env.CORS_ORGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))//form bhara tb deta liya
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public")) //koi bhi access kr lega jaise image rakha ho
app.use(cookieParser())


//routes
import userRouter from "./routes/user.routes.js"



//routes declaration
app.use("/api/v1/users",userRouter)


export {app};