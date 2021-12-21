var apiKey = "e73066ba013f680ab0b121c511b57064"


$(document).ready(function() {
    $("#searchBtn").on("click", function() {
        var cityName = $("#city").val().trim();
        var URL1 = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ apiKey + "&units=imperial";

        fetch(URL1)
            .then(function(res){
                return res.json();
            }).then(function(data){
                //console.log(data);
                var lat = data.coord.lat
                var lon = data.coord.lon
                var URL2 ="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid="+ apiKey+ "&units=imperial";
                
                fetch(URL2)
                .then(function(res){
                    return res.json();
                })
                .then(function(data){
                    console.log(data)

                    var date = $('.currentDate').text(moment().format('M/d/yyyy'));
                    var iconEl = data.current.clouds;
                    var tempEl = data.current.temp;
                    var humidityEl = data.current.humidity;
                    var windSpeed = data.current.wind_speed;
                    var uvIndex = data.current.uvi;

                        


                    var dailyDate = $('.dailyDate1').text(moment().format('M/d/yyyy'));
                    var dailyIcon = data.daily.i.clouds;
                    var dailyMinTemp = data.daily.i.temp.min;
                    var dailyMaxTemp = data.daily.i.temp.max;
                    var dailyHumidity = data.daily.i.humidity;
                    var dailyWindspeed = data.daily.i.wind_speed;
                    var dailyUvIndex = data.daily.i.uvi;
                    //Show stuff on page in here 
                    //because you only have access to data here!
                    //local storage then display onto page.
                    
                    // for loops here
                });
                
            });
    });
});

