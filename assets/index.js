$(document).ready(function () {
  // DOM variables
  var searchFormEl = $("#search-form");
  var searchDisplayEl = $("#search-display");
  var submitBtnEl = $("#submit-btn");

  // JS variables

  // function definitiions
  //   function fiveDayForcast() {
  //     // for 5 day forcast section

  //     var secondApiKey = "a5d50a95ebdfda3d62868461aaacdca4";
  //     var city = $("#search-section").val();
  //     var queryURL =
  //       "http://api.openweathermap.org/data/2.5/forecast?q=" +
  //       city +
  //       "&units=imperial" +
  //       "&appid=" +
  //       secondApiKey;

  //     $.ajax({
  //       url: queryURL,
  //       method: "GET",
  //     }).then(function (response) {
  //         console.log(response);
  //     });
  //   }

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
      var weatherStamp = success.weather.icon;
      $("#weatherIcon").append(weatherStamp);

      // updates the current temperature in Farhenheit

      var updateWeatherTemp = success.main.temp;
      $("#temperature").append(
        "Temperature: " + updateWeatherTemp + "\u00B0" + " F"
      );

      // updates the current humidity of the location
      var updateHumidity = success.main.humidity;
      $("#humidity").append("Humidity: " + updateHumidity + " %");

      // updates the current wind speed
      var windSpeedConvert = success.wind.speed;
      $("#wind").append("Wind Speed: " + windSpeedConvert + " mph");

      // update for interactive UV index

      var latitude = success.coord.lat;
      var longitude = success.coord.lon;

      var queryURL_uvIndex =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        apiKey +
        "&lon=" +
        longitude +
        "&lat=" +
        latitude;

        $.ajax({
          url: queryURL_uvIndex,
          method: "GET"
        }).then(function (indexValue) {
          var indexUVValue = $("#UV-Index");
          indexUVValue.empty();
          // console.log(indexValue.value);
          // console.log(queryURL_uvIndex);
          
        })
    });

    // fiveDayForcast();
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
