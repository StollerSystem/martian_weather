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
    $(".season").html(`The current season is <u>${body[sol].Season}</u>`);
    $(".temperature").html(`The average temperature is <b>${body[sol].AT.av} °F</b>`);
    $(".maxTemperature").html(`The maximum temperature is <b>${body[sol].AT.mx} °F</b>`);
    $(".minTemperature").html(`The minimum temperature is <b>${body[sol].AT.mn} °F</b>`);
    $(".windSpeed").html(`The current average windspeed is <b>${body[sol].HWS.av} m/s</b>`);
    $(".pressure").html(`The current average pressure is <b>${body[sol].PRE.av} Pa</b>`);    
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
      // console.log(body.photos);
      if (body.photos.length === 0){
        $(".showImages").text("Sorry no images for that rover/camera on that date!");  
      } else {
        $(".showImages").append(`
        <div class="carousel-item active">
          <img class="d-block w-100" src='${body.photos[0].img_src}' alt="Slide 1">
        </div>`); 
        for (let i=1; i<body.photos.length; i++){
          $(".showImages").append(`
            <div class="carousel-item">
              <img class="d-block w-100" src='${body.photos[i].img_src}' alt="Slide ${i+1}">
            </div>`);
        }
        // body.photos.forEach(function(elem){          
        //   $(".showImages").append(`<img src=${elem.img_src}>`);
        // });
      }
    },  function(error) {
        $(".showErrors").text(`There was an error processing your request: ${error}`);
      });
  }); 
});






