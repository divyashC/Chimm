const firebaseConfig = {
	apiKey: "AIzaSyCi9rsoRJogatOKu_XT7VA1H26Ccv4Y4uQ",
	authDomain: "chimm-4b7b0.firebaseapp.com",
	databaseURL: "https://chimm-4b7b0-default-rtdb.firebaseio.com",
	projectId: "chimm-4b7b0",
	storageBucket: "chimm-4b7b0.appspot.com",
	messagingSenderId: "807500885561",
	appId: "1:807500885561:web:34973c28f4717935f7e7e8",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

const ls_user_data = JSON.parse(localStorage.getItem("user"));
const buttons = document.getElementById("button");
const profile = document.getElementById("profile_group");
const sign_out = document.getElementById("sign_out_button");
const username_container = document.getElementById("username");
const navbar_profile_container = document.getElementById(
	"profile_picture_image"
);

sign_out.addEventListener("click", (e) => {
	e.preventDefault();
	localStorage.removeItem("user");
	buttons.classList.remove("hidden");
	profile.classList.add("hidden");
	auth.signOut();
	setTimeout(() => {
		window.location.href = "/index.html";
	}, 2000);
});

if (localStorage.getItem("user")) {
	buttons.classList.add("hidden");
	profile.classList.remove("hidden");

	if (ls_user_data.full_name != null) {
		const username_text = `Hi, ${ls_user_data.full_name.split(" ")[0]}`;
		username_container.innerHTML = username_text;
	}

	if (ls_user_data.profilePicture != null) {
		navbar_profile_container.src = ls_user_data.profilePicture;
	}
}

// auth.onAuthStateChanged((user) => {
// 	if (user) {
// 		buttons.classList.add("hidden");
// 		profile.classList.remove("hidden");
// 	} else {
// 		buttons.classList.remove("hidden");
// 		profile.classList.add("hidden");
// 	}

// 	if (ls_user_data.full_name != null) {
// 		const username_text = `Hi, ${ls_user_data.full_name.split(" ")[0]}`;
// 		username_container.innerHTML = username_text;
// 	}

// 	if (ls_user_data.profilePicture != null) {
// 		navbar_profile_container.src = ls_user_data.profilePicture;
// 	}
// });

const dropdown = () => {
	const dropdown_menu = document.getElementById("drop_down_menu");
	dropdown_menu.classList.toggle("show");
};
