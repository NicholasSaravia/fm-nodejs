import app from "./server";
import config from "../config";

// load all env variables
import * as dotenv from "dotenv";
dotenv.config();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
