import mongoose from "mongoose";



const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("DB connection is successfull");

    } catch (error) {
      
        process.exit(1);
    }
}

export default connectDB;