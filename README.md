aspnet-vnext-docker-demo
========================

ASP.NET VNext Demo for Docker with API,Web, and MongoDB

You can find `hipops` scenario for Docker Orchestration here. https://github.com/aminjam/hipops-examples/tree/master/scenarios/aspnet-todo

If you are running this project in Visual Studio 2015, make sure to add the the `web` command, 
like the sample project in aspnet/home. https://github.com/aspnet/Home/blob/master/samples/HelloMvc/project.json

`config.json` contains information about the `mongoDB` connection string. 

###Running the API.Consumer project 
- `k web` as long as `web` command is installed.
- `k kesterl`

###Running Web project
- `grunt serve`
- `grunt serve:dist` for minified build packages.
