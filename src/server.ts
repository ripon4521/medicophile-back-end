import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function server() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(3000, () => {
      console.log(
        `School Mangement  Server is running on port ${config.port} - Alhamdulillah`,
      );
    });
  } catch (error) {
    console.error(error);
  }
}

server();
