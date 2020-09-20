var express = require('express');
var request = require('request');

var app = express();

app.set('view engine', 'ejs')

var city = 'Las Vegas';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;

app.get('/', function(req, res) {

    request(url, function(error, response, body) {
        weather_json = JSON.parse(body);
        console.log(weather_json);

        var weather = {
            city : city,
            temperature : Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description,
            icon : weather_json.weather[0].icon
        };

        var weather_data = {weather : weather};

        res.render('weather', weather_data);
    });
    
});

app.listen(8000);