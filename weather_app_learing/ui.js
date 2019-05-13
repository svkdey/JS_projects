class Ui {
    constructor() {
        this.weather = document.getElementById('weather');
       
    }
    showWeather(weather) {
        this.weather.textContent =weather.main.temp;
        console.log(weather);
    }

    


    // Clear alert message


    clearProfile() {
        this.weather.innerHTML = '';
    }
}