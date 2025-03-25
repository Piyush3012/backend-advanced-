import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async (req,res)=>{
    //1.get user details from the frontend we can take the user details from the postman without having the frontend
    //2.Validation of the input - not empty or empty
    //3.check if the user is already registered or exist:username or email
    //4.check for images and then check for the avatar at the multer
    //5.upload file to cloudinary,check for the avatar at the cloudinary
    //6.create user object-create entry in db
    //7.remove password and refresh token field from the response 
    //8.check for the user is created or not 
    //9.return response

    //1.
    const {fullname,email,username,password}=req.body
    //console.log("email:",email);

    //2.
    // we have imported the api error file from the utils to throw the error 
    if (
      [fullname,email,username,password].some((field)=> field ?.trim() ===""
   )//have to learn about this method or the syntax
   )                                     //learn about this syntax
   {
      throw new ApiError(400,"All fields are required")
    }

    //3.we need to import the User from user model
    const existedUser=await User.findOne({
      $or:[{username},{email}]
    })                                //it will return the first user find in the database.

  

    if (existedUser) {
      throw new ApiError(409,"User with email or username already exist!!")
    }
    
    //console.log(req.files);  //files information is printed
    //4. handling the files
   const avatarLocalPath= req.files?.avatar[0]?.path;                                   //this is given by the multer which is the middleware and it gives additional paramters in the body
   //const coverImageLocalPath=req.files?.coverImage[0]?.path
   

   //to check the coverimage path is there or not using the new syntax
   let coverImageLocalPath;
   if(req.files && Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0){
      coverImageLocalPath=req.files?.coverImage[0]?.path;
   }

   // now we have to see for the avatar that it is uploaded properly or not because it is required field
   if(!avatarLocalPath){
      throw new ApiError(400,"Avatar file is required!!")
   }
    
   //5. Upload avatar and coverimage on the cloudinary
   const avatar=await uploadCloudinary(avatarLocalPath);
   const coverImage=await uploadCloudinary(coverImageLocalPath);

   //now we are going to check avatar that it has been uploaded on cloudinary as it is the required field.
   if(!avatar){
      throw new ApiError(400,"Avatar file is required")
   }

   //6. create user object and insert it into the database

   const user=await User.create({
      fullname,
      avatar:avatar.url,
      coverImage:coverImage?.url || "" ,    //this is done to check if the coverimage is there than upload the url otherwise upload the empty string
      email,
      username:username.toLowerCase(),
      password,
   })

   // check if the user has been created in the database or not 
   const createdUser=await User.findById(user._id).select(
      "-password -refreshToken"                 //we are removing the password and the refreshtoken from the user using this syntax
   )
   //check for the user is created or not 
   if(!createdUser){
      throw new ApiError(500,"Something went wrong while registering the user!!")  // this is the response given by the database or server so we have removed the pass and refreshtoken
   }

   //return the response 
   return res.status(201).json(
      new ApiResponse(200,createdUser,"User registered Successfully")
   )
})

export {registerUser}