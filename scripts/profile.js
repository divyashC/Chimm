const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const dashboard_profile_container =
	document.getElementById("dashboard_profile");

name.innerHTML = ls_user_data.full_name;
email.innerHTML = ls_user_data.email;
phone.innerHTML = `+975 ${ls_user_data.phone_no}`;
dashboard_profile_container.src = ls_user_data.profilePicture;
