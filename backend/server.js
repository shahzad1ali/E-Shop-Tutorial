const app = require("./app");
const connectDB = require("./db/dataBase");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "config/.env" });

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`❌ Uncaught Exception: ${err.message}`);
});

// ✅ Connect DB (once) before handling requests
(async () => {
  try {
    await connectDB();

    // 👉 If running locally, start server
    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log(`✅ Server running at http://localhost:${PORT}`);
      });
    }

    // 👉 On Vercel, export the app
    module.exports = app;

    // ✅ Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.log(`❌ Unhandled Rejection: ${err.message}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err.message);
  }
})();







// const { default: mongoose } = require("mongoose");
// const app = require("./app");
// const connectDB = require("./db/dataBase");
// const cloudinary = require("cloudinary").v2;
// require("dotenv").config({ path: "config/.env" });

// // ✅ Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// const port = process.env.PORT;

// const main = async () => {
//   try {
//     await connectDB();
//     // Start the server
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}.`);
//     });
//   } catch (error) {
//     await mongoose.disconnect();
//     app.close((err) => {
//       console.log(err);
//     });
//     console.log("failed to start server", error);
//   }
// };

// main();
