"user strict";
var dbConn = require("../../config/db.config");

//Data object create
var Data = function (data) {
  this.teacher_id = data.teacher_id;
  this.school_id = data.school_id;
  this.user_id = data.user_id;
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO clicks SET ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Data.countAll = function (result) {
  dbConn.query("SELECT count(*) FROM clicks", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      //console.log("templates : ", res);
      result(null, res);
    }
  });
};
Data.findByTeacherId = function (id, result) {
  dbConn.query(
    "SELECT * FROM clicks WHERE teacher_id = ? ",
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

Data.findBySchoolId = function (id, result) {
  dbConn.query(
    "SELECT * FROM clicks WHERE school_id = ? ",
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
Data.findByUserId = function (id, result) {
  dbConn.query(
    "SELECT * FROM clicks WHERE user_id = ? ",
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

module.exports = Data;
