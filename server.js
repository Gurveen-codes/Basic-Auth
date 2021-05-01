import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

import errorMiddleware from "./middleware/errorMiddleware.js";
import { loginUser, registerUser } from "./controllers/userController.js";

const app = express();

dotenv.config();

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(morgan("dev"));

app.route("/register").post(registerUser);
app.route("/login").post(loginUser);

app.get("/", (req, res) => {
	res.json({ message: "Hello There!" });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`.yellow.bold);
});