var express = require('express');
var router = express.Router();
var dbFunction = require('../model/dbFunction');
const df = new dbFunction();


router.post('/db', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  df.getData('member','*','', (data) => {
    // res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
   });
  // next();
});

router.post('/login', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let inputVar = req.body;
  if('account' in inputVar && 'password' in inputVar) {
    df.getData('member','*',`account="${inputVar.account}" AND password="${inputVar.password}"`, (data) => {
      res.setHeader('Content-Type', 'application/json');
      let returnVal = {
        status: 'error',
        type: 'account',
        currentAuthority: 'guest',
      };
      console.log(data.length);
      if(data.length > 0) {
        returnVal.currentAuthority = 'user';
        returnVal.status = 'ok';
      }
      res.send(JSON.stringify(returnVal));
     });
  } else {
    next();
  }
  // next();
});

router.post('/insert', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  df.insertData('member',{account:'well',password:'123456',name:'haha',gender:1,email:'xx@mail.com',createt:123123213}, (data) => {
    // res.setHeader('Content-Type', 'application/json');
    res.send({result: data});
   });
  // next();
});

router.post('/update', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  df.updateData('member',{account:'wellx',password:'123456',name:'haha',gender:1,email:'xx@mail.com',createt:123123213}, 'id=2', (data) => {
    // res.setHeader('Content-Type', 'application/json');
    res.send({result: data});
   });
  // next();
});

router.post('/delete', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let id = '0';
  if(req.body.id !== '') {
    id = req.body.id;
  }

  df.deleteData('member',`id=${id}`, (data) => {
    // res.setHeader('Content-Type', 'application/json');
    res.send({result: data});
   });
  // next();
});

module.exports = router;
