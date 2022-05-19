const apartment_entry_form = document.getElementById("apartment_entry_form");

apartment_entry_form.addEventListener("submit", (e) => {
	e.preventDefault();

	const user_id = ls_user_data.user_id;

	const owner_name = document.getElementById("owner_name").value;
	const owner_phone = document.getElementById("owner_phone").value;
	const owner_email = document.getElementById("owner_email").value;
	var proof_of_ownership =
		document.getElementById("proof_of_ownership").files[0];
	const total_surface_area =
		document.getElementById("total_surface_area").value;
	const total_rooms = document.getElementById("total_rooms").value;
	const toilet_bathroom = document.getElementById("toilet_bathroom").value;
	const number_of_balconies = document.getElementById(
		"number_of_balconies"
	).value;
	const floor = document.getElementById("floor").value;
	const parking = document.querySelector('input[name="parking"]:checked').value;
	const road_access = document.querySelector(
		'input[name="road_access"]:checked'
	).value;
	const rent_per_month = document.getElementById("rent_per_month").value;
	const address = document.getElementById("address").value;
	const building_name = document.getElementById("building_name").value;
	const flat_number = document.getElementById("flat_number").value;
	const additional_info = document.getElementById("additional_info").value;
	const bool = document.getElementById("terms").checked;

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	var complete_date = dd + "/" + mm + "/" + yyyy;

	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	var ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	var complete_time = hours + ":" + minutes + ":" + seconds + " " + ampm;

	if (bool == false) {
		alert("Please accept the terms and conditions");
	} else {
		var database_ref = database.ref();
		var storage_ref = storage.ref();

		var apt_database_ref = database.ref().child("apartments/");
		apt_database_ref.once("value").then(function (snapshot) {
			var apt_id =
				snapshot.val() == null ? 1 : Object.keys(snapshot.val()).length + 1;

			var apartment_data = {
				owner_user_id: ls_user_data.user_id,
				apartment_id: apt_id,
				owner_name: owner_name,
				owner_phone: owner_phone,
				owner_email: owner_email,
				total_surface_area: total_surface_area,
				total_rooms: total_rooms,
				toilet_bathroom: toilet_bathroom,
				number_of_balconies: number_of_balconies,
				floor: floor,
				parking: parking,
				road_access: road_access,
				rent_per_month: rent_per_month,
				building_name: building_name,
				address: address,
				flat_number: flat_number,
				additional_info: additional_info,
				entry_date: complete_date,
				entry_time: complete_time,
				timestamp: Date.now(),
			};

			database_ref
				.child("users/" + user_id + "/apartments/" + apt_id)
				.set(apartment_data);
			database_ref.child("apartments/" + apt_id).set(apartment_data);
			storage_ref
				.child(
					"users/" + user_id + "/apartments/" + apt_id + "/proof_of_ownership"
				)
				.put(proof_of_ownership);

			alert("Apartment added successfully");
		});

		setTimeout(() => {
			apartment_entry_form.reset();
			window.location.href = "/html/apartment_listing.html";
		}, 4000);
	}
});
