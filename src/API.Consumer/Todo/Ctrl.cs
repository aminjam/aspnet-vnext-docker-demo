using Microsoft.AspNet.Mvc;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace API.Consumer.todo
{

    [Route("api/todo")]
    public class Ctrl : Controller
    {
        private readonly IRepo _repository;
        public Ctrl(IRepo repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<Model> GetAll()
        {
            return _repository.AllItems;
        }

        [HttpGet("{id}",Name = "GetByIdRoute")]
        public IActionResult GetById(string id)
        {
            var item = _repository.GetById(id);
            if (item == null)
            {
                return HttpNotFound();
            }

            return new ObjectResult(item);
        }

        [HttpPost]
        [HttpPut]
        public void CreateOrUpdate([FromBody] JObject input)
        {
            var item = input.ToObject<Model>();
            if (!ModelState.IsValid)
            {
                Context.Response.StatusCode = 400;
            }
            else
            {
                if (!string.IsNullOrEmpty(item.Id))
                {
                    _repository.Update(item);
                }
                else
                    _repository.Add(item);

                string url = Url.RouteUrl("GetByIdRoute", new { id = item.Id },
                    Request.Scheme, Request.Host.ToUriComponent());

                Context.Response.Headers["Location"] = url;
                Context.Response.StatusCode = 201;
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _repository.Remove(id);
            return new HttpStatusCodeResult(204);
        }
    }
}
