$(document).ready(function () {
  // DOM variables

  var searchInput = $("#search-section");
  var searchDisplayEl = $("#search-display");
  var submitBtnEl = $("#submit-btn");
  var day1=$("#day-1")
  var day2=$("#day-2")
  var day3=$("#day-3")
  var day4=$("#day-4")
  var day5=$("#day-5")

  // JS variables

  var apiKey = "a5d50a95ebdfda3d62868461aaacdca4";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;
  var city = "Atlanta";

  // function definitiions

  // function calls

  // Event listeners

  submitBtnEl.on("click", function (event) {
    event.preventDefault();
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  });
});
