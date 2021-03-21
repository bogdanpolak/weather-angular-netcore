import { Component, OnInit } from '@angular/core';
import { WeatherForecast } from './weather-forecast';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherService.getForecast().subscribe(
      result => this.onForecastFetched(result),
      error => console.error(error)
    );
  }

  private onForecastFetched(weatherForecast: WeatherForecast[]) {
    setTimeout(() => {
      this.forecasts = weatherForecast;
    }, 1000);
  }
}
