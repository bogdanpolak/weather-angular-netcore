using Microsoft.Azure.Cosmos.Table;
using System;

namespace AngularProject1.Api.Services
{
    public class WeatherEntity : TableEntity
    {

        public DateTimeOffset Date { get; set; }

        public string Forecast { get; set; }

        public WeatherEntity()
        {
        }

        public WeatherEntity(string partitionKey, DateTimeOffset date, string forecast)
        {
            PartitionKey = partitionKey;
            RowKey = Guid.NewGuid().ToString();
            Date = date;
            Forecast = forecast;
        }
    }
}
