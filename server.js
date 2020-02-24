'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');
const mongoose = require('mongoose')
const router = require('express').Router()
var apiRoutes         = require('./routes/api.js');
//var fccTestingRoutes  = require('./routes/fcctesting.js');

require('dotenv').config()
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(mongoose.connection.readyState) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Sample front-end  

app.route('/:project/')
  .get(function (req, res) {
    console.log('got here')
    res.sendFile(process.cwd() + '/views/issue.html');
  });

//Index page (static HTML)

app.route('/')
  .get( (req, res) => {
 
        mongoose.connection.db.listCollections().toArray( (err, names) => {
          if (err) {
            console.log(err);
          } else {
            res.send(names);
          }
          
  }) } )

  app.route('/:project/new')
    .post( (req,res) => {
      console.log(req.params.project)
      mongoose.connection.db.createCollection(req.params.project)
        res.redirect(`http://localhost:3000/${req.params.project}`)
    })

//For FCC testing purposes
//fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 3500);
  }
});

module.exports = app; //for testing