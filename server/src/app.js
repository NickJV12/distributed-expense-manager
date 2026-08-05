const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.route");
const groupRoutes = require("./routes/group.route");
const expenseRoutes = require("./routes/expense.route");
const settlementRoutes = require("./routes/settlement.route");
const dashboardRoutes = require("./routes/dashboard.route");
const analyticsRoutes = require("./routes/analytics.route");
const paymentRoutes = require("./routes/payment.route");

const errorHandler = require("./middleware/error.middleware");
const apiLimiter = require("./middleware/rateLimiter.middleware");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// ===============================
// Security Middleware
// ===============================
app.use(helmet());

// ===============================
// CORS Configuration
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin (Postman, Thunder Client)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ===============================
// Body Parser
// ===============================
app.use(express.json());

// ===============================
// Logger
// ===============================
app.use(morgan("dev"));

// ===============================
// Rate Limiter
// ===============================
app.use(apiLimiter);

// ===============================
// API Routes
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api", expenseRoutes);
app.use("/api", settlementRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", analyticsRoutes);
app.use("/api", paymentRoutes);

// ===============================
// Swagger Documentation
// ===============================
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

// ===============================
// Health Check
// ===============================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SplitEase API is running!",
  });
});

// ===============================
// Global Error Handler
// ===============================
app.use(errorHandler);

module.exports = app;