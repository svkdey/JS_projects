class Weather{
    constructor(){

    }
    async getWeather(lat,lon){
        const responseWeather = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon} `);
        const weatherData=await responseWeather.json();
        return {
            weather:weatherData
        }
    }
}