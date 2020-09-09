import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './js/martian_weather.js'
import MartianWeather from './js/martian_weather.js';



$(document).ready(function(){

  let promise = MartianWeather.getWeather();
  promise.then(function(response) {
    const body = JSON.parse(response); 
    $(".season").text(`The current season is ${body["634"].Season}`)
    $(".temperature").text(`The average temperature is ${body["634"].AT.av}`)
    $(".windspeed")
    $(".pressure")    
  }, function(error) {
    $(".showErrors").text(`There was an error processing your request: ${error}`);
  });

})