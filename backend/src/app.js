const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const trackRoutes = require("./routes/track.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://progress-tracker-zeta-teal.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;