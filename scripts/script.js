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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

const buttons = document.getElementById("button");
const profile = document.getElementById("profile_group");

const sign_out = () => {
	localStorage.removeItem("user");
	buttons.classList.remove("hidden");
	profile.classList.add("hidden");
	setTimeout(() => {
		window.location.href = "/index.html";
	}, 1500);
};

const ls_user_data = JSON.parse(localStorage.getItem("user"));

if (localStorage.getItem("user")) {
	buttons.classList.add("hidden");
	profile.classList.remove("hidden");

	const navbar_profile_container = document.getElementById(
		"profile_picture_image"
	);
	var storageRef = storage.ref("users/" + ls_user_data.uid + "/profilePicture");
	storageRef.getDownloadURL().then(function (url) {
		navbar_profile_container.src = url;
	});

	const username_container = document.getElementById("username");
	username_container.innerHTML = ls_user_data.full_name;
}

// var database_ref = database.ref();
// var realtime_user_data = database_ref.child("users/" + user.uid);
// // localStorage.setItem("user", JSON.stringify(realtime_user_data));

// realtime_user_data
// 	.get()
// 	.then((snapshot) => {
// 		if (snapshot.exists()) {
// 			console.log(snapshot.val());
// 		} else {
// 			console.log("No data available");
// 		}
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
