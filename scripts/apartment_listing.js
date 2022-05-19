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
		count++;
		return `<tr>
                    <td>${count}</td>
                    <td>${apartment.building_name}</td>
                    <td>${apartment.address}</td>
                    <td>Nu. ${apartment.rent_per_month}</td>
                    <td><button><i class="bi bi-trash3"></i></button></td>
                </tr>`;
	});
	apartment_tr_list += `</table></div>`;
	table_HTML_Code += apartment_tr_list;
	document.getElementById("table_container").classList.remove("hidden");
	document.getElementById("table_container").innerHTML = table_HTML_Code;
});
