// Importing mongoose library along with Connection type from it
import mongoose from "mongoose";

// Declaring a variable to store the cached database connection
let isConnected = (global as any)?.isConnected;

export async function connectToDataBase(username:string, password:string) {
  const mongodb_uri=`mongodb+srv://${username}:${password}@fabreport.wgptk.mongodb.net/?retryWrites=true&w=majority&appName=fabreport`
  // If a cached connection exists, return it
  if (isConnected) {
    console.log("Using cached db connection");
    return isConnected;
  }
  try {
    // If no cached connection exists, establish a new connection to MongoDB
    const cnx = await mongoose.connect(mongodb_uri);
    // Cache the connection for future use
    isConnected = cnx.connections[0]?.readyState;
    console.log("New mongodb connection established");
    return isConnected ;
  } catch (error) {
    console.log(error);
    // throw error;
  }
}