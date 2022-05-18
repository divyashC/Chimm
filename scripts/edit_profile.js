const user_name = document.getElementById("display_name");
const profile_image = document.getElementById("profile_image");
if (ls_user_data.full_name != null) {
	user_name.innerHTML = ls_user_data.full_name;
}

if (ls_user_data.profilePicture != null) {
	profile_image.src = ls_user_data.profilePicture;
}

const upload_new_avatar = document.getElementById("upload_new_avatar_button");
const upload_new_avatar_form = document.getElementById(
	"upload_new_avatar_form"
);

upload_new_avatar.addEventListener("click", function () {
	upload_new_avatar_form.classList.toggle("hidden");
});

const profile_picture = document.getElementById("profile_picture");
let file = {};

profile_picture.addEventListener("change", function (e) {
	var storage_ref = storage.ref();
	file = e.target.files[0];
	storage_ref
		.child("users/" + ls_user_data.user_id + "/profilePicture")
		.put(file);
	alert("Profile picture updated successfully");
	upload_new_avatar_form.classList.add("hidden");
});

const edit_form = document.getElementById("edit_form");

edit_form.addEventListener("submit", (e) => {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const phone_no = document.getElementById("phone_no").value;
	const full_name = document.getElementById("name").value;
	const dob = document.getElementById("dob").value;
	const password = document.getElementById("password").value;
	const retype_password = document.getElementById("retype_password").value;

	var database_ref = database.ref();

	const user_data = ls_user_data;
	const user_id = ls_user_data.user_id;
	user_data.last_login = Date.now();

	if (email != "") {
		user_data.email = email;
	}
	if (phone_no != "") {
		if (validate_phone(phone_no) == false) {
			alert("Phone number is not 8 digits!!");
			return;
		}
		user_data.phone_no = phone_no;
	}
	if (full_name != "") {
		user_data.full_name = full_name;
	}
	if (dob != "") {
		user_data.dob = dob;
	}
	if (password != "" && retype_password != "") {
		if (compare_password(password, retype_password) == false) {
			alert("Password does not match!!");
			return;
		}
		user_data.password = password;
	}

	const user_data_new = user_data;
	delete user_data_new.profilePicture;
	database_ref.child("users/" + user_id).set(user_data_new);

	store_data(user_id);

	alert("Updated successfully");

	setTimeout(() => {
		edit_form.reset();
		window.location.href = "/html/profile.html";
	}, 2000);
});

const compare_password = (password, retype_password) => {
	return password == retype_password ? true : false;
};

const validate_phone = (phone) => {
	return phone.length == 8 ? true : false;
};

const store_data = (user_id) => {
	var realtime_user_data = database.ref().child("users/" + user_id);
	realtime_user_data.on("value", function (snapshot) {
		var curr_user_data = snapshot.val();
		storage
			.ref("users/" + user_id + "/profilePicture")
			.getDownloadURL()
			.then(function (url) {
				curr_user_data.profilePicture = url;
				localStorage.setItem("user", JSON.stringify(curr_user_data));
			});
	});
};
