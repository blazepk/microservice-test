import express from "express"
import type { Request , Response } from "express"
import {body} from "express-validator"
import  jwt  from 'jsonwebtoken';

import {validateRequest} from "../middlewares/validate-request"
import { BadRequestError } from "../errors/bad-request-error"
import { User } from "../models/User"
import { PasswordManager } from './../services/password-hashing';

const router = express.Router()

router.post("/signin", [
    body("email")
    .isEmail()
    .withMessage("Email must be valid"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("You must apply a password")
],
 validateRequest 
 ,async (req : Request, res : Response) => {
   const  {email , password} = req.body;
   
   const existingUser = await User.findOne({email});
   if(!existingUser){
    throw new BadRequestError("Invalid Credentials")
   }
   const passwordMatch = await PasswordManager.compare(existingUser?.password , password)
   if(!passwordMatch){
    throw new BadRequestError("Invalid Credentials")
   }
   const userJWT = jwt.sign({
    id : existingUser.id , 
    email : existingUser.email
} , process.env.JWT_KEY!)
// console.log("userjwt" , userJWT)
//store it on session object
 req.session = {
    jwt : userJWT
 }
res.status(200).send(existingUser)
 })

export {router as signinRouter}