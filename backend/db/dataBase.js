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
