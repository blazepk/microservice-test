import express from "express"
import "express-async-errors"
import { json } from "body-parser"
import mongoose from "mongoose"
import cookieSession from "cookie-session"
//
import { errorHandler , NotFoundError } from "@ticket-template/common"

const app = express()
app.set("trust proxy" , true)
app.use(json())
app.use(cookieSession({
    name : "session" ,
    signed : false,
    secure : process.env.NODE_ENV !== "test" , 
    httpOnly : process.env.NODE_ENV !== "test"
}))

app.all("*" , () => {
    throw new NotFoundError()
})
app.use(errorHandler)

export {app}