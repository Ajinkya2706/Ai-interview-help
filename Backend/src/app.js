const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

// Get frontend URL from environment or use default
const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173"

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [frontendURL, "http://localhost:5173"],
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