import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log("✅MongoDB successfully connected.");
    })
    connection.on('error',(err)=>{
        console.log(`❌MongoDB connection error: ${err}`);
        process.exit(1);
    })
  } catch (error) {
    console.log(`❌MongoDB connection error: ${error}`);
    process.exit(1);
  }
};
