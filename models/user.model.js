import mongoose from "mongoose";
import bcrypt from "bcrypt";
import  JWT from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
    {
        username: {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        email: {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        fullname: {
            type : String,
            required : true,
            lowercase : true,
            trim : true
        },
        avatar: {
            type : String,
            required : true,
        },
        coverImage: {
            type : String,
        },
        watchHistory: [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password:{
            type : String,
            required : [true,"Password is required"]
        }
    },
    {
        timestamps : true
    }
)

UserSchema.pre("save", async function (next) { 
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})
UserSchema.methods.isPassowrdCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function() {
    JWT.sign(
        {
            _id:this._id,
            email: this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function () {
    JWT.sign(
        {
            _id:this._id,
            email: this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_SECRET
        }
    )
}

export const User = mongoose.model("User",UserSchema);