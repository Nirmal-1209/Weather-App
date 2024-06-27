// import http from 'http';
// import fs from 'fs';
// import requests from 'requests';

// add css in stle tag

const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("index.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempStatus%}", orgVal.weather[0].main);
    return temperature;
};

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=24324eed073a5399316557369b53eef9')
            .on('data', function(chunk) {
                const objData = JSON.parse(chunk); // json to obj data
                const arrData = [objData]; // objdata to array of objects, we converted it to an array caoz we can easily manipulate it with map method
                const realTimeData = arrData.map(val => replaceVal(homeFile, val)).join("");
                res.write(realTimeData);
                // console.log(realTimeData);
            })
            .on('end', function(err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }

});

server.listen(8080, "127.0.0.1");

// const objData = JSON.parse(chunk); // json to obj data
// const arrData = [objData]; // objdata to array of objects, we converted it to an array caoz we can easily manipulate it with map method
// const realTimeData = arrData.map(val =>
//     replaceVal(homeFile, val)).join(""); // map method stores this data into realTimeData, join is used to convert that array(html file converted into array) into string data(i.e, actual html file) 
// res.write(realTimeData);
// console.log(realTimeData);