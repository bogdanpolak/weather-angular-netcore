using AngularProject1.Api.Configuration;
using Azure.Storage.Blobs;
using System;
using System.IO;

namespace AngularProject1.Api.Services
{
    public class PclBlobStorage : IPclBlobStorage
    {
        private readonly IApiConfiguration apiConfiguration;

        public PclBlobStorage(IApiConfiguration apiConfiguration)
        {
            this.apiConfiguration = apiConfiguration;
        }

        public void Store(string fileName, Stream content)
        {
            var blobServiceClient = new BlobServiceClient(apiConfiguration.GetAzureConnectionString());

            var blobContainerClient = blobServiceClient.GetBlobContainerClient("weather-forecasts");
            // if (!blobContainerClient.Exists()) logger.logDebug
            blobContainerClient.CreateIfNotExists();
            BlobClient blobClient = blobContainerClient.GetBlobClient(fileName);

            blobClient.Upload(content, true);
        }
    }
}
