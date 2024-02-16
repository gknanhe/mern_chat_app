import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectMongoDB from "./db/connectMongoDB.js";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
// console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;
// console.log(PORT);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true, //for headers cookies
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// connectMongoDB();

// app.get("/", (req, res) => {
//   res.send("hellow CHarLie!!!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`server running on port ${PORT}`);
});
