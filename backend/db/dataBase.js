const mongoose = require("mongoose");

let isConnected;

const connectDB = async () => {
  if (isConnected) {
    return;
  }


  
  try {
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = connection.connections[0].readyState;
    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw new Error("MongoDB connection failed");
  }
};

module.exports = connectDB;










// const mongoose = require("mongoose");
// mongoose.set("strictPopulate", false);
// const connectDbWithRetry = async (dbURI, maxRetries) => {
//   console.log("🚀 ~ connectDbWithRetry ~ maxRetries:", maxRetries)
//   console.log("🚀 ~ connectDbWithRetry ~ dbURI:", dbURI)
//   for (let retries = 0; retries < maxRetries; retries++) {
//     try {
//       const uri = dbURI;
//       await mongoose.connect(uri, {
//         dbName: "e-commerce",
//         connectTimeoutMS: 20000,
//       });
//       console.log("Connected to MongoDB");

//       break;
//     } catch (err) {
//       console.log("Failed to connect to MongoDB: ${err}. Retrying...",err);
//       if (retries === maxRetries) {
//         console.error("Max connection retries reached.");
//         break;
//       }
//       await new Promise((resolve) => setTimeout(resolve, 5000));
//     }
//   }
// };

//  const connectDB = async () => {
//   await connectDbWithRetry(process.env.DB_URL, 2);
// };

// module.exports = connectDB;
