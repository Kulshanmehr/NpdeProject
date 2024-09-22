import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import JWT from "jsonwebtoken";
export const verifyJWT = async(err,req,res,next) => {
try {
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    
       if(!token){
            throw new ApiError(401,"Unauthorized Request");
        }
    
        const decodedToken = await JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token");
        }
        req.user = user;
        next()
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid Access Token");
}
}