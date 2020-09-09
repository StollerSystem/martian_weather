export default class MartianWeather {
  static getWeather() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response)
        }
      }
      request.open("GET", url, true)
      request.send();
    });
  }
  static getImage() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = ``;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response)
        } else {
          reject(request.response)
        }
      }
      request.open("GET", url, true)
      request.send();
    });
  }
}