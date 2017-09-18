function renderChart(data){
    var chart = new CanvasJS.Chart("chart",
    {
      theme: "theme",
		backgroundColor: "transparent",
      animationEnabled: true,
      axisX: {
        valueFormatString: "DDD",
        interval:1,
        intervalType: "day"
		
        
      },
      axisY:{
		includeZero: false,
		tickLength: 0,
		lineThickness:0,
		valueFormatString:" " //comment this to show numeric values
        
      },
      data: [
      {        
        type: "line",
        //lineThickness: 3,        
        dataPoints: data/*[
        { x: new Date(2012, 00, 1), y: 450 },
        { x: new Date(2012, 00, 2), y: 414},
        { x: new Date(2012, 00, 3), y: 520},
        { x: new Date(2012, 00, 4), y: 460 },
        { x: new Date(2012, 00, 5), y: 450 },
        { x: new Date(2012, 00, 6), y: 500 },
        { x: new Date(2012, 00, 7), y: 410 }
        
        ]*/
      }
      
      
      ]
    });

chart.render();
}

function getDataPoints(){
	var dataPoints = [];
	var dates = getLastDays(7);
	var data = getWeatherData(dates[0]);
	for(var i = 0; i<dates.length;i++){
		dataPoints.push({x: dates[i], y: Math.floor(Math.random() * 20)});
		//
	}
	return dataPoints;
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
			}
		});
	}
	setTimeout(function(){
		var renderPlots = [];
		for(var i = 0; i < 7; i++){
			renderPlots.push({x: dates[i], y: dataPoints[i].daily.data[0].temperatureMax});
			//Math.floor(Math.random() * 20);
		}
    	renderChart(renderPlots);
	}, 500);

}