"user strict";
var dbConn = require("../../config/db.config");

//Generowanie kodu z daty
function randomCode(length = 10) {
  // Declare all characters
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minute = d.getMinutes();
  let chars = "0123456789";

  // Pick characers randomly
  let str = year + month + day + hour + minute + "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

//Tworzenie obiektu faktów nauczyciela
var Data = function (data) {
  this.uid = data.uid ? data.uid : randomCode(4);
  this.ok = data.ok ? data.ok : 0; //domyslnie ukryty
  this.checked = data.checked ? data.checked : 0; //domyslnie ukryty
  this.teacher_id = data.teacher_id;
  this.table = data.table;
  this.content = data.content;
  this.user_id = data.user_id;
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO teacher_facts set ?", newEmp, function (err, res) {
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
  dbConn.query("Select * from teacher_facts where id = ? ", id, function (err, res) {
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
    "Select * from teacher_facts where teacher_id = ? ",
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
    "Select * from teacher_facts where user_id = ? ",
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
Data.findByUid = function (uid, result) {
  dbConn.query(
    "Select * from teacher_facts where uid = ? ",
    uid,
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
  dbConn.query("Select * from teacher", function (err, res) {
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
