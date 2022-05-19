const saf_button = document.getElementById("search_and_filter_btn");
const saf_body = document.getElementById("search_and_filter_body");
const saf_close_btn = document.getElementById("close_btn");

saf_button.addEventListener("click", () => {
	saf_body.classList.toggle("hidden");
});

saf_close_btn.addEventListener("click", () => {
	saf_body.classList.add("hidden");
});

const chimms = document.getElementById("chimms");

var realtime_apartment_data = database.ref().child("apartments/");
realtime_apartment_data.once("value", function (snapshot) {
	var apartment_data = snapshot.val();
	var apartments = Object.keys(apartment_data).map(function (key) {
		var apartment = apartment_data[key];
		return `<div class="card">
					<a href="house_listing.html">
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
					</a>
				</div>`;
	});

	chimms.classList.remove("hidden");
	chimms.innerHTML = apartments;
});
