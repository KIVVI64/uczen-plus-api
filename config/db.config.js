'user strict';

const mysql = require('mysql');
const credential = require('./credential');

//local mysql db connection
const dbConn = mysql.createConnection(credential);
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;