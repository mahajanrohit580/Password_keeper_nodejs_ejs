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


 
//delete router
router.get('/:id',middelwares.checktoken(),function(req,res,next){
    var authuser = localStorage.getItem('authuser');
      var id = req.params.id;
      viewcatamodel.findByIdAndDelete({_id:id},function(err,data){
            if(err) throw err
            alldataview.exec((err1,data2)=>{
              if(err1){ res.render('password_categoryview', { title: 'Password Category',mgs : 'Password Category Page..!!',useris:authuser,records:data2,del:"Data Not Deleted..!!"}); }
              else{  res.render('password_categoryview', { title: 'Password Category',mgs : 'Password Category Page..!!',useris:authuser,records:data2,del:"Data Deleted..!!"});}
            });
          });
  });
  
  

module.exports = router;