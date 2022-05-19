const main_content = document.getElementById("main_content");
const image_content = document.getElementById("image_content");
const currAptId = JSON.parse(localStorage.getItem("currAptId")).apartment_id;

var realtime_apartment_data = database.ref().child("apartments/");
realtime_apartment_data.once("value", function (snapshot) {
	var apartment_data = snapshot.val();
	var apartment = apartment_data[currAptId];
	var main_content_html = `<div class="left">
                        <div class="house_name">
                            <h1>${apartment.building_name}</h1>
                            <p>
                                <span class="rooms">
                                    ${apartment.total_rooms} Rooms
                                </span>
                                <span class="bar">|</span>
                                <span class="hall">
                                    1 Hall
                                </span>
                                <span class="bar">|</span>
                                <span class="kitchen">
                                    1 Kitchen
                                </span>
                                <span class="bar">|</span>
                                <span class="toilet_bathroom">
                                    ${apartment.toilet_bathroom} Toilet / Bathroom
                                </span>
                                <span class="bar">|</span>
                                <span class="balcony">
                                    ${apartment.number_of_balconies} Balconies
                                </span>
                            </p>
                        </div>

                        <hr>

                        <div class="detailed_info">
                            <ul>
                                <li>
                                    <div class="icon">
                                        <i class="bi bi-house-door"></i>
                                    </div>
                                    <div class="info">
                                        <h3 class="info_title">Building Details</h3>
                                        <p>${apartment.building_name} | Flat - ${apartment.flat_number}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="icon">
                                        <i class="bi bi-geo-alt"></i>
                                    </div>
                                    <div class="info">
                                        <h3 class="info_title">Location</h3>
                                        <p>${apartment.address}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="icon">
                                        <i class="bi bi-house-door"></i>
                                    </div>
                                    <div class="info">
                                        <h3 class="info_title">Additional Info</h3>
                                        <p>${apartment.additional_info}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <hr>

                        <h3 class="owner_title">Owner's Details</h3>
                        <div class="owners_details">
                            <div class="owner">
                                <div class="profile">
                                    <img class="owner_profile" src="${apartment.owner_profile_picture_url}">
                                </div>
                                <div class="details">
                                    <p>${apartment.owner_name}</p>
                                    <p>${apartment.owner_phone}</p>
                                    <p>${apartment.owner_email}</p>
                                </div>
                            </div>
                            <div class="contact_button">
                                <a href="house_listing.html">Contact</a>
                            </div>
                        </div>
                    </div>

                    <div class="right">
                        <div class="summary_card">
                            <div class="section_1">
                                <h3>${apartment.building_name}</h3>
                                <p>Floor - ${apartment.floor} | Flat - ${apartment.flat_number}</p>
                                <p class="location"><i class="bi bi-geo-alt"></i> ${apartment.address}</p>
                            </div>
                            <hr>
                            <div class="flat_summary">
                                <h3>Flat Summary</h3>
                                <table>
                                    <tr class="tsa">
                                        <td class="tsa-title value_left">Total Surface Area</td>
                                        <td class="tsa-value value_right">${apartment.total_surface_area} sq. ft</td>
                                    </tr>
                                    <tr class="room">
                                        <td class="rooms-title value_left">Rooms</td>
                                        <td class="rooms-value value_right">${apartment.total_rooms} BHK</td>
                                    </tr>
                                    <tr class="toilet_bathroom">
                                        <td class="toilet_bathroom_title value_left">Toilet / Bathroom</td>
                                        <td class="toilet_bathroom_value value_right">${apartment.total_bathroom}</td>
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

                        </div>

                        <div class="rent_button">
                            <a href="renting_form.html">Rent This Flat</a>
                        </div>
                    </div>`;
	const image_html = `<img src="/assets/images/house_listing_1.png" alt="Chimm-Photo">`;

	image_content.innerHTML = image_html;
	main_content.innerHTML = main_content_html;
});

// 	chimms.classList.remove("hidden");
// 	chimms.innerHTML = apartments;
// });

// localStorage.removeItem("currAptId");
