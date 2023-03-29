var cityInputEl = document.querySelector('#searchBox');
var cityHistoryEl = document.querySelector('#previous-searches');
var weatherInfoEl = document.querySelector('#weather-data');
var searchButtonEl = document.querySelector('button');

//Saving user city to local storage.
    function saveCity(cityName) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
  
    if (!cities.includes(cityName)) {
      cities.push(cityName);
      localStorage.setItem('cities', JSON.stringify(cities));
    }}
    

//Function to gather user city submission in the form. Alert if nothing is submitted.
    var citySubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim();
    console.log(cityName);
    if (cityName) {
      
      saveCity(cityName);
      getUserRepos(cityName);
  
      cityHistoryEl.textContent = '';
      cityInputEl.value = '';

      loadPreviousSearches();
    } else {
      alert('Please enter a city');
    }
    };


//create function calling weather api to get 5 day forcast



















loadPreviousSearches();
searchButtonEl.addEventListener('click', citySubmitHandler);


var apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={d94fcd0a3f247519e9f2462c13c0bc86}';