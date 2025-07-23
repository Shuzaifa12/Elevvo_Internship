  const apiKey = "7e5febd98381a3ddc169118756455e40"; // Replace with your actual OpenWeatherMap API key

    async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      if (!city) return;

      document.getElementById("loading").style.display = "block";
      document.getElementById("weather").style.display = "none";
      document.getElementById("forecast").style.display = "none";

      try {
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const weatherData = await weatherRes.json();

        if (weatherData.cod !== 200) {
          alert("City not found");
          document.getElementById("loading").style.display = "none";
          return;
        }

        displayCurrentWeather(weatherData);

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`
        );
        const forecastData = await forecastRes.json();
        displayForecast(forecastData.list);

        document.getElementById("loading").style.display = "none";
      } catch (error) {
        console.error(error);
        alert("Error fetching weather data.");
        document.getElementById("loading").style.display = "none";
      }
    }

    function displayCurrentWeather(data) {
      const weatherDiv = document.getElementById("weather");
      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" />
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      `;
      weatherDiv.style.display = "block";
    }

    function displayForecast(forecastList) {
      const forecastDiv = document.getElementById("forecast");
      const filtered = forecastList.filter((item, index) => index % 8 === 0).slice(0, 3); // 3-day forecast

      forecastDiv.innerHTML = `<h2>3-Day Forecast</h2><div class="forecast-grid">
        ${filtered.map(forecast => {
          const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short", month: "short", day: "numeric"
          });
          return `
            <div class="forecast-day">
              <h3>${date}</h3>
              <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="icon" />
              <p>${forecast.weather[0].main}</p>
              <p>${forecast.main.temp} °C</p>
            </div>
          `;
        }).join("")}
      </div>`;
      forecastDiv.style.display = "block";
    }
