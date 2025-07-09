import { Router,Express } from "express";
import { protectedroute } from "../middleware/protected.middleware";
import { getmessage, getusers, search, sendmessage } from "../controller/message.controller";

const router=Router()

router.get('/search',protectedroute,search)
router.get('/getusers',protectedroute,getusers)
router.post('/sendmessage/:_id',protectedroute,sendmessage)
router.get('/getmessage/:_id',protectedroute,getmessage)

export default router