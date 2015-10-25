/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

var watson = require('watson-developer-cloud');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');



// create a new express server
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser());
app.set("view options", {layout: false});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
app.post("/", function(req,res) {
	var original_text = req.body.original_text
	var language_translation = watson.language_translation({
  username: '1b6a15c0-8e59-431a-8584-a4bc8335b58f',
  password: 'qkjAS8S3yBcl',
  version: 'v2'
});
language_translation.translate({
    text: original_text,
    source: 'en',
    target: 'es'
  }, function(err, translation) {
    if (err) {
      console.log(err);
     }
    else {
      console.log(translation.translations[0].translation);
      console.log("Success")
     }
});
	console.log(original_text)
})
