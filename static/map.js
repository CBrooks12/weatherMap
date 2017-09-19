var map;

//initializes the google map with Eugene as the initial center
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 44.052,
			lng: -123.086
		},
		zoom: 14
	});
	renderScreenInfo("Eugene, OR, United States", "ChIJGRlQrLAZwVQRTYlDSolh7Fc",44.052,-123.086);
		var input = document.getElementById('searchbar');
		var autocomplete = new google.maps.places.Autocomplete(input);
		autocomplete.bindTo('bounds', map);
    
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}

			// If the place has a geometry, then present it on a map.
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17);  // Why 17? Because it looks good.
			}
			//get and render weather data
			renderScreenInfo(document.getElementById("searchbar").value, place.place_id,place.geometry.location.lat(),place.geometry.location.lng());
        });
}

//sets the new map display from placeID
function setWindow(locName){
	service = new google.maps.places.PlacesService(map);
    service.getDetails({placeId: locName}, callback);

}

//sets new map from data grabbed from placesService
function callback(place, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
		//render data with no location name so it does not create a new button
		renderScreenInfo("","",place.geometry.location.lat(),place.geometry.location.lng());
	}
}
