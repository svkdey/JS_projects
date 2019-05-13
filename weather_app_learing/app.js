const weather = new Weather();
const ui=new Ui();
weather.getWeather(22.5726, 88.3639).then(data=>{
    ui.showWeather(data.weather);
})