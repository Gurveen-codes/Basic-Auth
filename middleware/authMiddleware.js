import User from '../model/userModel.js'

const isLoggedIn = async (req, res, next) => {
	if (!req.session && !req.session.userId) {
		return res.redirect('/login')
	} else {
		const user = await User.findById(req.session.userId).select('-password')

		if (!user) {
			return res.redirect('/login')
		}
		req.user = user
	}

	next()
}

const alreadyLoggedIn = async (req, res, next) => {
	if (req.session && req.session.userId) {
		return res.redirect('/admin')
	}
	next()
}
export { isLoggedIn, alreadyLoggedIn }
