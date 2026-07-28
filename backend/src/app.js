const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const trackRoutes = require("./routes/track.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;