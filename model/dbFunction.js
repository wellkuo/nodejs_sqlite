'use strict';
// initial db
var sqlite3 = require("sqlite3").verbose();

class dbFunction {
  constructor(dbName = 'baby') {
    this.fileName = `./${dbName}.db`;
  }
  getData(table, fields='*', condition='', callback) {
    console.log('start to get data .');

    let db = new sqlite3.Database(this.fileName);
    let stmt = `SELECT ${fields} FROM ${table}`;
    if (condition !== ''){
      stmt = `${stmt} WHERE ${condition}`;
    }
    let returnVal = [];
    db.serialize(function() {
      db.each(stmt, function(err, row) {
        returnVal.push(row);
        console.log(row.id + ": " + row.account);
      }, () => {
        db.close();
        callback(returnVal);
      });
    });
    console.log('get data end');
  }
  insertData(table, fields={}, callback) {
    console.log('start to insert data .');
    let tmpFields = [];
    let tmpValues = [];
    let tmpQArr = [];
    let fieldStr = '';
    let tmpQ = '';
    let db = new sqlite3.Database(this.fileName);
    for(let key in fields) {
      tmpFields.push(key);
      tmpValues.push(fields[key]);
      tmpQArr.push('?');
    }
    fieldStr = tmpFields.join(',');
    tmpQ = tmpQArr.join(',');
    let exeStmt = `INSERT INTO ${table} (${fieldStr}) VALUES (${tmpQ})`;
    db.serialize(function() {
      console.log(exeStmt);
      console.log(tmpValues);
      var stmt = db.prepare(exeStmt);
      console.log(stmt);
      stmt.run(tmpValues, (err) => {
        if (err) {
          callback(false);
        } else {
          callback(true);
        }
      });
    });
    console.log('insert data end');
  }
  updateData(table, fields={}, condition='', callback) {
    console.log('start to update data .');
    let tmpFields = [];
    let tmpValues = [];
    let fieldStr = '';
    let db = new sqlite3.Database(this.fileName);
    for(let key in fields) {
      tmpFields.push(key);
      tmpValues.push(fields[key]);
    }
    fieldStr = tmpFields.join('=?,');
    if (fieldStr !== '') {
      fieldStr = `${fieldStr}=?`;
    }
    let exeStmt = `UPDATE ${table} SET ${fieldStr} `;
    if (condition !== ''){
      exeStmt = `${exeStmt} WHERE ${condition}`;
    }
    db.serialize(function() {
      console.log(exeStmt);
      console.log(tmpValues);
      // var stmt = db.prepare(exeStmt);
      db.run(exeStmt, tmpValues, (err) => {
        if (err) {
          callback(false);
        } else {
          callback(true);
        }
      });
    });
    console.log('update data end');
  }

  deleteData(table, condition='', callback) {
    console.log('start to delete data .');
    let tmpValues = [];
    let db = new sqlite3.Database(this.fileName);
    let exeStmt = `DELETE FROM ${table} `;
    if (condition !== ''){
      exeStmt = `${exeStmt} WHERE ${condition}`;
    }
    db.serialize(function() {
      console.log(exeStmt);
      console.log(tmpValues);
      // var stmt = db.prepare(exeStmt);
      db.run(exeStmt, tmpValues, (err) => {
        if (err) {
          callback(false);
        } else {
          callback(true);
        }
      });
    });
    console.log('delete data end');
  }
}

module.exports = dbFunction;
