const mongoose = require('mongoose');

var con = require('./connect');


var conn = mongoose.Connection;

const pmsschema = new mongoose.Schema({
    username :{
        type : String,
        required:true,
        index:{
            unique:true,
              }
             },
    email:{
        type : String,
        required:true,
        index:{
            unique:true,
              }
         },
    password :{
        type : String,
        required:true,
             },
    date :{
         type : Date,
         default:Date.now
          }
});

module.exports = mongoose.model('pmstables',pmsschema);