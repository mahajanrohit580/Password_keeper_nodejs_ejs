//core module
const express = require('express');
const router = express.Router();

//models
const pmstable = require('../models/pmstables');
const viewcatamodel = require('../models/passcatagoryviews');
const passdetailsdata = require('../models/pmspassworddetails');
var alldataview =viewcatamodel.find({});
var allviewdetails =passdetailsdata.find({});

//other package
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');




/* GET home page. */

//togenrate the localstorage
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
 

//middelwares
var middelwares = require('./pmsmiddleware');

//login page
router.get('/', function(req, res, next) {
  var alreadylogin= localStorage.getItem('authuser');
  if(alreadylogin)
  {
    res.redirect('/dashboard');
  }
  else{
  res.render('index', { title: 'LOGIN page',mgs : 'LOGIN Page..!!',succmgs:""});
      }
});

router.post('/', function(req, res, next) {
  var username1 = req.body.username;
  var password = req.body.pwd;
  var user = pmstable.findOne({username:username1});
  user.exec((err,data)=>{
    if(err) throw err
    if(data !== null)
    {
        var useridtoken =  data._id;
        var pss = data.password;
        if(bcrypt.compareSync(password,pss))
        {
          var token = jwt.sign({userid:useridtoken},'logintoken');
          localStorage.setItem('usertoken',token);
          localStorage.setItem('authuser',username1);
          res.redirect('/dashboard');
            
        }else
        {
          res.render('index', { title: 'LOGIN page',mgs : 'LOGIN Page..!!',succmgs:"Invalid Password..!!"});
        }
    }
    else{
      res.render('index', { title: 'LOGIN page',mgs : 'LOGIN Page..!!',succmgs:"Invalid UserName..!!"});
    }
 
  });

});


//dashbord

//signup page
router.get('/signup', function(req, res, next) {
  var alreadylogin= localStorage.getItem('authuser');
  if(alreadylogin)
  {
    res.redirect('/dashboard');
  }
  else{
    res.render('signup', { title: 'SignUp page',mgs : 'SIGNUP Page..!!',detailmgs:""});
      }
});

router.post('/signup',middelwares.username(),middelwares.email(),function(req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.pwd;
  var conpassword = req.body.conpwd;
  
   if(password !== conpassword)
   {
    res.render('signup', { title: 'SignUp page',mgs : 'SIGNUP Page..!!',detailmgs:"Password Not Match...!!"});
   }
   else{
     var password = bcrypt.hashSync(password,10);
  const newdataentery = new pmstable({
    username :username,
    email :email,
    password :password,
  });

  newdataentery.save((err,data)=>{
    if(err){  res.render('signup', { title: 'SignUp page',mgs : 'SIGNUP Page..!!',detailmgs:"Not Registered..!!"}); }
    else{ res.render('signup', { title: 'SignUp page',mgs : 'SIGNUP Page..!!',detailmgs:" Registered..!!"}); }
  });
      }
});

//Password-category


//add-category

//add password


//logout
router.get('/logout', function(req, res, next) {
  localStorage.removeItem('usertoken');
  localStorage.removeItem('authuser');
  res.redirect('/');
});

//delete

//edit

//viewdata

//viewdata delete


//viewdetails editing


module.exports = router;
