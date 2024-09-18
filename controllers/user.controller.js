import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadCLoudinary}   from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken(); 
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Sonmething went wrong while generating and refresh tokens");
    }
}

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

const loginUser = async(req,res) => {
    // req body -> data
    // username or email 
    // find the user
    // password check
    // access and refresh token
    //send cookie

    const {username,email,password}  = req.body;
    if(!username  || !email){
        throw new ApiError(400,"Username or email is required");
    }
    const user = await User.findOne({
        $or : [{username},{email}]
    })

    if(!user){
        throw new ApiError(400,"User Does not exist");
    }
    const isPasswordValid = await user.isPassowrdCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(400,"Password is not correct");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
    //cookie
    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200)
              .cookie("accessToken",accessToken , options)
              .cookie('refreshToken', refreshToken, options)
              .json(
                new ApiResponse(200,{
                    user : loggedInUser,refreshToken,accessToken
                },"User Logge in Successfully")
              )
}

const loggedUser = async(req,res) =>  {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : undefined
            },
        },    
        {
            new : true,
        }
    )
    const options = {
        httpOnly : true,
        secure : true
    }
    return res
            .status(200)
            .clearCookie("accessToken",options)
            .clearCookie("refreshToken",options)
            .json(new ApiResponse(200, {}, "User Logged Out"))
}

export {
    registerUser,
    loginUser,
    loggedUser

};