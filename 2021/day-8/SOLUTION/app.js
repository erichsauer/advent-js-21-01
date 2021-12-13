const daysElements = [...document.querySelectorAll('.day')]
const daysOfWeekMap = {
    0: 'SUN', 
    1: 'MON', 
    2: 'TUES', 
    3: 'WED', 
    4: 'THUR', 
    5: 'FRI', 
    6: 'SAT'
}

const iconNameToSizeMap = {
    cloudy: { width: 264, height: 166},
    sunny: { width: 208, height: 213},
    stormy: { width: 246, height: 187},
    snowy: { width: 230, height: 196},
    rainy: { width: 160, height: 222},
}


const getWeatherData = async () => {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=40.7484&lon=73.9857&exclude=current,minutely,hourly,alert&appid=<YOUR_API_KEY>&units=imperial`);
        const data = await res.json();
        const retVal = data.daily.map(dayWeather => {
            let weatherType = "sunny";
            if(dayWeather.weather[0].main.toLowerCase().includes('rain')){
                weatherType = "rainy";
            }else if(dayWeather.weather[0].main.toLowerCase().includes('snow')){
                weatherType = "snowy";
            }else if(dayWeather.weather[0].main.toLowerCase().includes('cloud')){
                weatherType = "cloudy";
            }else if(dayWeather.weather[0].main.toLowerCase().includes('rain')){
                weatherType = "rainy";
            }
            const retVal = {
                minTemp: Math.round(dayWeather.temp.min),
                maxTemp: Math.round(dayWeather.temp.max),
                dayTemp: Math.round(dayWeather.temp.day),
                pop: dayWeather.pop * 100 ,
                weatherType
            }
            return retVal;
        })
        return retVal;
    } catch (err) {
        console.error(err);
    }
}

const updateUI = (weatherData) => {
    
    const currentDate = new Date();
    const day = currentDate.getDate();
    daysElements.forEach( (dayElement,i) => {
        const dayElementChildren = dayElement.childNodes;
        const dayOfWeek = dayElementChildren[1];
        dayOfWeek.innerText = daysOfWeekMap[(day + i) % 7];
        const date = dayElementChildren[3];
        date.innerText = day + i;

        const dayWeather = weatherData[i];
        const bar = dayElementChildren[5];
        bar.setAttribute('class', '');
        bar.classList.add('bar')
        bar.classList.add(dayWeather.weatherType);

        const barChildren = bar.childNodes;
        const weather = barChildren[1];
        const svgUse = weather.childNodes[1].childNodes[1];
        svgUse.setAttribute('xlink:href', `#${dayWeather.weatherType}`);
        svgUse.height = iconNameToSizeMap[dayWeather.weatherType].height;
        svgUse.width = iconNameToSizeMap[dayWeather.weatherType].width;

        const temperature = barChildren[3];
        temperature.innerHTML = `${dayWeather.maxTemp}<span class="degrees">&deg;</span>`

        const content = barChildren[5];
        const precipitation = content.children[0];
        precipitation.innerHTML = `
        <svg role="img" class="icon">
              <use xlink:href="#precipitation"></use>
            </svg>
            ${dayWeather.pop}%`
        const low = content.children[1];
        low.innerHTML = `<svg role="img" class="icon">
              <use xlink:href="#low"></use>
            </svg>
            ${dayWeather.minTemp}&deg;`
    })
}

const loadItUp = async () => {
    const weatherData = await getWeatherData();
    updateUI(weatherData);
}
loadItUp();


