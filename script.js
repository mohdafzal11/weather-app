document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("location-input");
    const getWeatherButton = document.getElementById("get-weather-button");
    const unitSelect = document.getElementById("unit-select");
    const weatherInfo = document.getElementById("weather-info");
    const locationName = document.getElementById("location-name");
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const weatherDescription = document.getElementById("weather-description");
    const errorMessage = document.getElementById("error-message");

    getWeatherButton.addEventListener("click", function () {
        const location = locationInput.value;
        const unit = unitSelect.value;
        if (location.trim() !== "") {
            fetchWeather(location, unit);
        }
    });

    unitSelect.addEventListener("change", function () {
        const location = locationInput.value;
        const unit = unitSelect.value;
        if (location.trim() !== "") {
            fetchWeather(location, unit);
        }
    });

    function fetchWeather(location, unit) {
        const apiKey = "d77e6be2c3f6b2975c5e8921b7d60876"; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    alert("Enter the city name or zip code")
                    throw new Error("City not found.");
                }
                return response.json();
            })
            .then((data) => {
                displayWeather(data);
                errorMessage.classList.add("hidden");
            })
            .catch((error) => {
                displayError(error.message);
            });
    }

    function displayWeather(data) {
        locationName.textContent = data.name;
        temperature.textContent = data.main.temp;
        humidity.textContent = data.main.humidity;
        windSpeed.textContent = data.wind.speed;
        weatherDescription.textContent = data.weather[0].description;
        weatherInfo.classList.remove("hidden");
    }

    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }
});
