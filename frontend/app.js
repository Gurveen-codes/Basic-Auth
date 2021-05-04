// const axios = require(axios);

const showPassword = () => {
	let x = document.getElementById("password");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
};

const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(loginForm);
	let loginData = {};
	for (let val of formData.entries()) {
		loginData[val[0]] = val[1];
	}

	axios({
		method: "POST",
		url: "http://127.0.0.1:8000/login",
		data: loginData,
	})
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
});
