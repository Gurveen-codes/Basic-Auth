//* Show User on Dashboard
const user = JSON.parse(localStorage.getItem('currentUser'))
if (user) {
	const title = document.querySelector('.title')
	title.textContent = `Hello ${user.name}!`

	const logout = document.querySelector('.logout-btn')
	logout.style.visibility = 'visible'
	logout.addEventListener('click', () => {
		if (user) {
			localStorage.removeItem('currentUser')
			window.location.replace('index.html')
		}
	})
}

//* Show Password
const showPassword = () => {
	let x = document.getElementById('password')
	if (x.type === 'password') {
		x.type = 'text'
	} else {
		x.type = 'password'
	}
}

//* Retreive and send form data
const form = document.querySelector('form')

if (form) {
	form.addEventListener('submit', function (e) {
		e.preventDefault()
		const formData = new FormData(form)
		let myData = {}
		for (let val of formData.entries()) {
			myData[val[0]] = val[1]
		}

		axios({
			method: 'POST',
			url: this.action,
			data: myData,
		})
			.then(({ data }) => {
				localStorage.setItem('currentUser', JSON.stringify(data))
				window.location.replace('index.html')
			})
			.catch((err) => console.log(err))
	})
}
