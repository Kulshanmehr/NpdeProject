import { Router } from "express";
import { loginUser,
    registerUser ,
    loggedUser , 
    refreshAccessToken,
    changeCurrentPassword,
    getUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory } from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/",(req,res)=>{


    return res.json({
        isWoking:"dlasjdlasj"
    })
})
    router.post('/register', 
      upload.fields([
        { name: 'avatar', maxCount: 1 },{ name : "coverImages" , maxCount : 1}
      ]), 
      registerUser
    );

    router.post('/login',loginUser);

    router.post('/logout',verifyJWT,loggedUser)

    router.post('/refreshAccessToken',refreshAccessToken)

    router.post('/changePassword',verifyJWT , changeCurrentPassword)

    router.post('/get-current-user',verifyJWT , getUser)

    router.patch("/update-account-detail",verifyJWT , updateAccountDetails)

    router.patch('/changeAvatarFile',verifyJWT,
      upload.single('avatar'),updateUserAvatar
    )

    router.patch('/changeCoverImage',verifyJWT , upload.single('coverImage'),updateUserCoverImage)

    router.post('/channel/:username',verifyJWT,getUserChannelProfile)
    router.post('/watchHistory',verifyJWT , getWatchHistory)



export default router;