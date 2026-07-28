const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const trackRoutes = require("./routes/track.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(
  cors({
    origin: "https://progress-tracker-zeta-teal.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;