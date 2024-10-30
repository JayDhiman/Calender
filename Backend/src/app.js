import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import authRoutes from "./routes/user.routes.js"
import eventRoutes from "./routes/events.routes.js"


const app = express()

//middleware
app.use(cors())  // we can set the options here
app.use(cookieParser())
app.use(express.json({
    limit:"16kb"
}))
app.use(urlencoded({extended:true,limit:"16kb"}))



// Routes
app.use('/api/v1/auth', authRoutes); // User authentication routes
app.use('/api/v1/events', eventRoutes); // Event management routes

// routes

export default app