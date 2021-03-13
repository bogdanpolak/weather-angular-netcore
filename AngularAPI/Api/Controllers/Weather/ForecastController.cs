using AngularProject1.Api.Domain;
using AngularProject1.Api.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularProject1.Api.Controllers.Weather
{
    [ApiController]
    [Route("v1/weather/[controller]")]
    public class ForecastController : ControllerBase
    {
        private readonly ILogger<ForecastController> logger;

        public ForecastController(ILogger<ForecastController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecastResponse> Get()
        {
            logger.LogDebug($"GET {this.GetType().FullName} /");
            return new WeatherGenerator().Generate(days: 5);
        }
    }
}
