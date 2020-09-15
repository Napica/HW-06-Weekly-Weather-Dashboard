$(document).ready(function () {
  // DOM variables
  var searchFormEl = $("#search-form");
  var searchDisplayEl = $("#search-display");
  var submitBtnEl = $("#submit-btn");
  var day1 = $("#day-1");
  var day2 = $("#day-2");
  var day3 = $("#day-3");
  var day4 = $("#day-4");
  var day5 = $("#day-5");

  // JS variables

  // function definitiions

  // function calls

  // Event listeners

  searchFormEl.on("submit", function (event) {
    event.preventDefault();

    var apiKey = "a5d50a95ebdfda3d62868461aaacdca4";
    var city = $("#search-section").val();
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial" +
      "&appid=" +
      apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (success) {
      console.log(success);

      // updates the name of the city searched
      var updateName = success.name;
      var cityName = $("<span>");
      cityName.text(updateName);
      cityName.addClass("font-weight-bold");
      cityName.css("font-size", "40px");
      $("#city-name").prepend(cityName);

      // updates the current date of the search
      var timeLib = moment();
      var datePull = timeLib.format("L");
      datePull.css = ("padding", "20px");
      $("#currentDate").append("( " + datePull + " )");

      //  NEED TO WORK ON ADDING ICON
      //   var weatherStamp = success.weather.icon;
      //   var weatherIconImage = $("<span>");
      //   weatherIconImage.html(weatherStamp);
      //   $("#weatherIcon").append(weatherIconImage);

      // updates the current temperature in Farhenheit
      var tempF = (success.main.temp - 273.15) * 1.8 + 32;
      var updateWeatherTemp = tempF;
      var weatherTemp = $("<span>");
      weatherTemp.text(updateWeatherTemp);
      $("#temperature").append(
        "Temperature: " + updateWeatherTemp.toFixed(2) + "\u00B0" + " F"
      );

      // updates the current humidity of the location
      var updateHumidity = success.main.humidity;
      var humiditySection = $("<span>");
      humiditySection.text(updateHumidity);
      $("#humidity").append("Humidity: " + humiditySection + " %");

      // updates the current wind speed
      var speedConvert = success.wind.speed * 2.236936;
      var windSpeedConvert = speedConvert;
      var speedOfWind = $("<span>");
      speedOfWind.text(windSpeedConvert);
      $("#wind=speed").append("Wind Speed: " + speedOfWind.toFixed(2) + " mph");
    });

    var secondApiKey = "dc64e956c7bb1cc3844c6359a9099780";
    var city = $("#search-section").val();
    var queryURL =
      "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
      city +
      "&cnt=5&appid=" +
      secondApiKey;

      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (success){
          console.log(success)
      });
    
  });
});

// localStorage approach
// 1) create search results DIv
// 2) Dynamically create a new element (Button)
// dont forget to add clear();
// 3) create an event function that grabs the value of the button
// event bubbling
// $(this)
// 4) make a nother API call from the value of the button.
// 5) create an array to pull the generated index from
