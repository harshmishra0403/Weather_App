const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTimeEl = document.getElementById('current-temp');



var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hour = time.getHours();
    var body = document.getElementsByTagName('body')[0];
    hour >= 17 <= 5 ? body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1582489095897-2738b5af950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fG5pZ2h0JTIwd2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60)' : body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1565010431002-0c91cad04dd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTB8fHdlYXRoZXIlMjBkZWtzdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60)'
    const hourIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'
    timeEl.innerHTML = (hourIn12HrFormat<10 ? '0'+hourIn12HrFormat : hourIn12HrFormat) + ':' + (minutes<10 ? '0'+minutes : minutes) + ' ' + ampm;
    dateEl.innerHTML = dayNames[day] + ', ' + date + ' ' + months[month];
}, 1000);



getWeatherData()

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

            console.log(data)
            showWeatherData(data);
        })

    })
}
function showWeatherData(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N  ' + data.lon + 'E'


    currentWeatherItemsEl.innerHTML = `<div class="weather-item">
    <p>Humidity</p>
    <p>${humidity}</p>
</div>
<div class="weather-item"> 
    <p>pressure</p>
    <p>${pressure}</p>
</div>
<div class="weather-item">
    <p>Wind speed</p>
    <p>${wind_speed}</p>
</div>
<div class="weather-item">
<div>Sunrise</div>
<div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
<div>Sunset</div>
<div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div> 

`;
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTimeEl.innerHTML = `
            <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon" />
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        } else {
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon" />
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>


`
        }
    })

    weatherForecastEl.innerHTML = otherDayForcast;


}




    
    

