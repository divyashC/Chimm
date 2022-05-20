// Phone Number
// const phoneInputField = document.querySelector("#phone_no");
// const phoneInput = window.intlTelInput(phoneInputField, {
// 	utilsScript:
// 		"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
// });

const firebaseConfig = {
	apiKey: "AIzaSyCi9rsoRJogatOKu_XT7VA1H26Ccv4Y4uQ",
	authDomain: "chimm-4b7b0.firebaseapp.com",
	databaseURL: "https://chimm-4b7b0-default-rtdb.firebaseio.com",
	projectId: "chimm-4b7b0",
	storageBucket: "chimm-4b7b0.appspot.com",
	messagingSenderId: "807500885561",
	appId: "1:807500885561:web:34973c28f4717935f7e7e8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

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
	var photo = document.getElementById("photo").files[0];

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
			var storage_ref = storage.ref();

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

			database_ref.child("users/" + user.uid + "/user_data/").set(user_data);
			storage_ref
				.child("users/" + user.uid + "/user_details" + "/profilePicture")
				.put(photo);

			setTimeout(() => {
				store_data(user.uid);
			}, 1000);

			alert("Signed Up successfully");

			reset_and_redirect();
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

const store_data = (user_id) => {
	var realtime_user_data = database
		.ref()
		.child("users/" + user_id + "/user_data");
	realtime_user_data.once("value", function (snapshot) {
		var curr_user_data = snapshot.val();
		storage
			.ref("users/" + user_id + "/user_details" + "/profilePicture")
			.getDownloadURL()
			.then(function (url) {
				curr_user_data.profilePicture = url;
				localStorage.setItem("user", JSON.stringify(curr_user_data));
			});
	});
};

const reset_and_redirect = () => {
	setTimeout(() => {
		sign_up.reset();
		window.location.href = "/html/profile.html";
	}, 4000);
};
