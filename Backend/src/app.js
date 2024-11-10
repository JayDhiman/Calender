import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import authRoutes from "./routes/user.routes.js"
import eventRoutes from "./routes/events.routes.js"
import startCronJobs from "./service/cronService.js"


const app = express()

//middleware
app.use(cors({
    
        origin: 'http://localhost:5173', 
        credentials: true,  
    
}))  // we can set the options here
app.use(cookieParser())
app.use(express.json({
    limit:"16kb"
}))
app.use(urlencoded({extended:true,limit:"16kb"}))

startCronJobs()

// Routes
app.use('/api/v1/auth', authRoutes); // User authentication routes
app.use('/api/v1/events', eventRoutes); // Event management routes

// routes

export default app