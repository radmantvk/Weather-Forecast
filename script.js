let weather = {
    "apiKey": "b54617ea1c074766b431daf5af6cda1d",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data; // syntax used to extract the value of the name property inside data object and store it into const name
        const { icon, description } = data.weather[0];
        let { temp, humidity } = data.main;
        let { speed } = data.wind;

        temp = Math.round(10*temp)/10;
        speed = Math.round(10*speed)/10;

        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = `${temp}°C`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}`;
        document.querySelector(".wind").innerText = `${speed} km/h`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector('.result').classList.remove('loading');
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`
    },
    search: function(location) {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

document.querySelector('.search button').addEventListener('click', () => {
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        weather.search();
    }
});

weather.fetchWeather('Vancouver');
