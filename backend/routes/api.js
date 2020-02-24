/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose')
const Issue = require('./models/isssueSchema.js') 
var connection = mongoose.connection;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      mongoose.connection.db.collection(project).find(req.query).toArray()
       .then(issues => res.json(issues))
       .catch(err => console.log(err))           
    })
    
    .post(function (req, res){
      var project = req.params.project;
      const issue = new Issue({
        issue_title:req.body.issue_title,
        issue_text:req.body.issue_text,
        createdBy:req.body.createdBy,
        assignedTo:req.body.assignedTo,
        created_on:new Date(),
        updated_on:new Date(),
        open:true,
        status_text:req.body.status

      })

      connection.db.collection(project).insertOne(issue)
      .then(res.send("issue saved!"))
      .catch((err) => console.log(err))
    })
    
    .put(function (req, res){
      var project = req.params.project;
      console.log(req.params.project)
      const updatedIssue = {
        "$set":{
          "issue_title":req.body.issue_title,
          "issue_text":req.body.issue_text,
         "createdBy":req.body.createdBy,
         "assignedTo":req.body.assignedTo,
         "updated_on":new Date(),
         "open":req.body.open
        }
      } 
      const options = {returnNewDocument: true };    
      console.log(req.body)
      connection.db.collection(project).findOneAndUpdate({_id:req.body._id}, updatedIssue, options)
      .then((doc) => res.send('issue updated ' + JSON.stringify(doc)))
      .catch( (err) => res.send(err))
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      connection.db.collection(project).findOneAndDelete({_id:req.body._id})
      .then((doc) => res.send("issue deleted"))
      .catch((err) => res.send(err))
    });
    
};