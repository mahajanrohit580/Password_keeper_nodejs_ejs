const mongoose = require('mongoose');

var con = require('./connect');

var conn = mongoose.Connection;

const pmsschema = new mongoose.Schema({
    catagoryname :{
        type : String,
        required:true,
        index:{
            unique:true,
              }
             },
    date :{
         type : Date,
         default:Date.now
          }
});

module.exports = mongoose.model('pmscatagorynames',pmsschema);