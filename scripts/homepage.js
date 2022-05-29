const chimms = document.getElementById("chimms");
const arrows = document.getElementById("arrows");
const view_more = document.getElementById("view_more");

var realtime_apartment_data = database.ref().child("apartments/");
realtime_apartment_data.once("value", function (snapshot) {
	var apartment_data = snapshot.val();
	var apartments = ``;
	var keys = Object.keys(apartment_data);
	for (let i = 0; i < 3; i++) {
		var apartment = apartment_data[keys[i]];
		chimm_card = `<div class="chimm_card" id=${apartment.apartment_id} onClick="openAptDetails(this.id)">
						<div class="card-image">
							<img src="/assets/images/chimm_marketplace.png" alt="Chimm">
						</div>
						<div class="card_body">
							<h3>${apartment.building_name}</h3>
							<p class="location"><i class="bi bi-geo-alt"></i> ${apartment.address}</p>
							<p>Rent per Month - Nu. ${apartment.rent_per_month}</p>
							<p>Rooms - ${apartment.total_rooms} BHK</p>
							<p>Surface Area - ${apartment.total_surface_area} sq. ft.</p>
						</div>
					</div>`;
		apartments += chimm_card;
	}
	chimms.classList.remove("hidden");
	arrows.classList.remove("hidden");
	view_more.classList.remove("hidden");
	chimms.innerHTML = apartments;
});

const openAptDetails = (curr_id) => {
	var currAptId = {
		apartment_id: curr_id,
	};
	localStorage.setItem("currAptId", JSON.stringify(currAptId));
	window.location.href = "/html/house_listing.html";
};
