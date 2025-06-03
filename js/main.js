// Global variables
let cityData = [];
let currentUnit = 'celsius';
const API_KEY = '1635890d447b1c9c35b8f972c3430f35'; // OpenWeatherMap API key

// Hardcoded city data to avoid fetch issues with local files
const hardcodedCityData = [
    {latitude: "52.367", longitude: "4.904", city: "Amsterdam", country: "Netherlands"},
    {latitude: "39.933", longitude: "32.859", city: "Ankara", country: "Turkey"},
    {latitude: "56.134", longitude: "12.945", city: "Åstorp", country: "Sweden"},
    {latitude: "37.983", longitude: "23.727", city: "Athens", country: "Greece"},
    {latitude: "54.597", longitude: "-5.930", city: "Belfast", country: "Northern Ireland"},
    {latitude: "41.387", longitude: "2.168", city: "Barcelona", country: "Spain"},
    {latitude: "52.520", longitude: "13.405", city: "Berlin", country: "Germany"},
    {latitude: "46.948", longitude: "7.447", city: "Bern", country: "Switzerland"},
    {latitude: "43.263", longitude: "-2.935", city: "Bilbao", country: "Spain"},
    {latitude: "50.847", longitude: "4.357", city: "Brussels", country: "Belgium"},
    {latitude: "47.497", longitude: "19.040", city: "Bucharest", country: "Romania"},
    {latitude: "59.329", longitude: "18.068", city: "Budapest", country: "Hungary"},
    {latitude: "51.483", longitude: "-3.168", city: "Cardiff", country: "Wales"},
    {latitude: "50.937", longitude: "6.96", city: "Cologne", country: "Germany"},
    {latitude: "55.676", longitude: "12.568", city: "Copenhagen", country: "Denmark"},
    {latitude: "51.898", longitude: "-8.475", city: "Cork", country: "Ireland"},
    {latitude: "53.349", longitude: "-6.260", city: "Dublin", country: "Ireland"},
    {latitude: "55.953", longitude: "-3.188", city: "Edinburgh", country: "Scotland"},
    {latitude: "43.7696", longitude: "11.255", city: "Florence", country: "Italy"},
    {latitude: "50.110", longitude: "8.682", city: "Frankfurt", country: "Germany"},
    {latitude: "43.254", longitude: "6.637", city: "French Riviera", country: "France"},
    {latitude: "32.650", longitude: "-16.908", city: "Funchal", country: "Portugual"},
    {latitude: "36.140", longitude: "-5.353", city: "Gibraltar", country: ""},
    {latitude: "57.708", longitude: "11.974", city: "Gothenburg", country: "Sweden"},
    {latitude: "53.548", longitude: "9.987", city: "Hamburg", country: "Germany"},
    {latitude: "60.169", longitude: "24.938", city: "Helsinki", country: "Finland"},
    {latitude: "39.020", longitude: "1.482", city: "Ibiza", country: "Spain"},
    {latitude: "50.450", longitude: "30.523", city: "Kyiv", country: "Ukraine"},
    {latitude: "61.115", longitude: "10.466", city: "Lillehammer", country: "Norway"},
    {latitude: "38.722", longitude: "-9.139", city: "Lisbon", country: "Portugual"},
    {latitude: "51.507", longitude: "-0.127", city: "London", country: "England"},
    {latitude: "40.416", longitude: "-3.703", city: "Madrid", country: "Spain"},
    {latitude: "39.695", longitude: "3.017", city: "Mallorca", country: "Spain"},
    {latitude: "53.480", longitude: "-2.242", city: "Manchester", country: "England"},
    {latitude: "43.296", longitude: "5.369", city: "Marseille", country: "France"},
    {latitude: "27.760", longitude: "-15.586", city: "Maspalomas", country: "Spain"},
    {latitude: "45.464", longitude: "9.190", city: "Milan", country: "Italy"},
    {latitude: "48.135", longitude: "11.582", city: "Munich", country: "Germany"},
    {latitude: "40.851", longitude: "14.268", city: "Naples", country: "Italy"},
    {latitude: "43.034", longitude: "-2.417", city: "Oñati", country: "Spain"},
    {latitude: "59.913", longitude: "10.752", city: "Oslo", country: "Norway"},
    {latitude: "48.856", longitude: "2.352", city: "Paris", country: "France"},
    {latitude: "50.075", longitude: "14.437", city: "Prague", country: "Czech Republic"},
    {latitude: "64.146", longitude: "-21.942", city: "Reykjavík", country: "Iceland"},
    {latitude: "56.879", longitude: "24.603", city: "Riga", country: "Latvia"},
    {latitude: "41.902", longitude: "12.496", city: "Rome", country: "Italy"},
    {latitude: "39.453", longitude: "-31.127", city: "Santa Cruz das Flores", country: "Portugual"},
    {latitude: "28.463", longitude: "-16.251", city: "Santa Cruz de Tenerife", country: "Spain"},
    {latitude: "57.273", longitude: "-6.215", city: "Skye", country: "Scotland"},
    {latitude: "42.697", longitude: "23.321", city: "Sofia", country: "Bulgaria"},
    {latitude: "59.329", longitude: "18.068", city: "Stockholm", country: "Sweden"},
    {latitude: "59.437", longitude: "24.753", city: "Tallinn", country: "Estonia"},
    {latitude: "18.208", longitude: "16.373", city: "Vienna", country: "Austria"},
    {latitude: "52.229", longitude: "21.012", city: "Warsaw", country: "Poland"},
    {latitude: "53.961", longitude: "-1.07", city: "York", country: "England"},
    {latitude: "47.376", longitude: "8.541", city: "Zurich", country: "Switzerland"}
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Load city data
    cityData = hardcodedCityData;
    
    // Populate dropdowns
    populateDropdowns();
    
    // Set up event listeners
    document.getElementById('celsius-btn').addEventListener('click', () => setTemperatureUnit('celsius'));
    document.getElementById('fahrenheit-btn').addEventListener('click', () => setTemperatureUnit('fahrenheit'));
    document.getElementById('search-btn').addEventListener('click', handleCitySearch);
    document.getElementById('city-dropdown').addEventListener('change', handleCitySelect);
    document.getElementById('compare-btn').addEventListener('click', compareCities);
    
    // Enter key for search
    document.getElementById('city-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCitySearch();
        }
    });
});

