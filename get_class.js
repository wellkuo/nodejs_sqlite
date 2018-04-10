var TestWell = require('./es6');
var dbFunction = require('./model/dbFunction');

var a = new TestWell();
const c = new dbFunction();

let test = [];
c.getData('member','*','', (data) => {
  test = data;
  console.log(test);
 });
a.test();
console.log(test);
