import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI as string;
    const DB_NAME = process.env.DB_NAME as string;

    const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log(`\nMongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1);
  }
}

export { connectDB };