
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

            // document.location.href="byOversigt.html";
             
            
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
    fetch("tempData.json")
    .then(res => res.json())
    .then(data => {
        handleFiveDayData(data);
    })
}



//Manipulate Weather Data
function handleFiveDayData(weatherData) {

    //Weather Data Array
    let weatherFiveDayArray = weatherData.DailyForecasts;
    //Todays weather
    let todaysWeatherObject = weatherFiveDayArray[0];
    
    //DOM elements
    let fiveDayUlEl = document.getElementById("fiveDayList");
    let byOverviewTopSectionEl = document.getElementById("byOverviewTopSection");
    let byOverviewUnderSectionEl = document.getElementById("byOverviewUnderSection");
    
    //---- Data to Overview Top Section ----

    //Get city name from Cookie
    let cityCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('city='))
    ?.split('=')[1];
    console.log(cityCookie)
    
    //Create city title
    let tempCityName = document.createElement("h2");
    tempCityName.setAttribute("id","byOverviewCityName");
    tempCityName.appendChild(document.createTextNode(`${cityCookie}`));
    byOverviewTopSectionEl.append(tempCityName);
    
    //Big cloud image
    let tempCloudImage = document.createElement("i");
    tempCloudImage.setAttribute("class","fa-solid fa-cloud fa-6x");
    byOverviewTopSectionEl.append(tempCloudImage);

    //Create weather Status text
    let tempWeatherStatusText = document.createElement("h2");
    tempWeatherStatusText.setAttribute("id","WeahterStatusText");
    tempWeatherStatusText.appendChild(document.createTextNode(`${todaysWeatherObject.Day.IconPhrase}`));
    byOverviewTopSectionEl.append(tempWeatherStatusText);

    //Create temperature Text
    let tempOverviewTemperText = document.createElement("h1");
    tempOverviewTemperText.setAttribute("id","overviewTemperaturText");
    tempOverviewTemperText.appendChild(document.createTextNode(`${todaysWeatherObject.Temperature.Maximum.Value}°`));
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
    let windSpeedCalculated1 = ((5/18)*todaysWeatherObject.Day.Wind.Speed.Value).toString();
    let tempOverviewWindSpeed = document.createElement("h2");
    tempOverviewWindSpeed.setAttribute("id","overviewWindText");
    tempOverviewWindSpeed.appendChild(document.createTextNode(`${windSpeedCalculated1.slice(0,3)}m/s`));
    tempWindSection.append(tempOverviewWindSpeed);

    //Create Rain amount
    let tempOverviewRainAmount = document.createElement("h3");
    tempOverviewRainAmount.setAttribute("id","overviewRainAmount");
    tempOverviewRainAmount.appendChild(document.createTextNode(`Nedbør: ${todaysWeatherObject.Day.Rain.Value} mm`));
    byOverviewTopSectionEl.append(tempOverviewRainAmount);

    // ---- Data to Overview Bottom Section ----

    //Create Sun up section
    let byOverviewSunUpSection = document.createElement("section");
    byOverviewSunUpSection.setAttribute("id","sunUpSection");
    byOverviewUnderSectionEl.append(byOverviewSunUpSection);

    //Create Sun up Text
    let tempSunUpHeader = document.createElement("h4");
    tempSunUpHeader.setAttribute("id","OverviewSunUpHeader");
    tempSunUpHeader.appendChild(document.createTextNode(`Sol Op`));
    byOverviewSunUpSection.append(tempSunUpHeader);
    
    //Create Sun up Time Data
    let sunUpTimeText = todaysWeatherObject.Sun.Rise.substring(11,16);
    let tempSunUpParagraph = document.createElement("p");
    tempSunUpParagraph.setAttribute("id","overviewSunUpText");    
    tempSunUpParagraph.appendChild(document.createTextNode(`${sunUpTimeText}`));
    byOverviewSunUpSection.append(tempSunUpParagraph);
    
    //Create UV Index section
    let byOverviewUVIndexSection = document.createElement("section");
    byOverviewUVIndexSection.setAttribute("id","sunUVIndexSection");
    byOverviewUnderSectionEl.append(byOverviewUVIndexSection);

    //Create UV index Text
    let tempUVIndexHeader = document.createElement("h4");
    tempUVIndexHeader.setAttribute("id","OverviewUVIndexHeader");
    tempUVIndexHeader.appendChild(document.createTextNode(`UV index`));
    byOverviewUVIndexSection.append(tempUVIndexHeader);
    
    //Create UV Index Data
    let UVIndexText = document.createElement("p");
    UVIndexText.setAttribute("id","overviewUVindexText");    
    UVIndexText.appendChild(document.createTextNode(`${todaysWeatherObject.AirAndPollen[5].Value}`));
    byOverviewUVIndexSection.append(UVIndexText);

      //Create Sun Down section
      let byOverviewSunDownSection = document.createElement("section");
      byOverviewSunDownSection.setAttribute("id","sunDownSection");
      byOverviewUnderSectionEl.append(byOverviewSunDownSection);
  
      //Create Sun Down Text
      let tempSunDownHeader = document.createElement("h4");
      tempSunDownHeader.setAttribute("id","OverviewSunDownHeader");
      tempSunDownHeader.appendChild(document.createTextNode(`Sol Ned`));
      byOverviewSunDownSection.append(tempSunDownHeader);
      
      //Create Sun Down Time Data
      let sunDownTimeText = todaysWeatherObject.Sun.Set.substring(11,16);
      let tempSunDownParagraph = document.createElement("p");
      tempSunDownParagraph.setAttribute("id","overviewSunDownText");    
      tempSunDownParagraph.appendChild(document.createTextNode(`${sunDownTimeText}`));
      byOverviewSunDownSection.append(tempSunDownParagraph);
    
    
    
    
    // ---- Data to 5 day overview section ----
    let IDCounter = 1;
    for (let i = 0; i < weatherFiveDayArray.length; i++) {
        
        let tempForecastObject = weatherFiveDayArray[i];
        console.log("Testing TempForecast")
        console.log(tempForecastObject);

        //Convert date numbers into text
        let currentDate = tempForecastObject.Date;
        let textDate = new Date(currentDate).toString();
        let currentDayText = textDate.slice(0, 3);

        //Maing sections clickable
        let aSection = document.createElement("a");
        aSection.setAttribute("href","chosenDay.html");
        fiveDayUlEl.append(aSection);

        //Create section for entire day
        let tempForecastSection = document.createElement("section");
        tempForecastSection.setAttribute("id",`forecastSection${IDCounter}`)
        aSection.append(tempForecastSection);
        
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

        //Creating Span for text
        let forecastMaxTempSpan = document.createElement("span");
        forecastMaxTempSpan.setAttribute("id",`forecastMaxTempText${IDCounter}`)
        tempDivTemperaturEl.append(forecastMaxTempSpan);
        
        

        //Create Max temperature
        let tempForecastMaxTempH = document.createElement("p");
        tempForecastMaxTempH.setAttribute("class","forecastMaxTemp")
        tempForecastMaxTempH.appendChild(document.createTextNode(`H:\u00A0`));
        let tempForecastMaxTempText = document.createElement("p");
        tempForecastMaxTempText.appendChild(document.createTextNode(` ${tempForecastObject.Temperature.Maximum.Value}`));
        
        
        forecastMaxTempSpan.append(tempForecastMaxTempH);
        tempForecastMaxTempH.append(tempForecastMaxTempText);
        
        //Create Min temperature
        let tempForecastMinTempL = document.createElement("p");
        tempForecastMinTempL.setAttribute("class",`forecastMinTempText`)
        tempForecastMinTempL.appendChild(document.createTextNode(`L:\u00A0`));
        let tempForecastMinTempText = document.createElement("p");
        tempForecastMinTempText.appendChild(document.createTextNode(`${tempForecastObject.Temperature.Minimum.Value}`));
        
        forecastMaxTempSpan.append(tempForecastMinTempL);
        tempForecastMinTempL.append(tempForecastMinTempText)

        //Create Wind Speed 
        let windSpeedCalculated2 = ((5/18)*tempForecastObject.Day.Wind.Speed.Value).toString();
        let tempForecastWind = document.createElement("p");
        tempForecastWind.setAttribute("id",`forecastWindSpeedText${IDCounter}`)
        tempForecastWind.appendChild(document.createTextNode(`${windSpeedCalculated2.slice(0,3)} m/s`));
        tempDivTemperaturEl.append(tempForecastWind);

        //Create div for rain
        let tempForecastRainDiv = document.createElement("div");
        tempForecastRainDiv.setAttribute("id",`tempForecastRainDiv${IDCounter}`)
        tempSectionEl.append(tempForecastRainDiv);

        //Get rain Div
        let tempDivRainEl = document.getElementById(`tempForecastRainDiv${IDCounter}`);

        //Create cloud img
         let tempIconTest = document.createElement("i");
         tempIconTest.setAttribute("class","fa-solid fa-cloud fa-2x");
        tempDivRainEl.append(tempIconTest);

        //Create rain
        let tempForecastRain = document.createElement("p");
        tempForecastRain.setAttribute("id",`forecastRainAmountText${IDCounter}`)
        tempForecastRain.appendChild(document.createTextNode(`${tempForecastObject.Day.Rain.Value} mm`));
        tempDivRainEl.append(tempForecastRain);

        //Create Arrow 
        let tempArrowSVG = document.createElement("i");
        tempArrowSVG.setAttribute("class","fa-solid fa-angle-right");
        tempSectionEl.append(tempArrowSVG);

        

    
        IDCounter++

    }

}


//#endregion
