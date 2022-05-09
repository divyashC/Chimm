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

const sign_in = document.getElementById("sign_in_form");

sign_in.addEventListener("submit", (e) => {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	auth
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			var user = auth.currentUser;

			var database_ref = database.ref();

			var user_data = {
				last_login: Date.now(),
			};

			database_ref.child("users/" + user.uid).update(user_data);

			alert("Signed In successfully");

			setTimeout(() => {
				sign_in.reset();
			}, 1000);

			window.location.href = "../index.html";
		})
		.catch((error) => {
			var error_code = error.code;
			var error_message = error.message;
			alert(error_code + " " + error_message);
		});
});
