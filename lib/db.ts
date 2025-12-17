import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;



if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

// ===1 bc when db is connected it shows 1 , 0 if not connected and 2 if connecting and 3 if disconnected so we try connecting
export const connect = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};