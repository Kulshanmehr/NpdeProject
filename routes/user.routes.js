import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

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

export default router;