var cityInputEl = document.querySelector('#searchBox');
var cityHistoryEl = document.querySelector('#previous-searches');
var weatherInfoEl = document.querySelector('#weather-data');
var searchButtonEl = document.querySelector('button');
var searchFormEl = document.querySelector('#searchForm');
var previousSearchesEl = document.querySelector('#previous-searches');


//Function to capitalize first letter of city 
    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

//Saving user city to local storage.
    function saveCity(cityName) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
  
    if (!cities.includes(cityName)) {
      cities.push(cityName);
      localStorage.setItem('cities', JSON.stringify(cities));
    }}

//Function to load previous searches from local storage and display them as buttons
    function loadPreviousSearches() {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    previousSearchesEl.innerHTML = '';
//Appending search history as buttons user can click on. 
//Using a for loop to go through each city.
    cities.forEach(function (city) {
    var cityBtn = document.createElement('button');
    cityBtn.textContent = city;
    cityBtn.classList.add('previous-search-btn');
    cityBtn.addEventListener('click', function () {
        weatherData(city);
    });
    previousSearchesEl.appendChild(cityBtn);
    });}
  
    

//Function to gather user city submission in the form. Alert if nothing is submitted.
    var citySubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = capitalizeFirstLetter(cityInputEl.value.trim());
    console.log(cityName);
    if (cityName) {
    weatherData(cityName);
    cityInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
    };


//create function calling weather api to get 5 day forcast
//&units=imperial needed in parameter. 
    function weatherData(cityName){
    var apiKey = 'd94fcd0a3f247519e9f2462c13c0bc86';
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

//Retrieving weather data based on city and only if city is valid. 
    fetch(weatherUrl)
    .then(function (response) {
    if (response.status === 200) {
    //Will only add city to previous searches if city is valid. 
    saveCity(cityName);
    loadPreviousSearches();
    return response.json();
    } else {
    alert('Failed to fetch weather data');
    }
    })
//Creating variables for temp, wind, humidity
    .then(function (data) {
    var temperature = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    console.log(temperature, wind, humidity);
    displayWeatherData(cityName, temperature, wind, humidity);
    })
    .catch(function (error) {
    alert('Error fetching weather data');
    });
    }

//Function to display weather gathered from weatherData function.
//Creating new <p> element in html to hold weather info.
    var displayWeatherData = function (cityName, temperature, wind, humidity) {
    weatherInfoEl.innerHTML = '';

    var weatherDaily = document.createElement('div');

    var cityNameEl = document.createElement('p');
    cityNameEl.textContent = cityName;
    weatherDaily.appendChild(cityNameEl);

    var temperatureEl = document.createElement('p');
    temperatureEl.textContent = 'Temperature: ' + temperature + '\u00B0F';
    weatherDaily.appendChild(temperatureEl);

    var windEl = document.createElement('p');
    windEl.textContent = 'Wind: ' + wind + ' MPH';
    weatherDaily.appendChild(windEl);

    var humidityEl = document.createElement('p');
    humidityEl.textContent = 'Humidity: ' + humidity + '%';
    weatherDaily.appendChild(humidityEl);

    weatherInfoEl.appendChild(weatherDaily);
 };



















loadPreviousSearches();

searchFormEl.addEventListener('submit', citySubmitHandler);

