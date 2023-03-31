var cityInputEl = document.querySelector('#searchBox');
var cityHistoryEl = document.querySelector('#previous-searches');
var weatherInfoEl = document.querySelector('#weather-data');
var searchButtonEl = document.querySelector('button');
var searchFormEl = document.querySelector('#searchForm');
var previousSearchesEl = document.querySelector('#previous-searches');




//Saving user city to local storage.
    function saveCity(cityName) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
  
    if (!cities.includes(cityName)) {
      cities.push(cityName);
      localStorage.setItem('cities', JSON.stringify(cities));
    }}

// Function to load previous searches from local storage and display them as buttons
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
        
    });
    previousSearchesEl.appendChild(cityBtn);
    });}
  
    

//Function to gather user city submission in the form. Alert if nothing is submitted.
var citySubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim();
    console.log(cityName);
    if (cityName) {
      
  
      saveCity(cityName);
      loadPreviousSearches();
      weatherData(cityName);
      
     
  
      
      cityInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
  };


//create function calling weather api to get 5 day forcast
function weatherData(cityName){
    var apiKey = 'd94fcd0a3f247519e9f2462c13c0bc86';
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;


    fetch(weatherUrl)
    .then(function (response) {
        if (response.status === 200) {
            return response.json();
        } else {
            alert('Failed to fetch weather data');
        }
    })
    .then(function (data) {
        var temperature = data.main.temp;
        var wind = data.wind.speed;
        var humidity = data.main.humidity;

        console.log(temperature, wind, humidity);

        displayWeatherData(temperature, wind, humidity);
    })
    .catch(function (error) {
        alert('Error fetching weather data');
    });

    
}

//Function to display weather gathered from weatherData function

var displayWeatherData = function (temperature, wind, humidity) {


    var weatherDaily = document.createElement('div');
    weatherDaily.textContent = `Temperature: ${temperature} Wind: ${wind} Humidity: ${humidity}`;

    weatherInfoEl.appendChild(weatherDaily);


}



















loadPreviousSearches();

searchFormEl.addEventListener('submit', citySubmitHandler);

