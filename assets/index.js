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
     var city = $("#search-section").val();;
     var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
        // console.log(response);
        // console.log(response.name)
        // console.log(response.main.temp)
        // console.log(response.main.humidity)

        var updateName = response.name
        var cityName = $("<span>")
        cityName.text(updateName)
        $("#city-name").append(cityName);
    
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