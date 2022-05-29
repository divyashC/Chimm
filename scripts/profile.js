const user_name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const dashboard_profile_container =
	document.getElementById("dashboard_profile");
const apt_rented = document.getElementById("apartment_rented");
const apt_listed = document.getElementById("apartment_listed");

if (ls_user_data != null) {
	if (ls_user_data.full_name != null) {
		user_name.innerHTML = ls_user_data.full_name;
	}

	if (ls_user_data.email != null) {
		email.innerHTML = ls_user_data.email;
	}
	if (ls_user_data.phone_no != null) {
		phone.innerHTML = `+975 ${ls_user_data.phone_no}`;
	}

	if (ls_user_data.profilePicture != null) {
		dashboard_profile_container.src = ls_user_data.profilePicture;
	} else {
		storage
			.ref(
				"users/" + ls_user_data.user_id + "/user_details" + "/profilePicture"
			)
			.getDownloadURL()
			.then(function (url) {
				ls_user_data.profilePicture = url;
				dashboard_profile_container.src = ls_user_data.url;
				localStorage.setItem("user", JSON.stringify(ls_user_data));
			});
	}

	apt_rented.innerHTML = ls_user_data.apartment_rented;
	apt_listed.innerHTML = ls_user_data.apartment_listed;
}

if (ls_user_data == null) {
	dashboard_profile_container.src = "/assets/images/profile_picture.png";
	user_name.innerHTML = "Username";
	email.innerHTML = "email@mail.com";
	phone.innerHTML = "+975 00000000";
}
