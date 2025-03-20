import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";//we have to write the full folder path as it is the common problem  in the backend 




const connectDB= async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        
        console.log(`\n MONGODB connected !! DB HOST:${connectionInstance.connection.host}`);//this is use to check to which database the code has been connected with because in industry we have many database for each use 

        
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR",error);
        //we can use the process here which is the refrence for the process running over nodejs 
        process.exit(1);
        
    }
}

export default connectDB