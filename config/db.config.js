'user strict';

const mysql = require('mysql');
const credential = require('./credential');

//local mysql db connection
const dbConn = mysql.createConnection(credential);
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
  console.log("HOST: " + process.env.DB_HOST);
});
module.exports = dbConn;