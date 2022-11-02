// API : https://api.met.no/weatherapi/locationforecast/2.0/documentation
// LocationKey Kolding = 126125

//#region Location Key

//Register if user presses enter in search
let userInputEl = document.getElementById("userSearchInput");
userInputEl.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        getLocationKey(userInputEl.value);
    }
})

//Getting Location key
function getLocationKey(searchInput) {

    let locationKeyURL = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=T4G26OC4BtBA4ALgUdtG6ePCqXD60A35&q=";

    let userSearchInput = userInputEl.value;
    let searchQuery = locationKeyURL + userSearchInput;


    fetch(searchQuery)
    .then(res => res.json())
    .then(data => {
            let tempLocationKey = data[0].Key;
            console.log(tempLocationKey);
            fetchFiveDayWeatherData(tempLocationKey)

        });


}

//#endregion


//#region Daily Weather Data
//Function to fetch data
function fetchFiveDayWeatherData(locationKey) {
    let searchString1 = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    let searchString2 = "?apikey=T4G26OC4BtBA4ALgUdtG6ePCqXD60A35&details=true&metric=true";
    let dailyWeatherQuery = searchString1 + locationKey + searchString2;
    fetch(dailyWeatherQuery)
        .then(res => res.json())
        .then(data => {
            //Function is located in region byOversigt
            handleFiveDayData(data);
            console.log(data);
        })
}


//#endregion

//#region Hourly Weather Data
function fetchHourlyWeatherData() {
    fetch("http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/126125?apikey=T4G26OC4BtBA4ALgUdtG6ePCqXD60A35&details=true&metric=true")
    .then(res => res.json())
        .then(data => {
            handleHourlyWeatherData(data);
        })
}

function handleHourlyWeatherData(weatherData) {
    //Current weather Data
    console.log("---- Hourly weather ----")
    const weatherHourlyObject = weatherData[0];

    console.log(weatherHourlyObject);
}
//#endregion

//#region frontpage

//Elements from DOM
const stederListe = document.getElementById("mineStederListe");
function mineStederData(weatherData) {

}

//#endregion

//#region byOversigt

//DOM elements
let fiveDayUlEl = document.getElementById("fiveDayOverview");

//Manipulate Weather Data
function handleFiveDayData(weatherData) {
    //Current weather Data
    console.log("---- Daily weather ----")
    const weatherDailyObject = weatherData;

    for (let i = 0; i < weatherDailyObject.length; i++) {

        let tempForecastObject = weatherDailyObject[i];
        //Append books to list
        let tempForecastLi = document.createElement("li");
        tempForecastLi.appendChild(document.createTextNode(`Book name: ${tempBook5Object.bookName} - Year: ${tempBook5Object.bookYear} - Author: ${tempBook5Object.bookAuthor}`));
        fiveDayUlEl.append(tempForecastLi);

    }



    console.log(weatherDailyObject);

    //Change site to by oversigt
    // window.location.href = "byOversigt.html"
}


//#endregion
