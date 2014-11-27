using API.Consumer.todo;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace API.Consumer
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }


        public Startup()
        {
            Configuration = new Configuration()
                        .AddJsonFile("config.json")
                        .AddEnvironmentVariables();
        }
        public void Configure(IApplicationBuilder app)
        {
            app.Use((context, next) =>
            {
                context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
                context.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "Origin, X-Requested-With, Content-Type, Accept" });
                context.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "GET, POST, PUT, OPTION, DELETE" });
                return next();
            });
            app.UseMvc();
            app.UseWelcomePage();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<SiteSettings>(settings =>
            {
                settings.MongoConnection = Configuration.Get("MONGO_CONNECTION");
                settings.MongoDatabase = Configuration.Get("MONGO_DB_NAME");
            });
            services.AddMvc().Configure<MvcOptions>(options =>
            {
                int position = options.OutputFormatters.
                    FindIndex(f => f.Instance is JsonOutputFormatter);
                var settings = new JsonSerializerSettings()
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                var formatter = new JsonOutputFormatter()
                {
                    SerializerSettings = settings
                };

                options.OutputFormatters.Insert(position, formatter);
            });

            services.AddSingleton<IRepo, Repo>();
        }
    }
}
