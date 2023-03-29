var cityInputEl = document.querySelector('#searchBox');
var cityHistoryEl = document.querySelector('#previous-searches');
var weatherInfoEl = document.querySelector('#weather-data');
var searchButtonEl = document.querySelector('button');
var searchFormEl = document.querySelector('#searchForm');

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
    var previousSearchesEl = document.querySelector('#previous-searches');
    previousSearchesEl.innerHTML = '';
  
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
  
      cityHistoryEl.textContent = '';
      cityInputEl.value = '';

      
    } else {
      alert('Please enter a city');
    }
    };


//create function calling weather api to get 5 day forcast



















loadPreviousSearches();

searchFormEl.addEventListener('submit', citySubmitHandler);

var apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={d94fcd0a3f247519e9f2462c13c0bc86}';