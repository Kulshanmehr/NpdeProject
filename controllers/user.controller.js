import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadCLoudinary}   from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser =  async(req,res) => {
   const {fullname,email,username,password} = req.body;
//    if(fullname === ""){
//         throw new ApiError(400,"fullname is required");
//    }
    if (
        [fullname,email,username,password].some((fields)=>{
            fields.trim() === ""
        })
    ) {
        throw new ApiError(400,"All Fields are required");
    }

    const existUser = await User.findOne({
        $or : [{ username },{ email }]
    })
    console.log(existUser,"existUser");
    
    if(existUser){
        throw new ApiError(409,"User with Username or email already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImages[0]?.path;
    console.log(avatarLocalPath);
    
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }
    console.log(req.files?.avatar[0]);
    console.log(req.files?.avatar[0]);
    
    // const avatar = await uploadCLoudinary(avatarLocalPath);
    // const coverImage = await uploadCLoudinary(coverImageLocalPath); 
    // if(!coverImageLocalPath){
    //     throw new ApiError(400,"Avatar file is required");
    // // }
    // if (!avatar) {
    //     throw new ApiError(400,"Avatar file is required");
    // }

    const userCreate =await User.create({
        fullname,
        avatar : req.files?.avatar[0]?.filename,    
        coverImage : req.files?.coverImages[0]?.filename || "",
        email,
        username : username.toLowerCase(),
        password
    })

        const createdUser = await User.findById(userCreate._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(400,"Someting went wrong while creating the user");
        
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )
}


export {registerUser};