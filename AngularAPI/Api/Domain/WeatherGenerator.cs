using AngularProject1.Api.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularProject1.Api.Domain
{
    public class WeatherGenerator
    {
        public WeatherGenerator() : this(new Random().Next(), DateTime.Now) {
        }

        public WeatherGenerator(int seed, DateTime startDate)
        {
            this.seed = seed;
            this.startDate = startDate;
        }

        public IEnumerable<WeatherForecastResponse> Generate(int days)
        {
            var rng = new Random(seed);
            var forecasts = Enumerable.Range(1, days).Select(index => new WeatherForecastResponse
            {
                Date = startDate.AddDays(index),
                TemperatureC = rng.Next(-10, 35),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
            return forecasts;
        }

        private readonly int seed;
        private DateTime startDate;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

    }
}
