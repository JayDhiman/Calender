import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import authRoutes from "./routes/user.routes.js"
import eventRoutes from "./routes/events.routes.js"
import startCronJobs from "./service/cronService.js"
import errorHandler from "./middleware/errorHandler.middleware.js"


const app = express()

//middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600, // Cache preflight response for 10 minutes
}));

    // we can set the options here
app.use(cookieParser())
app.use(express.json({
    limit:"16kb"
}))
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
startCronJobs()

// Routes
app.use('/api/v1/auth', authRoutes); // User authentication routes
app.use('/api/v1/events', eventRoutes); // Event management routes

// routes

app.use(errorHandler)

export default app