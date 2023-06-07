import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./utlis/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

// preflight check - currently everyone is allowed
app.use(cors());

// logger
app.use(morgan("dev"));

// allows client to send json to server
app.use(express.json());
// allows client to send query strings to server
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", protect, router);

// user auth routes
app.post("/createuser", createNewUser);
app.post("/signin", signIn);

app.use((error, req, res, next) => {
  if (error.type === "auth") {
    res.status(401).json({ message: `authentication error` });
  } else if (error.type === "input") {
    res
      .status(401)
      .json({ message: `input has an error, error: ${error.message}` });
  } else {
    res
      .status(500)
      .json({ message: `oops thats on us, error: ${error.message}` });
  }
});

export default app;
