import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const alreadyExist = await User.find({ email });

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

const loginUser = asyncHandler(async (req, res) => {});

export { registerUser, loginUser };
