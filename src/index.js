
import dotenv from "dotenv"

import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()










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