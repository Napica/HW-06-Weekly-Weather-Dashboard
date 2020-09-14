$(document).ready(function(){
   
    // DOM variables
        var searchDisplayEl = $("#search-display")
    // JS variables
        var apiKey = "9645c954451461a29576d480f62bed18";
        var citySearch = []
        // var previousSearch;

    // function definitiions

    //     function setup(){
    //     var currentlocalStorage = JSON.parse(localStorage.getItem("previousSearch"));
    //     if (currentlocalStorage !== null) {
    //         previousSearch = currentlocalStorage
    //     } else {
    //         previousSearch = [];
    //     }
    // }

    // function displayPrevious(){
    //     setup();
    //     for (var i = 0; previousSearch.length; i++);

    // }

    // function calls

    //    setup();
    //    displayPrevious();

    // Event listeners

    $("#search-form").on("submit", function(event){
        event.preventDefault();
        var searchCriteria = $("#search-term").val();  
        var queryURL = "api.openweathermap.org/data/2.5/weather?q=[london]&appid=" + apiKey;
        $.ajax ({
            url: queryURL,
            method:"GET"
        }).then(function(response) {
    
            // searchDisplayEl.empty()
            // for (var i = 0; i < response.data.length; i ++){
            // searchDisplayEl.append();
            // }

            // previousSearch.push(searchCriteria)
            // localStorage.setItem("previousSearch")
        })

    })
});