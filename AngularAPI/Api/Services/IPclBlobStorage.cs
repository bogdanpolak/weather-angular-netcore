using System.IO;

namespace AngularProject1.Api.Services
{
    public interface IPclBlobStorage
    {
        void Store(string fileName, Stream content);
    }
}