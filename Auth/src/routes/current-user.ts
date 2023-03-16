import express from "express"
import type { Request, Response } from "express"

import { currentUser } from "@ticket-template/common"

const router = express.Router()

router.get("/currentuser", currentUser  ,(req : Request , res : Response) => {
   res.send({currentUser : req.currentUser})
})
   

export {router as currentUserRouter}