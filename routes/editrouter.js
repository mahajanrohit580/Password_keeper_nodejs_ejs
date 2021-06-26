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


 
//edit router
router.get('/:id',middelwares.checktoken(),function(req,res,next){
    var authuser = localStorage.getItem('authuser');
       var editid = req.params.id;
       var editing = viewcatamodel.findById(editid);
       editing.exec((err,data)=>{
         if(err) throw err
         res.render('editpasscategory', { title: 'Edit Category',mgs : 'Edit Category Page..!!',useris:authuser,editdata:data,editerr:''});
       });
  });
  router.post('/',middelwares.checktoken(),function(req,res,next){
    var authuser = localStorage.getItem('authuser');
    var id = req.body.dataid;
    var cataname = req.body.updname;
  
    var updated=viewcatamodel.findOneAndUpdate({_id:id},{
      catagoryname :cataname,
    });
    updated.exec((err,data)=>{
      if(err){  res.render('editpasscategory', { title: 'Edit Category',mgs : 'Edit Category Page..!!',useris:authuser,editdata:data,editerr:'Data Not Updated..!!'}); }
      else{  res.render('editpasscategory', { title: 'Edit Category',mgs : 'Edit Category Page..!!',useris:authuser,editdata:'',editerr:'Data Updated..!!'}); }
    });
  });
  
  
  

module.exports = router;