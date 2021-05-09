import path from 'path'
import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'

import connectDB from './config/db.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import { isLoggedIn, alreadyLoggedIn } from './middleware/authMiddleware.js'
import { loginUser, registerUser } from './controllers/userController.js'

const app = express()

dotenv.config()
connectDB()

app.use(cors())

/*  app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});*/

//* Session Middleware
app.use(
	session({
		name: 'sid',
		resave: false,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
		cookie: {
			maxAge: 1000 * 60 * 30, //30 minutes
			sameSite: true,
			secure: process.env.NODE_ENV === 'production',
		},
	})
)

//Accept json data in req body
app.use(express.json())
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/frontend')))

app.get('/register', alreadyLoggedIn, (req, res) => {
	res.sendFile(path.resolve(__dirname, 'frontend', 'register.html'))
})

app.get('/login', alreadyLoggedIn, (req, res) => {
	res.sendFile(path.resolve(__dirname, 'frontend', 'login.html'))
})

app.get('/admin', isLoggedIn, (req, res) => {
	res.send(`<h1>Hello Admin</h1>`)
})

app.get('/', (req, res) => {
	console.log('home', req.session)
	res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
})

app.post('/register', registerUser)
app.post('/login', loginUser)

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
})

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`.yellow.bold)
})
