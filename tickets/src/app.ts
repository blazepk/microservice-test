import express from "express"
import "express-async-errors"
import { json } from "body-parser"
import cookieSession from "cookie-session"
//
import { errorHandler , NotFoundError , currentUser } from "@ticket-template/common"
import { createTicketRouter } from "./routes/new"
import { indexTicketRouter } from "./routes/index"
import { showTicketRouter } from "./routes/show"
import { updateTicketRouter } from "./routes/update"

const app = express()
app.set("trust proxy" , true)
app.use(json())
app.use(cookieSession({
    name : "session" ,
    signed : false,
    secure : process.env.NODE_ENV !== "test" , 
    httpOnly : process.env.NODE_ENV !== "test"
}))
app.use(currentUser)

app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)
app.use(errorHandler)
app.all("*" , () => {
    throw new NotFoundError()
})

export {app}