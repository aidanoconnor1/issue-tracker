const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const issueSchema = new Schema({
        issue_title:String,
        issue_text:String,
        createdBy:String,
        assignedTo:String,
        created_on:Date,
        updated_on:Date,
        open:Boolean,
        status_text:String,
        _id:String
    } 
         
)

module.exports = mongoose.model("issue", issueSchema);

