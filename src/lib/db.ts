// Importing mongoose library along with Connection type from it
import {connect} from "mongoose";

// Declaring a variable to store the cached database connection
let isConnected = (global as any)?.isConnected;

export async function connectToDataBase() {
  const mongoURL = process.env.MONGODB_URI;
  console.log({mongoURL});
  // If a cached connection exists, return it
  if (isConnected) {
    console.log("Using cached db connection");
    console.log(isConnected);
    return isConnected;
  }
  try {
    // If no cached connection exists, establish a new connection to MongoDB
    const cnx = await connect(mongoURL!);
    // Cache the connection for future use
    isConnected = cnx.connections[0]?.readyState;
    console.log(isConnected);
    console.log("New mongodb connection established");
    return isConnected ;
  } catch (error) {
    console.log(error);
    // throw error;
  }
}