function renderChart(data){
    var chart = new CanvasJS.Chart("chart",
    {
		theme: "theme",
		backgroundColor: "transparent",
		animationEnabled: true,
		interactivityEnabled: true,
		axisX: {
			valueFormatString: "DDD",
			interval:1,
			intervalType: "day",
			labelFontSize: 16,
			labelFontWeight: "bold"
		},
		axisY:{
			includeZero: false,
			tickLength: 0,
			valueFormatString:" ", //comment this to show numeric values
			title: "°F",
			titleFontSize: 16,
			titleFontWeight: "bold"
		},
		data: [
		{        
			type: "line",
			lineThickness: 3,
			indexLabelFontWeight: "bold",
			indexLabelFontSize: 16,
			dataPoints: data[0]
		},
		{        
			type: "line",
			lineThickness: 3,
			indexLabelFontWeight: "bold",
			indexLabelFontSize: 16,
			dataPoints: data[1]
		},
		]
    });

chart.render();
}

function getLastDays(amt){
	var week = [];
	var today = new Date();
	for(var i = 0; i < amt ; i++){
		week.push(new Date(today.getFullYear(),today.getMonth(),today.getDate()-i));
	}
	return week;
}

function getWeatherData(locName, locID, lat, lng){
	var days = 7;
	var dates = getLastDays(days);
	var dataPoints = [];
	var renderPlots = [[],[]];
	var count = 0;
	for(var i = 0; i < days; i++){
		$.ajax({
			url: 'https://api.darksky.net/forecast/91884648b10d2855aa4ccdbd9ac3e9bf/'+lat+','+lng+','+dates[i].getTime()/1000,
			type: 'GET',
			dataType: "jsonp",
			success: function(data){
				dataPoints.push(data);
				if((dates[0].getTime()/1000==data.currently.time)&& locName!==""){
					console.log(locName);
					setLoc(locName, locID ,data.currently.temperature);
				}
				renderPlots[0].push({x: dates[count], y: data.daily.data[0].temperatureMax, indexLabel: data.daily.data[0].temperatureMax + ""});
				renderPlots[1].push({x: dates[count], y: data.daily.data[0].temperatureMin, indexLabel: data.daily.data[0].temperatureMin + ""});
				count++;
				if(count===days){
					renderChart(renderPlots);
				}
			}
		});
	}

}