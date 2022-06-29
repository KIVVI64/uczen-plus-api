"user strict";
var dbConn = require("../../config/db.config");

//Point object create
var Data = function (data) {
  this.user_id = data.user_id;
  this.amount = data.amount;
  this.status = data.status ? data.status : "await";
  this.table_index = data.table_index;
  this.table_id = data.table_id;
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO point set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Data.findByUserId = function (id, result) {
  dbConn.query(
    "Select * from point where user_id = ? ",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Data.update = function (id, data, result) {
  dbConn.query(
    "UPDATE point SET status=? WHERE id = ?",
    [data.status, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Data;
