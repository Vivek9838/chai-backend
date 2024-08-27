import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
      avatar:{
        type:String, // cloudinary se aayega url
        required:true
      },
      coverImage:{
        type:String
      },
      watchHistory:
      [
        {
        type:Schema.Types.ObjectId,
        ref:"Video"
      }
    ],
    password:{
        type:String,
        required: [true,"Password is require"]
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
}
);

//pre ek hook hota hai jo data save hone se pahle call kraana hota hain.
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
  next();    
})

//mai create kiya hu 3 method

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
        _id:this._id,
        emial:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}

userSchema.methods.generateRefreshToken = function(){
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

export const User = mongoose.Model("User",userSchema)

//bcrypt password compare me kaam aata hai,encrpt and decrypt ke liye.
//jsonwebtoken create krta hai ek token jo unqui hota hai.
//ye dono library har project me lagti hi lagti hai.
//jwt ek bearer token hai jo chabhi jaisa kaam krta hai,means mai chabhi dunga aap data doge.
//cloudaniry file upload le liye kiya jata hai.
//multer bhi use kiya jata hai file upload ke liye.
//middleware --> jate waqt mere se milkar jana 