import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { loginUser, registerUser } from "./controllers/userController.js";

const app = express();

dotenv.config();
connectDB();

//Accept json data in req body
app.use(express.json());
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded
app.use(morgan("dev"));

app.post("/register", registerUser);
app.route("/login").post(loginUser);

app.get("/", (req, res) => {
	res.send(req.body);
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`.yellow.bold);
});
