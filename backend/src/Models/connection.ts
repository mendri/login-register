import mongoose from "mongoose";

async function connectToDatabase(URI: string) {
    mongoose.set("strictQuery", true);
    await mongoose.connect(URI);
}

export default connectToDatabase;