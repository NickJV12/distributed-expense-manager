const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.route");
const errorHandler = require("./middleware/error.middleware");
const groupRoutes = require("./routes/group.route");
const expenseRoutes = require("./routes/expense.route");
const settlementRoutes = require("./routes/settlement.route");
const dashboardRoutes = require("./routes/dashboard.route");
const analyticsRoutes = require("./routes/analytics.route");
const paymentRoutes = require("./routes/payment.route");
const apiLimiter = require("./middleware/rateLimiter.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

//Security middleware
app.use(helmet());

//Allow frontend requests
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Parse JSON request bodies
app.use(express.json());

// Log incoming requests
app.use(morgan("dev"));

app.use(apiLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api", expenseRoutes);
app.use("/api", settlementRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", analyticsRoutes);
app.use("/api", paymentRoutes);
app.use(errorHandler);
app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check server status
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is running
 */

//Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "DEM API is running!!",
    });
});

module.exports = app;
