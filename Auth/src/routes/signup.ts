import express from "express"

const router = express.Router()

router.post("/signup", (req , res) => {
    const { email, password } = req.body

})

export {router as signupRouter}