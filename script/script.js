var locationList = $(".locationlist")
var mainInfo = $(".maininfo")
var forecastList = $(".forecast")
var submitButton = $(".btnleft")
var uv = $(".uv")
var rightHide = $(".asideright")
var foreHd = $(".forehd")

var api = "6e4ceb0e004fbf2de1aefec5c659a282"

var count=0;





//Display saves cities and 
// function displayLS() {

// }
// Add location to the list if it's not in the list, add location to local storage
function saveLocation(location) {
          hasloc = false;
          var loclist = locationList.children()
          console.log(loclist);
          for (let i = 0; i < loclist.length; i++) {
            var classLoc = loclist[i].getAttribute("class")
              if(classLoc === location) {
                hasloc = true
              }
          }
          if (!hasloc) {
            var newLi = $("<li>")
            newLi.text(location)
            newLi.attr("class", location)
            locationList.append(newLi)
            hasLoc = false;
            localStorage.setItem( count, location)
            count++
          }
      }



//initiate data fetching and display obtained data 
function getDataAPI(location) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + api + "&units=metric"
    fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          todayInfo(data);
          foreCast(data);
        });
}

//Display weather info for the current day, show uv danger level with coloring 
function todayInfo(data) {
    rightHide.removeClass("hide")
    var urluv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude={part}&appid=" + api + "&units=metric"
    fetch(urluv)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var uv = data.current.uvi
      mainInfo.children().eq(4).children().eq(1).text(uv)
      if (0 <=  uv && uv < 3) {
        mainInfo.children().eq(4).children().eq(1).attr("style", "background-color: green; border-radius: 3px;");
      } else if (3 <= uv && uv <6) {
        mainInfo.children().eq(4).children().eq(1).attr("style", "background-color: yellow; border-radius: 3px;");
      } else if (6 <= uv && uv < 7) {
        mainInfo.children().eq(4).children().eq(1).attr("style", "background-color: orange; border-radius: 3px;");
      } else if (7 <= uv ) {
        mainInfo.children().eq(4).children().eq(1).attr("style", "background-color: red; border-radius: 3px;");
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

//Display forecast for 5 days
function foreCast(data) {
    forecastList.removeClass("hide")
    foreHd.removeClass("hide")
    var urluv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude={part}&appid=" + api + "&units=metric"
    fetch(urluv)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var forecastData = data.daily
      for (let i = 0; i < 5; i++) {
        forecastList.children().eq(i).children().eq(0).text(moment.unix(forecastData[i].dt).format("MM/DD/YYYY"))
        forecastList.children().eq(i).children().eq(1).attr("src", "http://openweathermap.org/img/w/"  + forecastData[i].weather[0].icon + ".png")
        forecastList.children().eq(i).children().eq(2).text("Temp: " + forecastData[i].temp.day + " C")
        forecastList.children().eq(i).children().eq(3).text("Wind: " + forecastData[i].wind_speed + " m/s")
        forecastList.children().eq(i).children().eq(4).text("Humidity: " + forecastData[i].humidity + "%")
      }
    })
  }



//Call data by clicking submit button
submitButton.on("click",  function(event) {
    event.preventDefault()
    var location = submitButton.parent().children().eq(0).val()
    getDataAPI(location)   
    // foreCast(location)
    saveLocation(location)
})

//Call data by clicking location in the list
 locationList.on("click", function(event) {
    var liItem = event.target
    console.log(liItem);
    var location = liItem.getAttribute("class")
    getDataAPI(location)
 })


