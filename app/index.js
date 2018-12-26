/*
*
* Primary File for the API
*
* Homework Assignment 1 - Simple Node server that responds to hello request with json response
*
*
*/

var http = require('http');
const url = require('url');

// Create server
var server = http.createServer(function(req,res){

  // get parsedUrl from request
  var parsedUrl = url.parse(req.url,true);

  // get Path from url
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  //get Method from request
  var method = req.method.toLowerCase();


  console.log("Request recieved at path "+ path + " and by " + method +" method");

  res.end("Hello matey\n");
})


//Listen on server
server.listen(3000,function(){
  console.log("Listening on port ");
})
