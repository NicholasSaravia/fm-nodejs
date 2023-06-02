import app from "./server";

// load all env variables
import * as dotenv from "dotenv";
dotenv.config();

app.listen(3001, () => {
  console.log("Server running on port http://localhost:3001");
});
