import {v2 as cloudinary} from "cloudinary" //v2 as some custom name can be given to this syntax

import fs from "fs"

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadCloudinary=async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{  //what are the details going to be there while printing the response
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("File has been uploaded Successfully!!",response.url);
        return response;
        
    } catch (error) {
        //if the file is not been uploaded on the server than we should remove the file from our local server
        fs.unlinkSync(localFilePath)
        return null;
    }
}


export {uploadCloudinary}