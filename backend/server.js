const { default: mongoose } = require("mongoose");
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
const port = process.env.PORT;

const main = async () => {
  try {
    await connectDB();
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}.`);
    });
  } catch (error) {
    await mongoose.disconnect();
    app.close((err) => {
      console.log(err);
    });
    console.log("failed to start server", error);
  }
};

main();
