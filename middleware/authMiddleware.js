import User from '../model/userModel.js'

const isLoggedIn = async (req, res, next) => {
	if (!req.session && !req.session.userId) {
		return res.redirect('/login')
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
