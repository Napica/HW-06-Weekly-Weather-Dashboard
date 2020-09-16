$(document).ready(function () {
  // DOM variables
  var searchFormEl = $("#search-form");
  var searchDisplayEl = $("#search-display");

  // JS variables
  // will be used for localStorage
  var cityArchives = [];
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

      // updates the name of the city searched
      var updateName = success.name;
      var cityName = $("<span>");
      cityName.text(updateName);
      cityName.addClass("font-weight-bold");
      cityName.css("font-size", "40px");
      $(".city-name").prepend(cityName);

      // updates the current date of the search
      var timeLib = moment();
      var datePull = timeLib.format("L");
      datePull.css = ("padding", "20px");
      $(".currentDate").append("( " + datePull + " )");

      //  updates interactive icon

      var weatherStamp = success.weather[0].icon;
      var currentIcon = $("<img>");
      currentIcon.attr(
        "src",
        "https://openweathermap.org/img/w/" + weatherStamp + ".png"
      );
      $(".weatherIcon").append(currentIcon);

      // updates the current temperature in Farhenheit

      var updateWeatherTemp = success.main.temp;
      $(".temperature").append(
        "Temperature: " + updateWeatherTemp + "\u00B0" + " F"
      );

      // updates the current humidity of the location
      var updateHumidity = success.main.humidity;
      $(".humidity").append("Humidity: " + updateHumidity + " %");

      // updates the current wind speed
      var windSpeedConvert = success.wind.speed;
      $(".wind").append("Wind Speed: " + windSpeedConvert + " mph");

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
        method: "GET",
      }).then(function (indexValue) {
        var indexUVValue = $(".UV-Index");
        indexUVValue.empty();
        var uvIndexSection = $("<p>");
        uvIndexSection.addClass("btn btn-md");
        uvIndexSection.text(indexValue.value + " UV-Index");

        if (indexValue.value < 4) {
          uvIndexSection.addClass("btn-success");
        } else if (indexValue.value <= 7) {
          uvIndexSection.addClass("btn-warning");
        } else {
          uvIndexSection.addClass("btn-danger");
        }
        indexUVValue.append(uvIndexSection);
      });

      // for 5 day forcast section

      var secondApiKey = "a5d50a95ebdfda3d62868461aaacdca4";
      var queryURL_5DayForcast =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial" +
        "&appid=" +
        secondApiKey;

      $.ajax({
        url: queryURL_5DayForcast,
        method: "GET",
      }).then(function (success) {
        var weatherFiveDayForcast = $("#5DaySection");
        weatherFiveDayForcast.empty();
        // create for loop to iterate through the object array to populate exactly 5 days

        var title = $("#forecastTitle");
        var fiveDayTitle = $("<h3>");
        fiveDayTitle.text("5 Day Forecast");
        title.append(fiveDayTitle);

        for (var i = 0; i < success.list.length; i = i + 8) {
          var fiveDays = success.list[i];
          // create variables
          var fiveDayContainer = $("#5DaySection");
          var fiveDaySections = $("<p>");
          // add content
          fiveDaySections.addClass("col");
          var dayContainer = $("<p>");
          dayContainer.addClass("card bg-light text-dark");
          var predictedDate = $("<h6>");
          predictedDate.addClass("card-title");
          predictedDate.text(new Date(fiveDays.dt_txt).toLocaleDateString());
          var dayTemp = $("<p>");
          dayTemp.addClass("card-text");
          dayTemp.text("Temp: " + fiveDays.main.temp);

          var dayHum = $("<p>");
          var dayHumidity = fiveDays.main.humidity;
          dayHum.addClass("card-text");
          dayHum.text("Hum: " + dayHumidity);

          var dayIcon = fiveDays.weather[0].icon;
          var currentDayIcon = $("<img>");
          currentDayIcon.attr(
            "src",
            "https://openweathermap.org/img/w/" + dayIcon + ".png"
          );

          // append to item
          dayContainer.append(predictedDate);
          dayContainer.append(dayTemp);
          dayContainer.append(dayHum);
          dayContainer.append(currentDayIcon);
          fiveDaySections.append(dayContainer);

          fiveDayContainer.append(fiveDaySections);
        }
      });
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
