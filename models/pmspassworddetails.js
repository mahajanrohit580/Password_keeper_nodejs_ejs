const mongoose = require('mongoose');
var mongoosePaginate = require("mongoose-paginate");

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
    passworddetails : {
          type:String,
          required:true,
    },
    projectname :{
        type:String,
        required:true,
    },
    date :{
         type : Date,
         default:Date.now
          }
});

pmsschema.plugin(mongoosePaginate);


module.exports = mongoose.model('pmspassworddetails',pmsschema);