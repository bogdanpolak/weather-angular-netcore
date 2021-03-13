using AngularProject1.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace AngularProject1.Api.Controllers.Weather
{
    [ApiController]
    [Route("v1/weather/[controller]")]
    public class LoaderController : ControllerBase
    {
        private readonly ILogger<LoaderController> logger;
        private readonly IPclBlobStorage pclBlobStorage;
        private readonly IWeatherTableService weatherTableService;
        private readonly Func<DateTime> DateProviderNow = () => DateTime.Now;

        public LoaderController(ILogger<LoaderController> logger,  IPclBlobStorage pclBlobStorage, IWeatherTableService weatherTableService)
        {
            this.logger = logger;
            this.pclBlobStorage = pclBlobStorage;
            this.weatherTableService = weatherTableService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            logger.Log(LogLevel.Debug, "GET weather loader");
            string fileName = "forecast-" + Guid.NewGuid().ToString() + ".json";
            using (var stream = CreateForecastStream())
            {
                pclBlobStorage.Store(fileName, stream);
            }
            logger.LogDebug($"Uploaded file '{fileName}' to PCLSync Blob storage");
            var weatherEntity = CreateWeatherEntity(DateProviderNow);
            weatherTableService.Add(weatherEntity);
            logger.LogDebug($"Added entry to Weather Azure Table");
            return Ok(new { version = "1111" });
        }
        /* ----------------------------------------------------------------- */
        /*   https://rapidapi.com/community/api/open-weather-map/endpoints   */
        /* ----------------------------------------------------------------- */
        /*
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri("https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus"),
            Headers =
            {
                { "x-rapidapi-key", "xxxxxxxxxxxxxxxxxxxxxxx" },
                { "x-rapidapi-host", "community-open-weather-map.p.rapidapi.com" },
            },
        };
        using (var response = await client.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
        }
        */

        private static Stream CreateForecastStream()
        {
            var content = System.IO.File.ReadAllText(@"FakeData\forecast.json");
            return new MemoryStream(Encoding.UTF8.GetBytes(content));
        }


        private static WeatherEntity CreateWeatherEntity(Func<DateTime> nowProvider)
        {
            var today = nowProvider().Date;
            var forecastDate = new DateTimeOffset(today, TimeSpan.Zero);
            var birth = today.AddMonths(-new Random().Next(18 * 24, 65 * 24));
            var jsonObject = new JObject(
                new JProperty("name", "John Smith"),
                new JProperty("birth", birth),
                new JProperty("test", "abc"));
            var jsonForecast = new JArray();
            jsonForecast.Add(jsonObject);
            var weatherEntity = new WeatherEntity(
                partitionKey: today.ToString("yyyy-MM-dd"),
                date: forecastDate,
                forecast: jsonForecast.ToString()
            );
            return weatherEntity;
        }
    }
}
