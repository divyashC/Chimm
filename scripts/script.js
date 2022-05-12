const dropdown = () => {
	const dropdown_menu = document.getElementById("drop_down_menu");
	dropdown_menu.classList.toggle("show");
};

const firebaseConfig = {
	apiKey: "AIzaSyCi9rsoRJogatOKu_XT7VA1H26Ccv4Y4uQ",
	authDomain: "chimm-4b7b0.firebaseapp.com",
	databaseURL: "https://chimm-4b7b0-default-rtdb.firebaseio.com",
	projectId: "chimm-4b7b0",
	storageBucket: "chimm-4b7b0.appspot.com",
	messagingSenderId: "807500885561",
	appId: "1:807500885561:web:34973c28f4717935f7e7e8",
};

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const database = firebase.database();

// const buttons = document.getElementById("button_group");
// const profile = document.getElementById("profile_group");
// auth.onAuthStateChanged((user) => {
// 	if (user) {
// 		buttons.classList.add("hidden");
// 		profile.classList.remove("hidden");
// 	}
// });

// const logout = document.querySelector("sign_out_button");
// logout.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	auth.signOut().then(() => {
// 		alert("Signed Out Sucessfully!");
// 		buttons.classList.remove("hidden");
// 		profile.classList.add("hidden");
// 	});
// });
