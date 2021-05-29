var locationList = $(".locationlist")
var mainInfo = $(".maininfo")
var forecastList = $(".forecast")
var submitButton = $(".btnleft")
var api = "6e4ceb0e004fbf2de1aefec5c659a282"




//Display saves cities and 
// function displayLS() {

// }

// function saveLocation(location) {

// }
function getDataAPI(location) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + api + "&units=metric"
    fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          todayInfo(data);
          
        });
}
function todayInfo(data) {
    var temp = data.main.temp
    var wind = data.wind.speed
    var hum = data.main.humidity
    var lon = data.coord.lon
    var lat = data.coord.lat
    var icon = data.weather.icon
    console.log(data.main.temp);
    var urluv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + api + "&unit=metric"
    fetch(urluv)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.current.uvi);
      
    });
    mainInfo.children().eq(1).text("Temperature" + temp + "C")




}


// function foreCast(location) {

// }


// function storeLast(location) {

// }

submitButton.on("click",  function(event) {
    event.preventDefault()
    var location = submitButton.parent().children().eq(0).val()
    getDataAPI(location)   
    // foreCast(location)
    // saveLocation(location)
})



// locationList.on("click", function() {
//     var location = ...
//     mainInfo(location)
//     foreCast(location)
//     saveLocation(location)
// })



