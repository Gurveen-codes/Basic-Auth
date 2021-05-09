import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../model/userModel.js'

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const alreadyExist = await User.findOne({ email })

	if (alreadyExist) {
		res.status(400)
		throw new Error('User already exist')
	} else {
		const user = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
		})
		if (!user) {
			res.status(400)
			throw new Error('Invalid user details')
		}
		res.status(201)
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
		})
	}
})

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })
	if (user && (await user.matchPassword(password))) {
		res.status(200)
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

export { registerUser, loginUser }
