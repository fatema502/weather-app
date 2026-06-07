const apiKey = "2e4852e0b8309242b3d38f0052fc7825";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const cityElement = document.querySelector('.city');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');
const weatherIcon = document.querySelector('.weather-icon');
const weatherDesc = document.querySelector('.description');
const heading = document.createElement('h4');


async function checkWeather(city) {

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('city not found')
        }
        let data = await response.json();
        console.log(data);

        cityElement.innerText = data.name;
        temp.innerText = `${Math.round(data.main.temp)}°C`;
        humidity.innerText = data.main.humidity + '%';
        wind.innerText = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
        weatherIcon.style.visibility = 'visible';

        heading.innerText = `Feels like ${Math.round(data.main.feels_like)}°C `;

        heading.style.fontSize = '30px';
        temp.append(heading);

        weatherDesc.innerText = data.weather[0].description;

        document.body.className = '';
        switch (data.weather[0].main) {
            case 'Clear':
                document.body.classList.add("clear-bg");
                weatherIcon.src = "images/clear.png";
                break;
            case 'Clouds':
                document.body.classList.add("clouds-bg");
                weatherIcon.src = "images/clouds.png";
                break;
            case 'Rain':
                document.body.classList.add("Rain-bg");
                weatherIcon.src = "images/clouds.png";
                break;
            case 'Drizzle':
                document.body.classList.add("drizzle-bg");
                weatherIcon.src = "images/drizzle.png";
                break;
            case 'Mist':
                document.body.classList.add("mist-bg");
                weatherIcon.src = "images/mist.png";
                break;
            case 'Snow':
                document.body.classList.add("snow-bg");
                weatherIcon.src = "images/snow.png";
                break;
        }



    }
    catch (err) {
        cityElement.innerText = 'City Not Found';
        temp.innerText = '---';
        humidity.innerText = '---';
        wind.innerText = '---';
        console.log(err);
        weatherIcon.style.visibility = 'hidden';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(cityInput.value);
})

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkWeather(cityInput.value);
    }
})

checkWeather('Indore');

