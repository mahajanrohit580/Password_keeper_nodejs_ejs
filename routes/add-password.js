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



//addpass
router.get('/',middelwares.checktoken(), function(req, res, next) {
    var authuser =localStorage.getItem('authuser');
    alldataview.exec((err,data)=>{
      if(err) throw err
      res.render('Addpassword', { title: 'ADD Password',mgs : 'Add Password Page..!!',useris:authuser,adddata:data,addpaser:''});
    });
  });
  router.post('/',middelwares.checktoken(),function(req,res){
    var authuser =localStorage.getItem('authuser');
    var cataname = req.body.pass_cat;
    var pssdetails= req.body.pass_details;
    var proname = req.body.projectname;
    console.log(req.body)
    var datapass = new passdetailsdata({
      catagoryname : cataname,
      passworddetails :pssdetails,
      projectname : proname,
    }); 
     datapass.save((err,dta)=>{
      alldataview.exec((err1,data)=>{
        if(err){  res.render('Addpassword', { title: 'ADD Password',mgs : 'Add Password Page..!!',useris:authuser,adddata:data,addpaser:'data Already added..!!'});  }
        else{ res.render('Addpassword', { title: 'ADD Password',mgs : 'Add Password Page..!!',useris:authuser,adddata:data,addpaser:'data  added..!!'}); }
      });
  
    })
  });
  
  

module.exports = router;