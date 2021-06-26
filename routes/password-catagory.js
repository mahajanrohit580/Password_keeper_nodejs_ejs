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



//password-catagory
router.get('/',middelwares.checktoken(), function(req, res, next) {
    var authuser =localStorage.getItem('authuser');
  
    alldataview.exec((err,data)=>{
      if(err) throw err
      res.render('password_categoryview', { title: 'Password Category',mgs : 'Password Category Page..!!',useris:authuser,records:data,del:''});
    });
  });

module.exports = router;