// Populate city dropdowns
function populateDropdowns() {
    const cityDropdown = document.getElementById('city-dropdown');
    const compareCity1 = document.getElementById('compare-city1');
    const compareCity2 = document.getElementById('compare-city2');
    
    // Sort cities alphabetically
    cityData.sort((a, b) => a.city.localeCompare(b.city));
    
    cityData.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city.latitude},${city.longitude}`;
        option.textContent = `${city.city}, ${city.country}`;
        
        cityDropdown.appendChild(option.cloneNode(true));
        compareCity1.appendChild(option.cloneNode(true));
        compareCity2.appendChild(option.cloneNode(true));
    });
}

// Handle city selection from dropdown
function handleCitySelect() {
    const dropdown = document.getElementById('city-dropdown');
    const selectedValue = dropdown.value;
    
    if (selectedValue) {
        const [lat, lon] = selectedValue.split(',');
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        const cityName = selectedOption.textContent;
        
        fetchWeatherData(lat, lon, cityName);
    }
}

// Handle city search
function handleCitySearch() {
    const searchInput = document.getElementById('city-search').value.trim();
    
    if (searchInput === '') {
        showError('Please enter a city name');
        return;
    }
    
    // Find city in our data
    const foundCity = cityData.find(city => 
        city.city.toLowerCase() === searchInput.toLowerCase() ||
        `${city.city}, ${city.country}`.toLowerCase() === searchInput.toLowerCase()
    );
    
    if (foundCity) {
        fetchWeatherData(foundCity.latitude, foundCity.longitude, `${foundCity.city}, ${foundCity.country}`);
    } else {
        // If not in our data, try to geocode with OpenWeatherMap
        geocodeCity(searchInput);
    }
}

// Geocode city name to coordinates using OpenWeatherMap API
async function geocodeCity(cityName) {
    try {
        showLoading(true);
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`);
        const data = await response.json();
        
        if (data.length > 0) {
            const { lat, lon, name, country } = data[0];
            fetchWeatherData(lat, lon, `${name}, ${country}`);
        } else {
            showError(`City "${cityName}" not found. Please try another city.`);
            showLoading(false);
        }
    } catch (error) {
        console.error('Error geocoding city:', error);
        showError('Failed to search for city. Please try again.');
        showLoading(false);
    }
}

