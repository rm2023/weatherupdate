var list1 = $('#city-list');
var addItem;

var click1 = document.querySelector("#button-addon1");
var input1 = document.querySelector("#input1");
var weatherDataElem = document.querySelector("#weather-data");

click1.addEventListener("click", function () {
    var addItem = $('input[name="input1"]').val();
    var city = input1.value; // get value of input1 field
    console.log("clicked");

    list1.append('<li>' + addItem + '</li>');
    $('input[name="input1"]').val('');

    var APIKey = "1d3e7e850fece8f1faa4ded00b53eacc";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    fetch(queryURL).then(function (response) {
        return response.json();
        
    }).then(function (data) {
        var forecastData = data.list;
        var forecastHtml = "";
        for (var i = 0; i < forecastData.length; i+=8) {
            var forecast = forecastData[i];
            var date = new Date(forecast.dt_txt);
            forecastHtml += "<div>" + date.toDateString() + "<br>" +
                "Temperature: " + ((forecast.main.temp -273.15)*9/5+32) + " &deg;F<br>" +
                "Weather description: " + forecast.weather[0].description + "</div>";

        }
        weatherDataElem.innerHTML = forecastHtml;
    }).catch(function (error) {
        console.log(error);
    });
});