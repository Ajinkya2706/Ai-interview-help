const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

// Get frontend URL from environment or use default
const frontendURL = process.env.FRONTEND_URL || "https://ai-interview-help.vercel.app"

app.use(express.json())
app.use(cookieParser())

// Dynamic CORS - allow Vercel URLs + localhost
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow localhost
        if (origin.includes("localhost")) return callback(null, true);
        
        // Allow all Vercel URLs
        if (origin.includes("vercel.app")) return callback(null, true);
        
        // Allow Render URLs
        if (origin.includes("onrender.com")) return callback(null, true);
        
        // Block other origins
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}))

// Root route for health check
app.get("/", (req, res) => {
    res.json({ message: "Server is running" })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app