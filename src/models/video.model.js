import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    {
videoFile:{
    type:String,
    required:true
},
thumbnail:{
    type:String,  //cloudinary se aayega url
    required:true
},
title:{
      type:String,
      required:true
},
descripation:{
      type:String,
      required:true
},
duration:{
      type:Number, //cloudinary se aayega url
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

    },
    {
        timestamps:true
    }
)


videoSchema.plugin(mongooseAggregatePaginate) //ab hum query likh sakte hain.
export const Video = mongoose.Model("Video",videoSchema)