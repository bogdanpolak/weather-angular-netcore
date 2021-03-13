using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Logging;

namespace AngularProject1.Api.Services
{
    public class CosmosTableProvider
    {
        private readonly string connectionString;
        private readonly ILogger logger;
        private CloudStorageAccount cloudStorageAccount;

        public CosmosTableProvider(string connectionString, ILogger logger)
        {
            this.connectionString = connectionString;
            this.logger = logger;
        }

        public CloudTable GetTableClient(string tableName)
        {
            InitStorageAccount();
            var tableClient = cloudStorageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference(tableName);
            var isCreated = table.CreateIfNotExists();
            // if (isCreated) logger.LogDebug($"Created Azure Table. Table name: {tableName}");
            return table;
        }

        private void InitStorageAccount()
        {
            cloudStorageAccount ??= CloudStorageAccount.Parse(connectionString);
        }
    }
}
