import mongoose from "mongoose";
import app from "./app";
import { config } from "./app/config";
import { userUtils } from "./utils/user.utils";
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(config.DB_URL!);
    await userUtils.adminSeed();
    console.log("Connected to Databse");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to Database", error);
    process.exit(1);
  }
};

startServer();
