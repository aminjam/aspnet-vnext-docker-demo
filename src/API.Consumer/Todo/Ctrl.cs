﻿using Microsoft.AspNet.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;

namespace API.Consumer.Todo
{

    [Route("api/todo")]
    public class Ctrl : Controller
    {
        private readonly IRepository _repository;
        public Ctrl(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<Model> GetAll()
        {
            return _repository.AllItems;
        }

        [HttpGet("{id}",Name = "GetByIdRoute")]
        public IActionResult GetById(ObjectId id)
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
        public void CreateOrUpdate([FromBody] Model item)
        {
            if (!ModelState.IsValid)
            {
                Context.Response.StatusCode = 400;
            }
            else
            {
                if (item.Id != ObjectId.Empty)
                    _repository.Update(item);
                else
                    _repository.Add(item);

                string url = Url.RouteUrl("GetByIdRoute", new { id = item.Id },
                    Request.Scheme, Request.Host.ToUriComponent());

                Context.Response.StatusCode = 201;
                Context.Response.Headers["Location"] = url;
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(ObjectId id)
        {
            _repository.Remove(id);
            return new HttpStatusCodeResult(204);
        }
    }
}