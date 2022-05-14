const user_name = document.getElementById("display_name");
const profile_image = document.getElementById("profile_image");
if (ls_user_data.full_name != null) {
	user_name.innerHTML = ls_user_data.full_name;
}

if (ls_user_data.profilePicture != null) {
	profile_image.src = ls_user_data.profilePicture;
}
