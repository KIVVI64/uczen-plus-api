"user strict";
var dbConn = require("../../config/db.config");

//Data object create
var Data = function (data) {
  this.first_name = data.first_name;
  this.last_name = data.last_name;
  this.email = data.email;
  this.phone = data.phone;
  this.organization = data.organization;
  this.designation = data.designation;
  this.salary = data.salary;
  this.status = data.status ? data.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO templates SET ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Data.findById = function (id, result) {
  dbConn.query(
    "SELECT * FROM templates WHERE id = ? ",
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
Data.findAll = function (result) {
  dbConn.query("SELECT id, date_add FROM templates", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log("templates : ", res);
      result(null, res);
    }
  });
};
Data.update = function (id, data, result) {
  dbConn.query(
    "UPDATE templates SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
    [
      data.first_name,
      data.last_name,
      data.email,
      data.phone,
      data.organization,
      data.designation,
      data.salary,
      id,
    ],
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
Data.delete = function (id, result) {
  dbConn.query("DELETE FROM templates WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Data;
