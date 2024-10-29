import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'


const app = express()

//middleware
app.use(cors())  // we can set the options here
app.use(cookieParser())
app.use(express.json({
    limit:"16kb"
}))
app.use(urlencoded({extended:true,limit:"16kb"}))

// routes

export default app