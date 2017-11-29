//Require dependencies

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require('cors');

var Article = require("./models/Article.js")
// Initialize Express
var app = express();
// app.use(express.methodOverride());
app.use(cors());

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static(process.cwd() + "/public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//routes

app.get('/', function(req, res){
  res.sendFile(processs.cwd() + '/public/index.html');
});
//to get 
app.get('/api/saved', function(req, res){
  Article.find({}, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
});
//to post
app.post('/api/saved', function(req, res){
  var entry = new Article(req.body);
  entry.save(function(err, doc){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
    }
  });
});

// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
//      // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// });

app.all('*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers',
   'accept, origin, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
//     
})

// app.use(function(req, res, next){
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers',
//    'accept, content-type, x-parse-application-id, Origin, x-parse-rest-api-key, x-requested-with, x-parse-session-token');
// })

//to delete 

// app.post('/api/delete/:articleID', function(req, res){
//   console.log();
//   Article.findByIdAndRemove(req.params.articleId, function(err, del){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("deleted");
//     }
//   });
// });



var PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
  console.log("App running on port " +PORT +"!");
});