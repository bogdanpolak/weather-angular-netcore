import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from './weather-forecast';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];
  private _baseUrl: string;
  private _http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;
  }
  ngOnInit(): void {
    const url = this._baseUrl + 'v1/weather/forecast';
    this._http.get<WeatherForecast[]>(url).subscribe(result => {
      setTimeout(() => {
        this.forecasts = result;
      }, 1000);
    }, error => console.error(error));
  }
}
