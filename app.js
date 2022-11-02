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
            fetchDailyWeatherData(tempLocationKey)

        });

}

//#endregion


//#region Daily Weather Data
//Function to fetch data
function fetchDailyWeatherData(locationKey) {
    let searchString1 = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    let searchString2 = 
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/126125?apikey=T4G26OC4BtBA4ALgUdtG6ePCqXD60A35&details=true&metric=true`)
        .then(res => res.json())
        .then(data => {
            handleDailyWeatherData(data);
        })
}
//Manipulate Weather Data
function handleDailyWeatherData(weatherData) {
    //Current weather Data
    console.log("---- Daily weather ----")
    const weatherDailyObject = weatherData.DailyForecasts[0];

    mineStederData(weatherDailyObject);

    console.log(weatherDailyObject);
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

//Data to frontpage

//Elements from DOM
const stederListe = document.getElementById("mineStederListe");
function mineStederData(weatherData) {




}






// fetchDailyWeatherData();
// fetchHourlyWeatherData();


