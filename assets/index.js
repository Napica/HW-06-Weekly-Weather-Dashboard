$(document).ready(function () {
  // DOM variables
  var searchFormEl = $("#search-form");
  var inputEl = $("#search-section");
  var searchDisplayEl = $("#search-display");
  var cityArchives = [];

  searchFormEl.on("submit", function (event) {
    event.preventDefault();

    submitCity();
  });

  function submitCity() {
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
      var timeLib = moment();
      var datePull = timeLib.format("L");

      var citySpecs = $("#city-specs");
      citySpecs.empty()

      citySpecsContainer = $("<div>");

      var cityContainer = $("<p>");
      cityContainer.addClass("card bg-light text-dark");

      // updates the name of the city searched
      var updateName = $("<h1>");
      updateName.addClass("card-title");
      updateName.text(success.name + " " + datePull);

      // var iconSpan = $("<span>")
      // updateName.append(iconSpan)

      // var weatherStamp = success.weather[0].icon;
      // var currentIcon = $("<img>");
      // currentIcon.attr(
      //   "src",
      //   "https://openweathermap.org/img/w/" + weatherStamp + ".png"
      // );
      // currentIcon.append(iconSpan)

      var updateWeatherTemp = $("<p>");
      updateWeatherTemp.addClass("card-text");
      updateWeatherTemp.text(
        "Themperature: " + success.main.temp + "\u00B0" + " F"
      );

    
        var updateHumidity = $("<p>")
        updateHumidity.addClass("card-text");
        updateHumidity.text("Humidity: " + success.main.humidity + " %")

        var windSpeedConvert = $("<p>")
        windSpeedConvert.addClass("card-text")
        windSpeedConvert.text("Wind Speed: " + success.wind.speed + " mph")  

        
        // last left off trying to append the index to the P tag  !!!!!!!!!!!!!!!!!!!!!!!!!

      // append

      cityContainer.append(updateName);
      // cityContainer.append(iconSpan)
      cityContainer.append(updateWeatherTemp)
      cityContainer.append(updateHumidity)
      cityContainer.append(windSpeedConvert)
      // cityContainer.append()
      citySpecsContainer.append(cityContainer);

      citySpecs.append(citySpecsContainer);

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
      }).then(function (indexUVValue) { 
        indexUVValue.empty();
        var uvIndexSection = $("<span>");
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
        var title = $("#forecastTitle");
        weatherFiveDayForcast.empty();
        title.empty();
        // create for loop to iterate through the object array to populate exactly 5 days

        var fiveDayTitle = $("<h3>");
        fiveDayTitle.text("5 Day Forecast");
        title.append(fiveDayTitle);

        for (var i = 0; i < success.list.length; i = i + 8) {
          var fiveDays = success.list[i];
          // create variables
          var fiveDayContainer = $("#5DaySection");
          var fiveDaySections = $("<p>");

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
  }
});
