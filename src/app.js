import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"//this all can be configure after the making of the app

const app=express()
app.use(cors({//it provides the object 
   origin:process.env.CORS_ORIGIN,
   credentials:true
}))

app.use(express.json({limit:"16kb"}))//we are accepting the json format data configuring the json format data 
app.use(express.urlencoded({extended:true,limit:"16kb"}))//handling the data coming from the URL 
app.use(express.static("public"))//use to store the general public images which is used to store the data which can be accessed publicily

app.use(cookieParser())//it is used to perform the crud operations on the cookies store at the web browser of the client securely which can be handled by the server only

export {app} 