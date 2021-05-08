import User from "../model/userModel.js";

const userMiddleware = async (req, res, next) => {
	if (!req.session && !req.session.userId) {
		next();
	}

	const user = await User.findById(req.session.userId).select("-password");

	if (!user) {
		next();
	}

	req.user = user;
	next();
};

export default userMiddleware;
