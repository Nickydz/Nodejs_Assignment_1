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
const StringDecoder = require('string_decoder').StringDecoder;


// Create server
var server = http.createServer(function(req,res){

  // get parsedUrl from request
  var parsedUrl = url.parse(req.url,true);

  // get Path from url
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  //get Method from request
  var method = req.method.toLowerCase();

 //get Query String parameters
 var queryString = parsedUrl.query;

 //get headers from Request
 var headers = req.headers;

 //get Payload if any
 var decoder = new StringDecoder('utf-8');
 var buffer = '';
 req.on('data',function (data) {
   buffer += decoder.write(data);
 })

 req.on('end',function () {
   buffer += decoder.end();

    console.log("Request recieved at path "+ path + " and by " + method +" method with parameters as ",queryString);

    //console.log("\nHeaders recieved", headers);

    if(buffer == ''){
      console.log('\nEmpty Payload Stream received');
    }else{
      console.log('\nPayload recieved : ', buffer);
    }

    var requestHandler = typeof(router[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.default;

    // data to send to the response handler
    var data = {
      'path' : trimmedPath,
      'queryStringObject' : queryString,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    requestHandler(data,function(statusCode,payload) {
      statusCode = typeof(statusCode) == 'number' ? statusCode : 500;

      payload = typeof(payload) == 'object' ? payload : {}
      // Convert payload to string
      var payloadStr = JSON.stringify(payload);

      // Set status Code in response header
      res.writeHead(statusCode)
      // send response
      res.end(payloadStr)



    });
  })
})


//Listen on server
server.listen(3000,function(){
  console.log("Listening on port ");
})

// Defining the handlers
var handlers ={}

// Hello Handler
handlers.hello = function (data,callback) {
  // get requested Data based on Payload
  var requestedData = typeof(data[data.payload]) != 'undefined' ? ('You requested for '+data.payload+' which is '+ JSON.stringify(data[data.payload])) : 'Hey mate Hope you\'re having a wonderful day . If you need any info about your request you can send these codes below in the payload . For headers info - headers . For path info - path . For method info - method '
  // callback an http status Code and a message
  callback(200,{'msg':requestedData})

}

// Default 404 Handler

handlers.default = function (data,callback) {
  //callback a statusCode
  callback(404);
}

// Defining a route variable
var router = {
  'hello' : handlers.hello
}
