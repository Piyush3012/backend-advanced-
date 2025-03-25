import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new Schema({
    username:{
       type:String,
       required:true,
       unique:true,
       lowercase:true,
       trim:true,
       index:true  //this field is used to make the object or the username serachable easily we can search that object easily in optimised way
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        index:true,
        trim:true,
    },
    avatar:{
        type:String, //we are using the 3rd party application to store the avatar so the 3rd party app will provide us with the URL(cloudinary URl)
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    password:{
        type:String, //we are going to store the encrypted password for this field.
        required:[true,'Paswword is Required'] //we can pass the custom error message if the password is not entered
    },
    refreshToken:{
        type:String // what are the refresh token and the access token

    }


},{
    timestamps:true
})

//used for the encryption
userSchema.pre("save",async function (next) {
   if(!this.isModified("password")) return next(); //only change the password if the password field is changed
   this.password =await bcrypt.hash(this.password,10)
   next()
}) //we can use the pre hook for storing the encrypted password and do not write the callback function as an arrow function

//defining the custom method to check the password given by the user to the password store in the database
userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function () {
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    
        process.env.ACCESS_TOKEN_SECRET,
        {
            espiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    
)
}

userSchema.methods.generateRefreshToken=function() {
    return jwt.sign(
        {
        _id:this._id,
        
    },
    
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    
)
}

export const User=mongoose.model("User",userSchema)