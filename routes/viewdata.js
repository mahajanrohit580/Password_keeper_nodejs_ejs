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


 
//viewdata
router.get('/:page?',middelwares.checktoken(),function(req,res){

    var limit = 5;
    var page = req.params.page || 1;
  
    var off = ((limit * page) - limit);  //logic to increment offset data no
    var options = {
                    offset : off,
                    limit : limit
                  };
              
    var authuser = localStorage.getItem('authuser');
  
    passdetailsdata.paginate({},options).then(function(result){
     console.log('limit='+result.limit+' offset='+result.offset+' total='+result.total);   
  
      res.render('Viewdetails', { title: 'View Deatils',mgs : 'Password Details Page..!!',
      useris:authuser,
      records:result.docs,
      current :result.offset,
      pages :Math.ceil(result.total/result.limit) ,
      del:''});
  
    });
    
  
  });
  
  
  

module.exports = router;