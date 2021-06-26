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


 
//viewdata edit
router.get('/:id',middelwares.checktoken(),function(req,res,next){
    var authuser = localStorage.getItem('authuser');
       var editid = req.params.id;
       var editing = passdetailsdata.findById(editid);
       editing.exec((err,data)=>{
         if(err) throw err
         res.render('viewdetailsedit', { title: 'View Deatils',mgs : 'View Deatils Edit Page..!!',useris:authuser,editdata:data,editerr:'',pages:''});
       });
  });
  router.post('/',middelwares.checktoken(),function(req,res,next){
    var authuser = localStorage.getItem('authuser');
    var id = req.body.dataid;
    var cataname = req.body.updname;
    var proname = req.body.upprojectname;
    var uppass = req.body.uppwd;
  
    var updated=passdetailsdata.findOneAndUpdate({_id:id},{
      catagoryname :cataname,
      projectname :proname,
      passworddetails : uppass,
    });
    updated.exec((err,data)=>{
      if(err){  res.render('viewdetailsedit', { title: 'View Deatils',mgs : 'View Deatils Edit Page..!!',useris:authuser,editdata:data,editerr:'Data Not Updated..!!',pages:''}); }
      else{  res.render('viewdetailsedit', { title: 'View Deatils',mgs : 'View Deatils Edit Page..!!',useris:authuser,editdata:'',editerr:'Data Updated..!!',pages:''}); }
    });
  });
  
  
  

module.exports = router;