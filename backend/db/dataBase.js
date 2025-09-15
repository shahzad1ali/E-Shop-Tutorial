const mongoose = require("mongoose");
mongoose.set("strictPopulate", false);
const connectDbWithRetry = async (dbURI, maxRetries) => {
  console.log("🚀 ~ connectDbWithRetry ~ maxRetries:", maxRetries)
  console.log("🚀 ~ connectDbWithRetry ~ dbURI:", dbURI)
  for (let retries = 0; retries < maxRetries; retries++) {
    try {
      const uri = dbURI;
      await mongoose.connect(uri, {
        dbName: "e-commerce",
        connectTimeoutMS: 20000,
      });
      console.log("Connected to MongoDB");

      break;
    } catch (err) {
      console.log("Failed to connect to MongoDB: ${err}. Retrying...",err);
      if (retries === maxRetries) {
        console.error("Max connection retries reached.");
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

 const connectDB = async () => {
  await connectDbWithRetry(process.env.DB_URL, 2);
};

module.exports = connectDB;
