import mongoose from "mongoose";

export default async function connectDB() {
  const state = mongoose.connection.readyState;

  if (state === 1) {
    console.log("Already connected");
    return;
  }

  if (state === 2) {
    console.log("Connection already in progress…");
    await mongoose.connection.asPromise();
    return;
  }

  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connection is fully open");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "Social-media-automation",
    });

    await mongoose.connection.asPromise(); // wait for full open

  } catch (err) {
    console.error("DB Connection Failed:", err);
    throw err;
  }
}
