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
    origin: function (origin, callback) {

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


app.options("*", cors());


app.use(express.json());

app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/dashboard", dashboardRoutes);



app.get("/", (req, res) => {
  res.json({
    message: "Progress Tracker API running",
  });
});


module.exports = app;