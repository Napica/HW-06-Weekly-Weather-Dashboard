$(document).ready(function () {
  var searchFormEl = $("#search-form");
  var cityArchives = [];

  searchFormEl.on("submit", function (event) {
    event.preventDefault();
    submitCity();
  });

  function previousCity() {
    var searchDisplayEl = $("#search-display");
    console.log(searchDisplayEl);
    for (var i = 0; i < cityArchives.length; i++) {
      var cityBtn = $("<button>");
      console.log(cityBtn);
      cityBtn.text(cityArchives[i]);
      searchDisplayEl.append(cityBtn);
    }
  }

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
      var citySpecs = $("#city-specs");
      citySpecs.empty();

      citySpecsContainer = $("<div>");

      var cityContainer = $("<p>");
      cityContainer.addClass("card bg-light text-dark");

      var timeLib = moment();
      var datePull = timeLib.format("L");
      var updateName = $("<h1>");
      updateName.addClass("card-title");
      updateName.text(success.name + " " + datePull);

      var iconSpan = $("<span>");
      updateName.append(iconSpan);

      var weatherStamp = success.weather[0].icon;
      var currentIcon = $("<img>");
      currentIcon.attr(
        "src",
        "https://openweathermap.org/img/w/" + weatherStamp + ".png"
      );
      currentIcon.css("width", "100px");
      currentIcon.append(iconSpan);

      var updateWeatherTemp = $("<p>");
      updateWeatherTemp.addClass("card-text");
      updateWeatherTemp.text(
        "Themperature: " + success.main.temp + "\u00B0" + " F"
      );

      var updateHumidity = $("<p>");
      updateHumidity.addClass("card-text");
      updateHumidity.text("Humidity: " + success.main.humidity + " %");

      var windSpeedConvert = $("<p>");
      windSpeedConvert.addClass("card-text");
      windSpeedConvert.text("Wind Speed: " + success.wind.speed + " mph");

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
        var uvIndexSection = indexUVValue.value;
        var uvIndexItem = $("<button>");
        uvIndexItem.css("width", "50px");

        uvIndexItem.text(uvIndexSection);
        if (uvIndexSection < 4) {
          uvIndexItem.css("background-color", "green");
        } else if (uvIndexSection <= 7) {
          uvIndexItem.css("background-color", "yellow");
        } else {
          uvIndexItem.css("background-color", "red");
        }

        cityContainer.append(updateName);
        cityContainer.append(currentIcon);
        cityContainer.append(updateWeatherTemp);
        cityContainer.append(updateHumidity);
        cityContainer.append(windSpeedConvert);
        cityContainer.append(uvIndexItem);
        citySpecsContainer.append(cityContainer);

        citySpecs.append(citySpecsContainer);
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

        var fiveDayTitle = $("<h3>");
        fiveDayTitle.text("5 Day Forecast");
        title.append(fiveDayTitle);

        for (var i = 0; i < success.list.length; i = i + 8) {
          var fiveDays = success.list[i];

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
          dayTemp.text("Temp: " + fiveDays.main.temp + "\u00B0" + " F");

          var dayHum = $("<p>");
          var dayHumidity = fiveDays.main.humidity;
          dayHum.addClass("card-text");
          dayHum.text("Hum: " + dayHumidity + " %");

          var dayIcon = fiveDays.weather[0].icon;
          var currentDayIcon = $("<img>");
          currentDayIcon.attr(
            "src",
            "https://openweathermap.org/img/w/" + dayIcon + ".png"
          );
          currentDayIcon.css("width", "50px");

          dayContainer.append(predictedDate);
          dayContainer.append(dayTemp);
          dayContainer.append(dayHum);
          dayContainer.append(currentDayIcon);
          fiveDaySections.append(dayContainer);

          fiveDayContainer.append(fiveDaySections);
        }
      });
    });

    // previousCity();
    cityArchives.push(submitCity);
    localStorage.setItem(cityArchives, submitCity);
  }
});
