import express from "express"
import "express-async-errors"
import { json } from "body-parser"
import mongoose from "mongoose"
//
import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"
import { errorHandler } from "./middlewares/error-handler"
import { NotFoundError } from "./errors/not-found-error"
import { DatabaseConnectionError } from "./errors/database-connection-error"

const app = express()
app.use(json())
app.use("/api/users", currentUserRouter)
app.use("/api/users", signinRouter)
app.use("/api/users", signoutRouter)
app.use("/api/users", signupRouter)
app.all("*" , () => {
    throw new NotFoundError()
})
app.use(errorHandler)

const start = async () => {
   try{ 
    await mongoose.connect(`mongodb://auth-mongo-srv:27017/authDB` )
    console.log("connected to mongo db")}
    catch(err){
        console.error(err)
        throw new DatabaseConnectionError();
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000 !!!")
    })
}
start()