// Fetch weather data from OpenWeatherMap API
async function fetchWeatherData(lat, lon, cityName) {
    try {
        showLoading(true);
        
        // Fetch current weather
        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!currentWeatherResponse.ok) {
            throw new Error(`HTTP error! status: ${currentWeatherResponse.status}`);
        }
        
        const currentWeatherData = await currentWeatherResponse.json();
        
        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!forecastResponse.ok) {
            throw new Error(`HTTP error! status: ${forecastResponse.status}`);
        }
        
        const forecastData = await forecastResponse.json();
        
        // Update UI with weather data
        updateCurrentWeather(currentWeatherData, cityName);
        updateForecast(forecastData);
        
        showLoading(false);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(`Failed to fetch weather data: ${error.message}`);
        showLoading(false);
    }
}

// Update current weather display
function updateCurrentWeather(data, cityName) {
    document.getElementById('city-name').textContent = cityName;
    
    const temp = currentUnit === 'celsius' ? data.main.temp : celsiusToFahrenheit(data.main.temp);
    document.getElementById('temperature').textContent = `${Math.round(temp)}°${currentUnit === 'celsius' ? 'C' : 'F'}`;
    
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind: ${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    
    // Update weather icon
    const iconElement = document.getElementById('weather-icon');
    iconElement.src = getWeatherIconPath(data.weather[0].icon);
    iconElement.alt = data.weather[0].description;
}

// Update forecast display
function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    // Group forecast data by day (taking noon forecast for each day)
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toISOString().split('T')[0];
        const hour = date.getHours();
        
        // Take forecast closest to noon for each day
        if (!dailyForecasts[day] || Math.abs(hour - 12) < Math.abs(new Date(dailyForecasts[day].dt * 1000).getHours() - 12)) {
            dailyForecasts[day] = item;
        }
    });
    
    // Create forecast cards (limit to 5 days)
    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayMonth = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        
        const temp = currentUnit === 'celsius' ? forecast.main.temp : celsiusToFahrenheit(forecast.main.temp);
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-date">${dayName}</div>
            <div>${dayMonth}</div>
            <img src="${getWeatherIconPath(forecast.weather[0].icon)}" alt="${forecast.weather[0].description}">
            <div>${Math.round(temp)}°${currentUnit === 'celsius' ? 'C' : 'F'}</div>
            <div>${forecast.weather[0].description}</div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// Compare two cities
async function compareCities() {
    const city1Select = document.getElementById('compare-city1');
    const city2Select = document.getElementById('compare-city2');
    
    const city1Value = city1Select.value;
    const city2Value = city2Select.value;
    
    if (!city1Value || !city2Value) {
        showError('Please select two cities to compare');
        return;
    }
    
    try {
        showLoading(true);
        
        // Get city names
        const city1Name = city1Select.options[city1Select.selectedIndex].textContent;
        const city2Name = city2Select.options[city2Select.selectedIndex].textContent;
        
        // Get coordinates
        const [lat1, lon1] = city1Value.split(',');
        const [lat2, lon2] = city2Value.split(',');
        
        // Fetch weather data for both cities
        const [city1Data, city2Data] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=${API_KEY}&units=metric`)
                .then(res => res.json()),
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&appid=${API_KEY}&units=metric`)
                .then(res => res.json())
        ]);
        
        // Update comparison UI
        updateComparisonUI(city1Data, city2Data, city1Name, city2Name);
        
        showLoading(false);
    } catch (error) {
        console.error('Error comparing cities:', error);
        showError('Failed to compare cities. Please try again.');
        showLoading(false);
    }
}

