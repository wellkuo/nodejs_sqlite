var express = require('express');
var router = express.Router();
var dbFunction = require('../model/dbFunction');
const df = new dbFunction();


router.get('/db', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  df.getData('member','*','', (data) => {
    // res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
   });
  // next();
});

router.get('/insert', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  df.insertData('member',{account:'well',password:'123456',name:'haha',gender:1,email:'xx@mail.com',createt:123123213}, (data) => {
    // res.setHeader('Content-Type', 'application/json');
    res.send({result: data});
   });
  // next();
});

router.get('/update', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  df.updateData('member',{account:'wellx',password:'123456',name:'haha',gender:1,email:'xx@mail.com',createt:123123213}, 'id=2', (data) => {
    // res.setHeader('Content-Type', 'application/json');
    res.send({result: data});
   });
  // next();
});

module.exports = router;
