var locationList = $(".locationlist")
var mainInfo = $(".maininfo")
var forecastList = $(".forecast")
var submitButton = $(".btnleft")
var api = "6e4ceb0e004fbf2de1aefec5c659a282"
var uv = $(".uv")
var rightHide = $(".asideright")




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

//Display weather info for the current day
function todayInfo(data) {
    rightHide.removeClass("hide")
    var urluv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude={part}&appid=" + api + "&unit=metric"
    fetch(urluv)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var uv = data.current.uvi
      mainInfo.children().eq(4).children().eq(1).text(uv)
      if (0<=uv<=3) {
        mainInfo.children().eq(4).children().eq(1).attr("style", "background-color: green");
      } else if (3<=uv<=6) {
        mainInfo.children().eq(4).children().eq(1).attr("style", "background-color: yellow");
      } else if (6<=uv<=7) {
        mainInfo.children().eq(4).children().eq(1).attr("style", "background-color: orange");
      } else if (7<=uv<=10) {
        mainInfo.children().eq(4).children().eq(1).attr("style", "background-color: red");
      }
    });
    mainInfo.children().eq(0).children().eq(0).text(data.name)
    mainInfo.children().eq(0).children().eq(1).text(moment().format('L')  )
    mainInfo.children().eq(0).children().eq(2).attr("src", "http://openweathermap.org/img/w/"  + data.weather[0].icon + ".png")
    mainInfo.children().eq(1).text("Temperature: " + data.main.temp + " C")
    mainInfo.children().eq(2).text("Wind: " + data.wind.speed + " m/s")
    mainInfo.children().eq(3).text("Humidity: " + data.main.humidity + "%")
    mainInfo.children().eq(4).children().eq(0).text("UV: ")
}


 function foreCast(location) {
    
 }


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



