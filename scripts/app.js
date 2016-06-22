// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList = $("#info");
var map;
var template;

$(document).on("ready", function() {
	$.get(weekly_quakes_endpoint, function(data){
		var source = $("#quake-list").html();
		template = Handlebars.compile(source);
		
		var quakeResults = data.features;
		console.log(quakeResults);

		var trackHTML = template({quakes: quakeResults});
		$("#info").append(trackHTML);

		quakeResults.forEach(function(currQuake) {
			var lat = currQuake.geometry.coordinates[0];
			var long = currQuake.geometry.coordinates[1];
			var latLong = {lat: lat, lng: long};
			console.log(latLong);
			var marker = new google.maps.Marker({
				position: latLong,
				map: map,
				title: currQuake.properties.title
			});
		});
	});
});