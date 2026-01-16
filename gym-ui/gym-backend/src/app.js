const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// DB connect
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use("/api/gyms", require("./routes/gym.routes"));
app.use("/api/gym-owners", require("./routes/gymOwner.routes"));
app.use("/api/trainers", require("./routes/trainer.routes"));
const dashboardRoutes = require("./routes/dashboard.routes");

app.use("/api/dashboard", dashboardRoutes);




app.get('/', (req, res) => {
  res.send('Gym Backend Running');
});

module.exports = app;

