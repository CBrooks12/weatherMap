Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }
var map;
var loc;
//#141414

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 44.052,
      lng: -123.086
    },
    zoom: 14
  });
  getWeatherData("Eugene, OR, United States", "ChIJGRlQrLAZwVQRTYlDSolh7Fc",44.052,-123.086);
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
		  getWeatherData(document.getElementById("searchbar").value, place.place_id,place.geometry.location.lat(),place.geometry.location.lng());


        });
}

function createWindow(e) {
    marker.setPosition(e.latLng);

    //set position data
    var latitude = e.latLng.lat();
    var longitude = e.latLng.lng();
    var lat = document.getElementById("lat");
    lat.setAttribute("value", latitude);
    var long = document.getElementById("long");
    long.setAttribute("value", longitude);
    console.log("Latitude: " + latitude +'\n' +"Longitude: " + longitude);

    infowindow = new google.maps.InfoWindow;
    var formData = document.getElementById('form');
    infowindow.setContent(formData);
    infowindow.open(map, marker);
    google.maps.event.addListener(infowindow,'click',function(){
        window.location.reload();
    // then, remove the infowindows name from the array
    });

}

function setWindow(locName){
    service = new google.maps.places.PlacesService(map);
    service.getDetails({placeId: locName}, callback);

}


function callback(place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
	getWeatherData("","",place.geometry.location.lat(),place.geometry.location.lng());
  }
}
