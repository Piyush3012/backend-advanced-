import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"//this all can be configure after the making of the app

const app=express()
app.use(cors({//it provides the object 
   origin:process.env.CORS_ORIGIN,
   credentials:true
}))

//middlewares
app.use(express.json({limit:"16kb"}))//we are accepting the json format data configuring the json format data 
app.use(express.urlencoded({extended:true,limit:"16kb"}))//handling the data coming from the URL 
app.use(express.static("public"))//use to store the general public images which is used to store the data which can be accessed publicily

app.use(cookieParser())//it is used to perform the crud operations on the cookies store at the web browser of the client securely which can be handled by the server only


//routes import 

import userRouter from "./routes/user.routes.js"

//routes declaration
//in routes declartion we have to use the middlewares to import routes because it can't be imported directly beacuse controller and routes are in different files 

app.use("/api/v1/users",userRouter)// this will pass the control to the "user.routes.js" and that function or the route will be worked

//example hhtp://localhost8000/api/v1/users/register
export {app} 