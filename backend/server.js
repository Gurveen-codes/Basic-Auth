import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import sessions from "client-sessions";

import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { loginUser, registerUser } from "./controllers/userController.js";

const app = express();

dotenv.config();
connectDB();

app.use(cors());

/*  app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});*/

//* Session Middleware
// app.use(
// 	sessions({
// 		cookieName: "session",
// 		secret: process.env.SESSION_SECRET,
// 		duration: 30 * 60 * 1000,
// 	})
// );
//Accept json data in req body
app.use(express.json());
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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
