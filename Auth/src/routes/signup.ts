import express from "express"
import type { Request, Response } from "express"
import {body} from "express-validator"
import jwt from "jsonwebtoken"

import { User } from "../models/User"
import { BadRequestError , validateRequest } from "@ticket-template/common"


const router = express.Router()

router.post("/signup",
    [body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")],
        validateRequest,
    async (req: Request, res: Response) => {
    const {email  , password} = req.body ;
    const existingUser = await User.findOne({email});
    if(existingUser){
        // console.log("Email in use")
        // return res.send({})
        throw new BadRequestError("Email already Exists!")
    }
    const user = User.build({ email , password})
    await user.save();
    // Generate JSON web token 

    const userJWT = jwt.sign({
        id : user.id , 
        email : user.email
    } , process.env.JWT_KEY!)

    //store it on session object
     req.session = {
        jwt : userJWT
     }
    res.status(201).send(user)
})

export {router as signupRouter}