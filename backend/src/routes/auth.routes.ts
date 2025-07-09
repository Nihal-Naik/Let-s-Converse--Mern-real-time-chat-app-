import { Router,Express } from "express";
import { signup,login,logout,checkauth, updateprofile } from "../controller/auth.controller";
import { protectedroute } from "../middleware/protected.middleware";

const router=Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/checkauth',protectedroute,checkauth)
router.post('/updateprofile',protectedroute,updateprofile)


export default router