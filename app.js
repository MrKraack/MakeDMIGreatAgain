
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
            let tempCityName = data[0].LocalizedName;
            console.log(tempLocationKey);

            document.cookie = `locationKey=${tempLocationKey}`;
            document.cookie = `city=${tempCityName}`;
             
            
        });


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
//Function to fetch data
function fetchFiveDayWeatherData() {
    
    //Get LocationKey from Cookie
    let locationCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('locationKey='))
    ?.split('=')[1];

    
    
    
    let searchString1 = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    let searchString2 = "?apikey=T4G26OC4BtBA4ALgUdtG6ePCqXD60A35&details=true&metric=true";
    let dailyWeatherQuery = searchString1 + locationCookie + searchString2;
    fetch("/tempData.json")
    .then(res => res.json())
    .then(data => {
        handleFiveDayData(data);
    })
}



//Manipulate Weather Data
function handleFiveDayData(weatherData) {

    //Weather Data Object
    let weatherDailyObject = weatherData.DailyForecasts;
    
    //DOM elements
    let fiveDayUlEl = document.getElementById("fiveDayList");
    let byOverviewTopSectionEl = document.getElementById("byOverviewTopSection");
    let byOverviewUnderSectionEl = document.getElementById("byOverviewUnderSection");
    
    //Get city name from Cookie
    let cityCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('city='))
    ?.split('=')[1];
    console.log(cityCookie)
    
    //Data to overview main

    //Create city title
    let tempCityName = document.createElement("h2");
    tempCityName.setAttribute("id","byOverviewCityName");
    tempCityName.appendChild(document.createTextNode(`${cityCookie}`));
    byOverviewTopSectionEl.append(tempCityName);

    //Big cloud image
    let tempCloudImage = document.createElement("i");
    tempCloudImage.setAttribute("class","fa-solid fa-cloud");
    byOverviewTopSectionEl.append(tempCloudImage);

    //Create weather Status text
    let tempWeatherStatusText = document.createElement("h2");
    tempWeatherStatusText.setAttribute("id","WeahterStatusText");
    tempWeatherStatusText.appendChild(document.createTextNode(`${weatherDailyObject[0].Day.IconPhrase}`));
    byOverviewTopSectionEl.append(tempWeatherStatusText);

    //Create temperature Text
    let tempOverviewTemperText = document.createElement("h1");
    tempOverviewTemperText.setAttribute("id","overviewTemperaturText");
    tempOverviewTemperText.appendChild(document.createTextNode(`${weatherDailyObject[0].Temperature.Maximum.Value}°`));
    byOverviewTopSectionEl.append(tempOverviewTemperText);

    //Create Wind Section
    let tempWindSection = document.createElement("section");
    tempWindSection.setAttribute("id","windSection");
    byOverviewTopSectionEl.append(tempWindSection);

    //create wind Image
    let tempWindImg = document.createElement("i");
    tempWindImg.setAttribute("class","fa-solid fa-wind");
    tempWindSection.append(tempWindImg);
    
    //Create Wind speed
    let tempOverviewWindSpeed = document.createElement("h2");
    tempOverviewWindSpeed.setAttribute("id","overviewWindText");
    tempOverviewWindSpeed.appendChild(document.createTextNode(`${weatherDailyObject[0].Day.Wind.Speed.Value}m/s`));
    tempWindSection.append(tempOverviewWindSpeed);

    //Create Rain amount
    let tempOverviewRainAmount = document.createElement("h3");
    tempOverviewRainAmount.setAttribute("id","overviewRainAmount");
    tempOverviewRainAmount.appendChild(document.createTextNode(`Nedbør: ${weatherDailyObject[0].Day.Rain.Value} mm`));
    byOverviewTopSectionEl.append(tempOverviewRainAmount);
    
    
    
    //Data to List items
    let IDCounter = 1;
    for (let i = 0; i < weatherDailyObject.length; i++) {
        
        let tempForecastObject = weatherDailyObject[i];
        console.log("Testing TempForecast")
        console.log(tempForecastObject);

        //Convert date numbers into text
        let currentDate = tempForecastObject.Date;
        let textDate = new Date(currentDate).toString();
        let currentDayText = textDate.slice(0, 3);

        //Create section 
        let tempForecastSection = document.createElement("section");
        tempForecastSection.setAttribute("id",`forecastSection${IDCounter}`)
        fiveDayUlEl.append(tempForecastSection);
        
        //Get section element
        let tempSectionEl = document.getElementById(`forecastSection${IDCounter}`);
        
        //Create Date Text and append to div
        let tempForecastDateH = document.createElement("h4");
        tempForecastDateH.setAttribute("id",`forecastDayText${IDCounter}`)
        tempForecastDateH.appendChild(document.createTextNode(`${currentDayText}`));
        tempSectionEl.append(tempForecastDateH);

        //Create Div for basic info
        let tempForecastTemperaturDiv = document.createElement("div");
        tempForecastTemperaturDiv.setAttribute("id",`tempForecastTemperaturDiv${IDCounter}`)
        tempSectionEl.append(tempForecastTemperaturDiv);

        //Get Temperatur Div
        let tempDivTemperaturEl = document.getElementById(`tempForecastTemperaturDiv${IDCounter}`);

        //Create Max temperature
        let tempForecastMaxTemp = document.createElement("p");
        tempForecastMaxTemp.setAttribute("id",`forecastMaxTempText${IDCounter}`)
        tempForecastMaxTemp.appendChild(document.createTextNode(`H: ${tempForecastObject.Temperature.Maximum.Value}`));
        tempDivTemperaturEl.append(tempForecastMaxTemp);

        //Create Min temperature
        let tempForecastMinTemp = document.createElement("p");
        tempForecastMinTemp.setAttribute("id",`forecastMinTempText${IDCounter}`)
        tempForecastMinTemp.appendChild(document.createTextNode(`L: ${tempForecastObject.Temperature.Minimum.Value}`));
        tempDivTemperaturEl.append(tempForecastMinTemp);


        //Create Wind Speed 
        let tempForecastWind = document.createElement("p");
        tempForecastWind.setAttribute("id",`forecastWindSpeedText${IDCounter}`)
        tempForecastWind.appendChild(document.createTextNode(`${tempForecastObject.Day.Wind.Speed.Value} m/s`));
        tempDivTemperaturEl.append(tempForecastWind);

        //Create div for rain
        let tempForecastRainDiv = document.createElement("div");
        tempForecastRainDiv.setAttribute("id",`tempForecastRainDiv${IDCounter}`)
        tempSectionEl.append(tempForecastRainDiv);

        //Get rain Div
        let tempDivRainEl = document.getElementById(`tempForecastRainDiv${IDCounter}`);

        //Create cloud img
         let tempIconTest = document.createElement("i");
         tempIconTest.setAttribute("class","fa-solid fa-cloud");
        tempDivRainEl.append(tempIconTest);

        //Create rain
        let tempForecastRain = document.createElement("p");
        tempForecastRain.setAttribute("id",`forecastRainAmountText${IDCounter}`)
        tempForecastRain.appendChild(document.createTextNode(`${tempForecastObject.Day.Rain.Value} mm`));
        tempDivRainEl.append(tempForecastRain);

        

    
        IDCounter++

    }

}


//#endregion
