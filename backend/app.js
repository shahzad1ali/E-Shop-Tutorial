// const express = require("express");
// const ErrorHandler = require("./middleware/error");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Enable CORS for frontend
// app.use(
//   cors({
//     origin: ["https://multivendor-self.vercel.app"], // frontend domains
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// // app.options("*", cors());


// // ✅ Serve uploads folder correctly (outside backend)
// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
// app.use("/test", (req, res) => {
//   res.send("Hello world!");
// });

// // Load environment variables (non-production)
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "config/.env" });
// }

// // Import routes
// const user = require("./controller/user");
// const shop = require("./controller/shop");
// const product = require("./controller/product");
// const event = require("./controller/event");
// const coupon = require("./controller/coupounCode");
// const payment = require("./controller/payment");
// const order = require("./controller/order");
// const conversation = require("./controller/conversation");
// const message = require("./controller/message");
// const withdraw = require("./controller/withdraw");

// // Use routes
// app.use("/api/v2/user", user);
// app.use("/api/v2/message", message);
// app.use("/api/v2/conversation", conversation);
// app.use("/api/v2/shop", shop);
// app.use("/api/v2/product", product);
// app.use("/api/v2/event", event);
// app.use("/api/v2/coupon", coupon);
// app.use("/api/v2/payment", payment);
// app.use("/api/v2/order", order);
// app.use("/api/v2/withdraw", withdraw);

// // Handle favicon requests (to avoid noisy logs)
// app.get("/favicon.ico", (req, res) => res.status(204).end());
// app.get("/favicon.png", (req, res) => res.status(204).end());

// // Catch-all for undefined API routes


// // Global error handling
// app.use(ErrorHandler);

// module.exports = app;




// app.js
const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS setup
const allowedOrigins = [
  "https://e-shop-zeta-indol.vercel.app", // frontend deployed on Vercel
  "http://localhost:3000",                // local dev (optional)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// Static file serving
app.use("/", express.static(path.join(__dirname, "./uploads")));

// Test route
app.use("/test", (req, res) => {
  res.send("Hello Api Tested!");
});

app.use(bodyParser.urlencoded({ extended: true }));

// CONFIG
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// IMPORT ROUTES
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/cupon");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conservation = require("./controller/conservation");
const message = require("./controller/messages");
const withdraw = require("./controller/withdraw");

// ROUTES
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conservation", conservation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

// ERROR HANDLING
app.use(ErrorHandler);

module.exports = app;
