document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '2fb13d2055ea3d62458084d4bfef0d7a'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherReport = document.getElementById('weatherReport');
                const cityName = document.getElementById('cityName');
                const tempValue = document.getElementById('tempValue');
                const description = document.getElementById('description');
                const humidity = document.getElementById('humidity');
                const windSpeed = document.getElementById('windSpeed');
                const weatherIcon = document.getElementById('weatherIcon');
                const body = document.body;

                cityName.textContent = `${data.name}, ${data.sys.country}`;
                tempValue.textContent = Math.round(data.main.temp);
                description.textContent = data.weather[0].description;
                humidity.textContent = data.main.humidity;
                windSpeed.textContent = data.wind.speed;

                const weatherCondition = data.weather[0].main.toLowerCase();

                if (weatherCondition.includes('cloud')) {
                    body.className = 'cloudy-bg';
                    weatherIcon.className = 'fas fa-cloud';
                } else if (weatherCondition.includes('sun') || weatherCondition.includes('clear')) {
                    body.className = 'sunny-bg';
                    weatherIcon.className = 'fas fa-sun';
                } else if (weatherCondition.includes('rain')) {
                    body.className = 'rainy-bg';
                    weatherIcon.className = 'fas fa-cloud-showers-heavy';
                } else if (weatherCondition.includes('snow')) {
                    body.className = 'snowy-bg';
                    weatherIcon.className = 'fas fa-snowflake';
                } else if (weatherCondition.includes('thunderstorm')) {
                    body.className = 'thunderstorm-bg';
                    weatherIcon.className = 'fas fa-thunderstorm';
                } else {
                    body.className = 'default-bg';
                    weatherIcon.className = 'fas fa-cloud-sun';
                }

                weatherReport.classList.remove('hidden');
                document.getElementById('nextPageBtn').classList.remove('hidden');
            } else {
                document.getElementById('weatherReport').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weatherReport').innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        });
});

document.getElementById('nextPageBtn').addEventListener('click', function() {
    window.location.href = 'nextpage.html'; // Replace with the actual URL of the next page
});
