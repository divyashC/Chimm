const user_id = ls_user_data.user_id;

var table_HTML_Code = `<div class="table">
                            <table>
                                <tr>
                                    <th>Sl. No.</th>
                                    <th>Building Name</th>
                                    <th>Location</th>
                                    <th>Rent</th>
                                    <th>Status</th>
                                </tr>`;

var realtime_apartment_data = database.ref().child("apartments/");
realtime_apartment_data.once("value", function (snapshot) {
	var apartment_data = snapshot.val();
	var count = 0;
	var apartment_tr_list = Object.keys(apartment_data).map(function (key) {
		var apartment = apartment_data[key];
		if (apartment.owner_user_id == user_id) {
			count++;
			return `<tr>
                    <td>${count}</td>
                    <td>${apartment.building_name}</td>
                    <td>${apartment.address}</td>
                    <td>Nu. ${apartment.rent_per_month}</td>
                    <td><button onClick="deleteApartment(this.id)" id="${apartment.owner_user_id} ${apartment.apartment_id}"><i class="bi bi-trash3"></i></button></td>
                </tr>`;
		}
	});
	apartment_tr_list += `</table></div>`;
	table_HTML_Code += apartment_tr_list;
	document.getElementById("table_container").classList.remove("hidden");
	document.getElementById("table_container").innerHTML = table_HTML_Code;
});

const deleteApartment = (btn_id) => {
	const [owner_user_id, apt_id] = btn_id.split(" ");
	console.log(owner_user_id);
	console.log(apt_id);
};
