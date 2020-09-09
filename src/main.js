import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './js/martian_weather.js';
import MartianWeather from './js/martian_weather.js';



$(document).ready(function(){
  let promise = MartianWeather.getWeather();
  promise.then(function(response) {
    const body = JSON.parse(response);
    const sol = body.sol_keys[0];
    $(".season").text(`The current season is ${body[sol].Season}`);
    $(".temperature").text(`The average temperature is ${body[sol].AT.av}`);
    $(".windSpeed").text(`The current average windspeed is ${body[sol].HWS.av}`);
    $(".pressure").text(`The current average pressure is ${body[sol].PRE.av}`);    
  },function(error) {
    $(".showErrors").text(`There was an error processing your request: ${error}`);
  });

  $(".btn").click(function(event) {
    event.preventDefault();
    $(".showImages").html("");
    const rover = $("#rover").val();
    const camera = $("#camera").val();
    const date = $("#date").val();
    let promise = MartianWeather.getImage(rover,camera,date);
    promise.then(function(response){
      const body = JSON.parse(response);
      console.log(body.photos)
      if (body.photos.length === 0){
        $(".showImages").text("Sorry no images for that rover/camera on that date!")    
      } else {
          body.photos.forEach(function(elem){
            console.log(elem.img_src);
            $(".showImages").append(`<img src=${elem.img_src}>`);
          });
      }
    },  function(error) {
          $(".showErrors").text(`There was an error processing your request: ${error}`);
        });
  }); 
});






