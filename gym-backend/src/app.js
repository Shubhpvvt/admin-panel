const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const gymOwnerRoutes = require("./routes/gymOwner.routes");
const trainerRoutes = require("./routes/trainer.routes");
const gymRoutes = require("./routes/gym.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 * ✅ CORS FIX (LOCAL + VERCEL)
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://admin-panel-lake-six.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/gym-owners", gymOwnerRoutes);
app.use("/trainers", trainerRoutes);
app.use("/gyms", gymRoutes);

module.exports = app;
