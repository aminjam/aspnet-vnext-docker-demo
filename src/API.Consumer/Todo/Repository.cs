using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.OptionsModel;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;

namespace API.Consumer.Todo
{
    public interface IRepository
    {
        IEnumerable<Model> AllItems { get; }
        void Add(Model item);
        Model GetById(ObjectId id);
        void Update(Model item);
        void Remove(ObjectId id);
    }

    public class Repository : IRepository
    {
        public Repository(IServiceProvider serviceProvider)
        {
            var settings = serviceProvider.GetService<IOptions<SiteSettings>>().Options;
            _db = new MongoClient(settings.MongoConnection).GetServer().GetDatabase(settings.MongoDatabase);
            _collection = _db.GetCollection<Model>("todo");
        }

        MongoCollection<Model> _collection;
        MongoDatabase _db;
        public IEnumerable<Model> AllItems
        {
            get {
                return _collection.FindAll();
            }
        }

        public Model GetById(ObjectId id)
        {
            var query = Query<Model>.EQ(e => e.Id, id);
            return _collection.FindOne(query);
        }

        public void Add(Model item)
        {
            _collection.Insert(item);
        }

        public void Update(Model item)
        {
            var query = Query<Model>.EQ(e => e.Id, item.Id);
            var update  = Update<Model>
                .Set(e => e.Title , item.Title)
                .Set(e => e.Category , item.Category)
                .Set(e => e.IsDone , item.IsDone);
            _collection.Update(query, update);
        }

        public void Remove(ObjectId id)
        {
            var query = Query<Model>.EQ(e => e.Id, id);
            _collection.Remove(query);
        }
    }


}