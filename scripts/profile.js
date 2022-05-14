const user_name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const dashboard_profile_container =
	document.getElementById("dashboard_profile");

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
}
