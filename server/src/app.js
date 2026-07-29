const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.route");
const errorHandler = require("./middleware/error.middleware");
const groupRoutes = require("./routes/group.route");

const app = express();

//Security middleware
app.use(helmet());

//Allow frontend requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Log incoming requests
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use(errorHandler);

//Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "DEM API is running!!",
    });
});

module.exports = app;
