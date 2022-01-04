var apiKey = "e73066ba013f680ab0b121c511b57064"
var cityArray = [];

$(document).ready(function() {
    $("#searchBtn").on("click", function() {
        var cityName = $("#city").val().trim();
        var URL1 = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ apiKey + "&units=imperial";
        //Save city name in local storage then display in search history
        cityArray.push(cityName);
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
        for (let i = 0; i < cityArray.length; i++) {
            
            
        


            var city = `
                <div class="city">
                <button class="cityBtn">${JSON.parse(localStorage.getItem(cityArray[i]))}</button>
                </div>
            `

            $(".search-history").append(city);

            getWeather(URL1, cityName);
            
        }
    });

    //make array for local storage and add names to the array
    //then display the array items

        //$(".cityBtn").on("click", 
        function getWeather(URL1, cityName) {

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
                    console.log(data);

                    var date = moment().format('M/D/YYYY');
                    var iconEl = data.current.weather[0].icon;
                    var tempEl = data.current.temp;
                    var humidityEl = data.current.humidity;
                    var windSpeed = data.current.wind_speed;
                    var currentUVI = data.current.uvi
                    // var uvIndex = function(result) {
                    //     if (data.current.uvi <= 3)
                    //         console.log("Low");
                    //         //background color green
                    //     else if (3 < data.current.uvi <= 6)
                    //         console.log("Moderate");
                    //         //background color yellow
                    //     else if (6 < data.current.uvi <= 8)
                    //         console.log("High");
                    //         //background color orange
                    //     else if (8 < data.current.uvi <= 11)
                    //         console.log("Very High");
                    //         //background color red
                    //     else 
                    //         console.log("Extreme");
                    //         //background color pink
                    // };
                    
                    // uvIndex();
                        
                    //Display current weather
                    
                    
                    var currentWeather = `
                        <div class="current">
                        <h4>${cityName} (${date}) <img class="icon" src="http://openweathermap.org/img/wn/${iconEl}@2x.png"></h4>
                        <div class="blockStats">
                        <span class="temp">Temperature: ${tempEl}</span><br>
                        <span class="humidity">Humidity: ${humidityEl}</span><br>
                        <span class="windSpeed">Wind Speed: ${windSpeed}</span><br>
                        <span class="uvIndex">UV Index: ${currentUVI}</span>
                        </div>
                        </div>
                    `

                    $(".current-weather").append(currentWeather);


                        
                    //Display daily weather
                    for (let i = 1; i < 6; i++) {

                    var dailyDate = moment().add(i, 'days').format('M/D/YYYY');
                    var dailyIcon = data.daily[i].weather[0].icon;
                    var dailyMinTemp = data.daily[i].temp.min;
                    var dailyMaxTemp = data.daily[i].temp.max;
                    var dailyHumidity = data.daily[i].humidity;
                    var dailyWindspeed = data.daily[i].wind_speed;
                    var dailyUVI = data.daily[i].uvi;

                    var dailyWeather = `
                        <div class="daily">
                        <h4 class="dailyDate">${dailyDate} <img class="icon" src="http://openweathermap.org/img/wn/${dailyIcon}@2x.png"></h4>
                        <div class="blockStats">
                        <span class="temp">Temperature(Low/High): ${dailyMinTemp}/${dailyMaxTemp}</span><br>
                        <span class="humidity">Humidity: ${dailyHumidity}</span><br>
                        <span class="windSpeed">Wind Speed: ${dailyWindspeed}</span><br>
                        <span class="dailyUVI">UV Index: ${dailyUVI}</span>
                        </div>
                        </div>
                    `
                    $(".daily-weather").append(dailyWeather);
                    };

                });

            });
        //new function ends here \/
        //});
        }
    
});

