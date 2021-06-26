//database schema
var pmstable = require('../models/pmstables');
//jwt token module require
const jwt = require('jsonwebtoken');

//email check
var email =function()
           {
               return function(req,res,next)
               {
                 var checkemail = req.body.email;
                 var findemail = pmstable.findOne({email:checkemail});
                 findemail.exec((err,data)=>{
                   if (err) throw err
                   if(data){
                      return  res.render('signup', { title: 'SignUp page',mgs : 'SIGNUP Page..!!',detailmgs:"Email Alrady Exits..!!"}); 
                     }
                   next();
                 });
               }
               
           }

//username chaeck
var unamecheck =function()
           {
               return function(req,res,next)
               {
                 var checkusername = req.body.username;
                 var findusername = pmstable.findOne({username:checkusername});
                 findusername.exec((err,data)=>{
                   if (err) throw err
                   if(data){
                      return  res.render('signup', { title: 'SignUp page',mgs : 'SIGNUP Page..!!',detailmgs:"Username Alrady Exits..!!"}); 
                     }
                   next();
                 });
               }                     
           }

//token varification
var checktoken=function(){
      return function(req,res,next){
        var usertoken = localStorage.getItem('usertoken');
        try{
          jwt.verify(usertoken,'logintoken');
        }
        catch{
          res.redirect('/');
        }
          next();      
      }
      
}

//export's middleware function's
module.exports.email = email;
module.exports.username = unamecheck;
module.exports.checktoken = checktoken;


