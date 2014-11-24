using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace API.Consumer.Todo
{
    public class Model
    {
        public ObjectId Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Category { get; set; }

        public bool IsDone { get; set; }
    }
}