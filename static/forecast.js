//renders CanvasJS with data
function renderChart(data){
    var chart = new CanvasJS.Chart("chart",
    {
		theme: "theme",
		backgroundColor: "transparent",
		animationEnabled: true,
		interactivityEnabled: true,
		axisX: {
			valueFormatString: "DD DDD",
			interval:1,
			intervalType: "day",
			labelFontSize: 15,
			labelFontWeight: "bold"
		},
		axisY:{
			includeZero: false,
			tickLength: 0,
			valueFormatString:" ", //comment this to show numeric values
			title: "°F",
			titleFontSize: 15,
			titleFontWeight: "bold",
			margin: 0
		},
		data: [
		{        
			type: "spline",
			lineThickness: 3,
			indexLabelFontWeight: "bold",
			indexLabelFontSize: 15,
			dataPoints: data[0]
		},
		{        
			type: "spline",
			lineThickness: 3,
			indexLabelFontWeight: "bold",
			indexLabelFontSize: 15,
			dataPoints: data[1]
		},
		]
    });

chart.render();
}

//gets the last amt of days as an array of Date objects in (YYYY, MM, DD) in decending order
function getLastDays(amt){
	var week = [];
	var today = new Date();
	for(var i = 0; i < amt ; i++){
		week.push(new Date(today.getFullYear(),today.getMonth(),today.getDate()-i));
	}
	return week;
}
//gets weather data from darksky and then renders its findings on the chart.
function renderScreenInfo(locName, locID, lat, lng){
	var days = 7;
	var dates = getLastDays(days);
	var renderPlots = [[],[]];
	var count = 0;
	for(var i = 0; i < days; i++){
		$.ajax({
			url: 'https://api.darksky.net/forecast/91884648b10d2855aa4ccdbd9ac3e9bf/'+lat+','+lng+','+dates[i].getTime()/1000,
			type: 'GET',
			dataType: "jsonp",
			success: function(data){
				//if location is new and is today, add button with current temperature
				if((dates[0].getTime()/1000==data.currently.time)&& locName!==""){
					setLoc(locName, locID ,data.currently.temperature);
				}
				renderPlots[0].push({x: dates[count], y: data.daily.data[0].temperatureMax, indexLabel: data.daily.data[0].temperatureMax + ""});
				renderPlots[1].push({x: dates[count], y: data.daily.data[0].temperatureMin, indexLabel: data.daily.data[0].temperatureMin + ""});
				count++;
				//if return is last day, then render chart with plot points
				if(count===days){
					renderChart(renderPlots);
				}
			}
		});
	}

}