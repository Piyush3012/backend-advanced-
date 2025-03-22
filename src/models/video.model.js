import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
     videoFile:{
        type:String,  //cloudnariy URl
        requires:true,
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number, // we will take the duration from the cloudnary URL
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

videoSchema.plugin(mongooseAggregatePaginate)//we can write our own plugins using this syntax

export const Video=mongoose.model("Video",videoSchema)