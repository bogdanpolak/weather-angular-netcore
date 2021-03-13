using Microsoft.Extensions.Configuration;
using System;

namespace AngularProject1.Api.Configuration
{
    public class ApiConfiguration : IApiConfiguration
    {
        private readonly IConfiguration configuration;

        public ApiConfiguration(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GetAzureConnectionString()
        {
            return configuration.GetValue<string>(ApiConfigKeys.AzurePclSyncConnStr);
        }
    }
}
