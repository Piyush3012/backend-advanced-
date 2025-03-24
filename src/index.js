import { app } from "./app.js";
import dotenv from "dotenv"

import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{   // this will start the server before this it was only connected to the mongodb
    app.on("error",(error)=>{
        console.error("ERROR",error);
        throw error
    });
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at the port:${process.env.PORT}`);
    })//listen on which port or run on default port 
})
.catch((error)=>{
    console.log("MONGODB CONNECTION FAILED!!",error)
})










/*

1st approach to connect to the database
import express from "express";
const app=express()
;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)//connection of the database
        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error 
        })//listners to listen to the database listen to the error if the express is not connected to the database 
            app.listen(process.env.PORT,()=>{
            console.log(`App is listening on the port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("ERROR:",error)
        throw error
    }
})()
*/