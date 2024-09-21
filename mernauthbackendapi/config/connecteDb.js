import mongoose from "mongoose";
const connectDb = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "sonuWebTech",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
