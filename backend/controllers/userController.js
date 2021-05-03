import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const alreadyExist = await User.findOne({ email });

	if (alreadyExist) {
		res.status(400);
		throw new Error("User already exist");
	} else {
		const user = await User.create({ name, email, password });
		if (!user) {
			res.status(400);
			throw new Error("Invalid user details");
		}
		res.status(201);
		res.json(user);
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		if (user.password !== password) {
			res.status(401);
			throw new Error("Invalid Password");
		}
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export { registerUser, loginUser };
