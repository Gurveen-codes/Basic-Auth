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
const form = document.querySelector('.form')

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
				window.location.href = '/'
			})
			.catch((err) => console.log(err))
	})
}

//* Toggle logout button visibility
const logout = document.querySelector('.logout-btn')
const adminBtn = document.querySelector('.admin')
const currentUser = localStorage.getItem('currentUser')
if (logout && adminBtn && currentUser) {
	adminBtn.style.visibility = 'visible'
	logout.style.visibility = 'visible'
}
//remove currentUser from localStorage
if (logout) {
	logout.addEventListener('submit', () => {
		localStorage.removeItem('currentUser')
		// window.location.href = '/'
	})
}
