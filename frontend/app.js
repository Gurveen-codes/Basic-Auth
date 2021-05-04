const showPassword = () => {
	let x = document.getElementById("password");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
};

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	let myData = {};
	for (let val of formData.entries()) {
		myData[val[0]] = val[1];
	}

	axios({
		method: "POST",
		url: this.action,
		data: myData,
	})
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
});
