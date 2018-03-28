var fs = require("fs");
var file = "./baby.db";

// initial db
var sqlite3 = require("sqlite3").verbose();
//new 一個 sqlite 的 database，檔案是 test.db
var db = new sqlite3.Database(file);

db.serialize(function() {
  // Start Create the default Databases
  // member table
  db.run("CREATE TABLE IF NOT EXISTS  member (id integer PRIMARY KEY, account text, password text, name text, gender integer, email text, createt integer)");

  // baby_bio_log table
  db.run("CREATE TABLE IF NOT EXISTS  baby_bio_log (id integer PRIMARY KEY, baby_id integer, height integer, weight integer, createt integer)");

  // baby_info table
  db.run("CREATE TABLE IF NOT EXISTS  baby_info (id integer PRIMARY KEY, name text, createt integer)");

  // baby_milk_log
  db.run("CREATE TABLE IF NOT EXISTS  baby_milk_log (id integer PRIMARY KEY, baby_id integer, unit text, quantity integer, food_type text, createt integer)");

  //
  /*
  var stmt = db.prepare("INSERT INTO member (account,password,name,gender,email,createt) VALUES (?,?,?,?,?,?)");

  //write the testing 10 records
  for (var i = 0; i<10; i++) {
    stmt.run(["user"+i,"12345","name"+i,1,"ww@mail.com.tw",123413241]);
  }

  stmt.finalize();

  db.each("SELECT id, account FROM member", function(err, row) {
    console.log(row.id + ": " + row.account);
  });
  */
  console.log("Database has initialed");
});


db.close();
