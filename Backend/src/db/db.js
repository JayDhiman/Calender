import mongoose from "mongoose";
import { DB_NAME } from "../constent.js";




const connectDB = async () => {
  try {
   const connectionInstance =  await  mongoose.connect(`${process.env.MONOGODB_URL}/${DB_NAME}`);
   console.log(`\n MongoDB connected !! DB host: ${connectionInstance.connection.host}`)

  

  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB
