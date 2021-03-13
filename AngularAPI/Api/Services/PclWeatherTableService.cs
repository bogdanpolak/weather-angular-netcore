using AngularProject1.Api.Configuration;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Logging;
using System;

namespace AngularProject1.Api.Services
{
    public class WeatherTableService : IWeatherTableService
    {
        private readonly IApiConfiguration apiConfiguration;
        private readonly ILogger<WeatherTableService> logger;

        public WeatherTableService(IApiConfiguration apiConfiguration, ILogger<WeatherTableService> logger)
        {
            this.apiConfiguration = apiConfiguration;
            this.logger = logger;
        }

        public void Add(WeatherEntity weatherEntity)
        {
            var connectionString = apiConfiguration.GetAzureConnectionString();
            var cloadTable = new CosmosTableProvider(connectionString, logger)
                .GetTableClient("PCLWeather");
            _ = cloadTable.Execute(TableOperation.Insert(weatherEntity));
        }
    }
}
