import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  DashData:any;
  constructor() { }

  ngOnInit() {
    this.DashData = {
      main : {},
      isDay: true
    };
    this.getDashData();
    console.log(this.DashData);
  }

  getDashData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    .then(response=>response.json())
    .then(data=>{this.setDashData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  setDashData(data: any){
    this.DashData = data;
    let sunsetTime = new Date(this.DashData.sys.sunset * 1000);
    this.DashData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.DashData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.DashData.temp_celcius = (this.DashData.main.temp - 273.15).toFixed(0);
    this.DashData.temp_min = (this.DashData.main.temp_min - 273.15).toFixed(0);
    this.DashData.temp_max = (this.DashData.main.temp_max - 273.15).toFixed(0);
    this.DashData.temp_feels_like = (this.DashData.main.feels_like - 273.15).toFixed(0);
  }

}