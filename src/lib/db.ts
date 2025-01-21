// Importing mongoose library along with Connection type from it
import mongoose from "mongoose";

// Declaring a variable to store the cached database connection
let isConnected = (global as any)?.isConnected;

export async function connectToDataBase() {
  const mongoURL = process.env.MONGODB_URI;
  // If a cached connection exists, return it
  if (isConnected) {
    console.log("Using cached db connection");
    return isConnected;
  }
  try {
    // If no cached connection exists, establish a new connection to MongoDB
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // 10 seconds
      connectTimeoutMS: 50000,         // 50 seconds
    };
    const cnx = await mongoose.connect(mongoURL!, options);
    // Cache the connection for future use
    isConnected = cnx.connections[0]?.readyState;
    console.log("New mongodb connection established");
    return isConnected ;
  } catch (error) {
    console.log(error);
    return {error};
  }
}