// Update comparison UI
function updateComparisonUI(city1Data, city2Data, city1Name, city2Name) {
    const compareResult1 = document.getElementById('compare-result1');
    const compareResult2 = document.getElementById('compare-result2');
    
    // City 1
    compareResult1.querySelector('h3').textContent = city1Name;
    const temp1 = currentUnit === 'celsius' ? city1Data.main.temp : celsiusToFahrenheit(city1Data.main.temp);
    
    compareResult1.querySelector('.compare-weather-info').innerHTML = `
        <div class="weather-info">
            <div class="weather-icon-container">
                <img src="${getWeatherIconPath(city1Data.weather[0].icon)}" alt="${city1Data.weather[0].description}">
            </div>
            <div class="weather-details">
                <p class="compare-temp">${Math.round(temp1)}°${currentUnit === 'celsius' ? 'C' : 'F'}</p>
                <p>${city1Data.weather[0].description}</p>
                <p>Humidity: ${city1Data.main.humidity}%</p>
                <p>Wind: ${Math.round(city1Data.wind.speed * 3.6)} km/h</p>
            </div>
        </div>
    `;
    
    // City 2
    compareResult2.querySelector('h3').textContent = city2Name;
    const temp2 = currentUnit === 'celsius' ? city2Data.main.temp : celsiusToFahrenheit(city2Data.main.temp);
    
    compareResult2.querySelector('.compare-weather-info').innerHTML = `
        <div class="weather-info">
            <div class="weather-icon-container">
                <img src="${getWeatherIconPath(city2Data.weather[0].icon)}" alt="${city2Data.weather[0].description}">
            </div>
            <div class="weather-details">
                <p class="compare-temp">${Math.round(temp2)}°${currentUnit === 'celsius' ? 'C' : 'F'}</p>
                <p>${city2Data.weather[0].description}</p>
                <p>Humidity: ${city2Data.main.humidity}%</p>
                <p>Wind: ${Math.round(city2Data.wind.speed * 3.6)} km/h</p>
            </div>
        </div>
    `;
}

// Set temperature unit (Celsius or Fahrenheit)
function setTemperatureUnit(unit) {
    if (currentUnit === unit) return;
    
    currentUnit = unit;
    
    // Update UI buttons
    document.getElementById('celsius-btn').classList.toggle('active', unit === 'celsius');
    document.getElementById('fahrenheit-btn').classList.toggle('active', unit === 'fahrenheit');
    
    // Update displayed temperatures
    const cityDropdown = document.getElementById('city-dropdown');
    if (cityDropdown.value) {
        // If a city is selected, refresh the weather display
        handleCitySelect();
    }
    
    // Update comparison if active
    const compareCity1 = document.getElementById('compare-city1');
    const compareCity2 = document.getElementById('compare-city2');
    if (compareCity1.value && compareCity2.value) {
        compareCities();
    }
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Get weather icon path based on OpenWeatherMap icon code
function getWeatherIconPath(iconCode) {
    // Map OpenWeatherMap icon codes to our local images
    const iconMap = {
        '01d': 'clear.png', // clear sky day
        '01n': 'clear.png', // clear sky night
        '02d': 'pcloudy.png', // few clouds day
        '02n': 'pcloudy.png', // few clouds night
        '03d': 'mcloudy.png', // scattered clouds day
        '03n': 'mcloudy.png', // scattered clouds night
        '04d': 'cloudy.png', // broken clouds day
        '04n': 'cloudy.png', // broken clouds night
        '09d': 'ishower.png', // shower rain day
        '09n': 'ishower.png', // shower rain night
        '10d': 'lightrain.png', // rain day
        '10n': 'lightrain.png', // rain night
        '11d': 'tstorm.png', // thunderstorm day
        '11n': 'tstorm.png', // thunderstorm night
        '13d': 'lightsnow.png', // snow day
        '13n': 'lightsnow.png', // snow night
        '50d': 'fog.png', // mist day
        '50n': 'fog.png' // mist night
    };
    
    const iconName = iconMap[iconCode] || 'cloudy.png'; // Default to cloudy if icon not found
    return `images/${iconName}`;
}

// Show/hide loading indicator
function showLoading(isLoading) {
    const searchBtn = document.getElementById('search-btn');
    const compareBtn = document.getElementById('compare-btn');
    
    if (isLoading) {
        searchBtn.disabled = true;
        compareBtn.disabled = true;
        
        // Add loading indicators if they don't exist
        if (!document.querySelector('#search-btn .loading')) {
            const loadingIndicator = document.createElement('span');
            loadingIndicator.className = 'loading';
            searchBtn.appendChild(loadingIndicator);
        }
        
        if (!document.querySelector('#compare-btn .loading')) {
            const loadingIndicator = document.createElement('span');
            loadingIndicator.className = 'loading';
            compareBtn.appendChild(loadingIndicator);
        }
    } else {
        searchBtn.disabled = false;
        compareBtn.disabled = false;
        
        // Remove loading indicators
        const searchLoading = document.querySelector('#search-btn .loading');
        const compareLoading = document.querySelector('#compare-btn .loading');
        
        if (searchLoading) searchLoading.remove();
        if (compareLoading) compareLoading.remove();
    }
}

// Show error message
function showError(message) {
    // Create error element if it doesn't exist
    let errorElement = document.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        document.querySelector('.search-section').appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}
