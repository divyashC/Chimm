const currAptId = JSON.parse(localStorage.getItem("currAptId")).apartment_id;
const summary = document.getElementById("summary");
const renting_form = document.getElementById("renting_form");
const user_id = JSON.parse(localStorage.getItem("user")).user_id;

var realtime_apartment_data = database.ref().child("apartments/");
realtime_apartment_data.once("value", function (snapshot) {
	var apartment_data = snapshot.val();
	var apartment = apartment_data[currAptId];
	localStorage.setItem("currentApartment", JSON.stringify(apartment));
	const summary_html_code = `<div class="summary_card">
                                <div class="house_summary">
                                    <div class="section_1">
                                        <img src="/assets/images/house_summary_image.png" alt="House Image">
                                    </div>
                                    <div class="section_2">
                                        <h3>${apartment.building_name}</h3>
                                        <p class="location"><i class="bi bi-geo-alt"></i> ${apartment.address}</p>
                                        <p>${apartment.additional_info}</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="flat_summary">
                                    <h3>Flat Summary</h3>
                                    <table>
                                        <tr class="tsa">
                                            <td class="tsa-title value_left">Total Surface Area</td>
                                            <td class="tsa-value value_right"${apartment.total_surface_area} sq. ft</td>
                                        </tr>
                                        <tr class="room">
                                            <td class="rooms-title value_left">Rooms</td>
                                            <td class="rooms-value value_right">${apartment.total_rooms} BHK</td>
                                        </tr>
                                        <tr class="toilet_bathroom">
                                            <td class="toilet_bathroom_title value_left">Toilet / Bathroom</td>
                                            <td class="toilet_bathroom_value value_right">${apartment.toilet_bathroom}</td>
                                        </tr>
                                        <tr class="balconies">
                                            <td class="balconies_title value_left">Balconies</td>
                                            <td class="balconies_value value_right">${apartment.number_of_balconies}</td>
                                        </tr>
                                        <tr class="parking">
                                            <td class="parking_title value_left">Parking</td>
                                            <td class="parking_value value_right">${apartment.parking}</td>
                                        </tr>
                                        <tr class="floor">
                                            <td class="floor_title value_left">Floor</td>
                                            <td class="floor_value value_right">${apartment.floor}</td>
                                        </tr>
                                        <tr class="road">
                                            <td class="road_title value_left">Road Access</td>
                                            <td class="road_value value_right">${apartment.road_access}</td>
                                        </tr>
                                    </table>
                                </div>

                                <hr>

                                <div class="rent">
                                    <table>
                                        <tr>
                                            <td class="rent_title">
                                                <h3>Total Rent Per Month</h3>
                                            </td>
                                            <td class="rent_value">
                                                <h3>Nu. ${apartment.rent_per_month}</h3>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>`;
	summary.innerHTML = summary_html_code;
});

renting_form.addEventListener("submit", function (event) {
	event.preventDefault();

	const tenant_name = document.getElementById("tenant_name").value;
	const tenant_email = document.getElementById("tenant_email").value;
	const tenant_number = document.getElementById("tenant_number").value;
	const tenant_occupation = document.getElementById("tenant_occupation").value;
	const tenant_gender = document.getElementById("tenant_gender").value;
	const tenant_age = document.getElementById("tenant_age").value;
	const tenant_heads = document.getElementById("tenant_heads").value;
	const booking_date = document.getElementById("booking_date").value;
	const additional_info = document.getElementById("additional_info").value;
	const bool = document.getElementById("terms").checked;

	if (bool == false) {
		alert("Please accept the terms and conditions");
	} else {
		var database_ref = database.ref();
		var storage_ref = storage.ref();

		var tenant_data = {
			apt_id: currAptId,
			tenant_user_id: user_id,
			tenant_name: tenant_name,
			tenant_email: tenant_email,
			tenant_number: tenant_number,
			tenant_occupation: tenant_occupation,
			tenant_gender: tenant_gender,
			tenant_age: tenant_age,
			tenant_heads: tenant_heads,
			booking_date: booking_date,
			additional_info: additional_info,
			timestamp: Date.now(),
		};

		var user_data = {
			apartment_rented: ls_user_data.apartment_rented + 1,
		};

		ls_user_data.apartment_rented += 1;
		localStorage.setItem("user", JSON.stringify(ls_user_data));
		database_ref.child("users/" + user_id + "/user_data/").update(user_data);

		database_ref
			.child(`users/${user_id}/rented_apartments/${currAptId}`)
			.set(tenant_data);

		const currentAptData = JSON.parse(localStorage.getItem("currentApartment"));

		database_ref
			.child(`users/${currentAptData.owner_user_id}/tenants/${currAptId}`)
			.set(tenant_data);

		alert("Apartment Rented successfully");

		deleteApartment(currentAptData.owner_user_id, currAptId);

		setTimeout(() => {
			renting_form.reset();
			window.location.href = "/html/profile.html";
		}, 4000);
	}
});

const deleteApartment = (owner_user_id, apt_id) => {
	database
		.ref()
		.child("apartments/" + apt_id)
		.remove();
	database
		.ref()
		.child("users/" + owner_user_id + "/apartments/" + apt_id)
		.remove();
};
