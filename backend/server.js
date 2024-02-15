import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// connectMongoDB();

// app.get("/", (req, res) => {
//   res.send("hellow CHarLie!!!");
// });

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`server running on port ${PORT}`);
});
