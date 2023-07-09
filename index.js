
const api = {
    link: "http://api.openweathermap.org/data/2.5/weather",
    key: "3bc39d0aef5a0ccef2c39b471d65f3c4"
}
//for any city weather

const searchbox = document.getElementById('search-box');
searchbox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        console.log(searchbox.value);
        getweather(searchbox.value);
        document.querySelector('.location').style.display = " block";
        document.querySelector('.btn').style.display = " block";
    }
})

function getweather(city) {
    fetch(`${api.link}?q=${city}&appid=${api.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(display);
}

function display(weather) {
    console.log(weather);
    cityname.innerText = `${weather.name}, ${weather.sys.country}`;
    temperature.innerText = `${weather.main.temp}°`;
    humidity.innerText = `Humidity : ${weather.main.humidity}%`;
    pressure.innerText = `Pressure : ${weather.main.pressure}mb`;
    clouds.innerText = `${weather.weather[0].main}`;
    img.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`;

}

//for current location temp
function getCurrentTemp() {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3bc39d0aef5a0ccef2c39b471d65f3c4`;
            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then(display1);

        }
        )
    }
}

function display1(weather1) {
    console.log(weather1);
    cityname1.innerText = `${weather1.name}, ${weather1.sys.country}`;
    let kel = parseInt(`${weather1.main.temp}°`);
    let cel = parseInt(kel - 273.15);
    temperature1.innerText = `${cel}°C`;
    clouds1.innerText = `${weather1.weather[0].main}`;
    img1.innerHTML = `<img  src="http://openweathermap.org/img/wn/${weather1.weather[0].icon}@2x.png">`;

}
getCurrentTemp();

var today = new Date();
var date = today.getDate() + ' | ' + (today.getMonth() + 1) + ' | ' + today.getFullYear();
day.innerText = date;

function dis() {
    document.querySelector('.location').style.display = " none";
    document.querySelector('.btn').style.display = " none";
}