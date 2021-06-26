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


 
//viewdata delete
router.get('/:id',middelwares.checktoken(),function(req,res,next){
    var authuser = localStorage.getItem('authuser');
      var id = req.params.id;
      passdetailsdata.findByIdAndDelete({_id:id},function(err,data){
            if(err) throw err
            allviewdetails.exec((err1,data2)=>{
              if(err1){ res.render('Viewdetails', { title: 'View Deatils',mgs : 'Password Details Page..!!',useris:authuser,records:data2,del:"Data Not Deleted..!!",pages:''}); }
              else{ res.redirect('/viewdetails')}
            });
          });
  });
  
  
  

module.exports = router;