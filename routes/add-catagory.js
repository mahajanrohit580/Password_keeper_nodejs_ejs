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



//addcatagory
router.get('/',middelwares.checktoken(), function(req, res, next) {
    console.log(req.body.cataname);
    var authuser =localStorage.getItem('authuser');
    res.render('Addcategory', { title: 'ADDCategory',mgs : 'Add Category Page..!!',useris:authuser,addmgs:'',adderr:''});
  });
  
  router.post('/',[ check('cataname','Enter the value...!!').isLength({ min: 2})],middelwares.checktoken(), function(req, res, next) {
    var authuser =localStorage.getItem('authuser');
    var addcatname = req.body.cataname;
  
    const err = validationResult(req);
    if(!err.isEmpty())
    {
      res.render('Addcategory', { title: 'ADDCategory',mgs : 'Add Category Page..!!',useris:authuser,addmgs:'',adderr:err.mapped()});
    }
    else{
    var addcatagory = new viewcatamodel({
      catagoryname:addcatname
    });
    addcatagory.save(function(err,data){
      if(err){
        res.render('Addcategory', { title: 'ADDCategory',mgs : 'Add Category Page..!!',useris:authuser,addmgs:'Catagory Already Added..!!',adderr:''});
      }
      else{
        res.render('Addcategory', { title: 'ADDCategory',mgs : 'Add Category Page..!!',useris:authuser,addmgs:'Catagory Added..!!',adderr:''});
      }
    });
  }
  });
  
  

module.exports = router;