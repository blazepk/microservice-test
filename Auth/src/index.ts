
import mongoose from "mongoose"
import {app} from "./app"
import { DatabaseConnectionError } from "./errors/database-connection-error"

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT KEY not found in enviroment variable")
    }
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
