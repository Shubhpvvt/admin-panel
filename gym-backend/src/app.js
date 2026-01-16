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

// ✅ FINAL SIMPLE CORS (TOKEN BASED)
app.use(
  cors({
    origin: "*"
  })
);

// ❌ REMOVE app.options("*", cors());  (NOT NEEDED)

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/gym-owners", gymOwnerRoutes);
app.use("/trainers", trainerRoutes);
app.use("/gyms", gymRoutes);

module.exports = app;
