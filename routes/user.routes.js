import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js";
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

export default router;