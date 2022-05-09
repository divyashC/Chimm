// Phone Number
// const phoneInputField = document.querySelector("#phone_no");
// const phoneInput = window.intlTelInput(phoneInputField, {
// 	utilsScript:
// 		"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
// });

const firebaseConfig = {
	apiKey: "AIzaSyB3wWKGE4qmRph9rSu7v6k4x44noqy11pE",
	authDomain: "chimm-ef62e.firebaseapp.com",
	databaseURL: "https://chimm-ef62e-default-rtdb.firebaseio.com",
	projectId: "chimm-ef62e",
	storageBucket: "chimm-ef62e.appspot.com",
	messagingSenderId: "758715245148",
	appId: "1:758715245148:web:623f3425d60f61e0963c99",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const sign_up = document.getElementById("sign_up_form");

sign_up.addEventListener("submit", (e) => {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const phone_no = document.getElementById("phone_no").value;
	const full_name = document.getElementById("full_name").value;
	const dob = document.getElementById("dob").value;
	const gender = document.getElementById("gender").value;
	const password = document.getElementById("password").value;
	const retype_password = document.getElementById("retype_password").value;
	// const photo = document.getElemebtByID("#photo").value;

	if (compare_password(password, retype_password) == false) {
		alert("Password does not match!!");
		return;
	}
	if (validate_phone(phone_no) == false) {
		alert("Phone number is not 8 digits!!");
		return;
	}

	auth
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
			var user = auth.currentUser;

			var database_ref = database.ref();

			var user_data = {
				user_id: user.uid,
				email: email,
				phone_no: phone_no,
				full_name: full_name,
				dob: dob,
				gender: gender,
				password: password,
				last_login: Date.now(),
			};
			database_ref.child("users/" + user.uid).set(user_data);

			alert("Signed Up successfully");

			setTimeout(() => {
				sign_up.reset();
			}, 1000);

			window.location.href = "../index.html";
		})
		.catch((error) => {
			var error_code = error.code;
			var error_message = error.message;
			alert(error_code + " " + error_message);
		});
});

const compare_password = (password, retype_password) => {
	return password == retype_password ? true : false;
};

const validate_phone = (phone) => {
	return phone.length == 8 ? true : false;
};
