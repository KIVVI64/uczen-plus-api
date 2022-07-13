"user strict";
var dbConn = require("../../config/db.config");


//Tworzenie obiektu faktów nauczyciela
var Data = function (data) {
  this.ok = data.ok ? data.ok : 0; //domyslnie ukryty
  this.checked = data.checked ? data.checked : 0; //domyslnie ukryty
  this.teacher_id = data.teacher_id;
  this.property = data.property;
  this.value = data.value;
  this.user_id = data.user_id;
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO teacher_info set ?", newEmp, function (err, res) {
    //console.log(randomCode(4));
    if (err) {
      //console.log("error: ", err);
      result(err, null);
    } else {
      //console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Data.findById = function (id, result) {
  dbConn.query("SELECT * FROM teacher_info WHERE id = ? ", id, function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Data.findByTeacherId = function (teacher_id, result) {
  dbConn.query(
    "SELECT * FROM teacher_info WHERE teacher_id = ? ",
    teacher_id,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Data.findByUserId = function (user_id, result) {
  dbConn.query(
    "SELECT * FROM teacher_info WHERE user_id = ? ",
    user_id,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Data.findAll = function (result) {
  dbConn.query("SELECT count(*) AS count, ok, checked FROM teacher_info GROUP BY ok, checked", function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('templates : ', res);
      result(null, res);
    }
  });
};
/*Data.update = function (id, data, result) {
  dbConn.query(
    "UPDATE templates SET checked=?, first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
    [
      data.checked,
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
        //console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};*/

module.exports = Data;
