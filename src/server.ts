import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./utlis/auth";
import { createUser, signIn } from "./handlers/user";

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
app.post("/user", createUser);
app.post("/signin", signIn);

export default app;
