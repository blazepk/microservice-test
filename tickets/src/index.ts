
import mongoose from "mongoose"
import {app} from "./app"
import { DatabaseConnectionError } from "@ticket-template/common"

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT KEY not found in enviroment variable")
    }
    if(!process.env.MONGO_URI){
        throw new Error("MONGO URI not found in enviroment variable")
    }
   try{ 
    await mongoose.connect(process.env.MONGO_URI!)
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
