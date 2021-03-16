import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from './weather-forecast';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    const url = '/v1/weather/forecast';
    this.http.get<WeatherForecast[]>(url).subscribe(result => {
      setTimeout(() => {
        this.forecasts = result;
      }, 1000);
    }, error => console.error(error));
  }
}
