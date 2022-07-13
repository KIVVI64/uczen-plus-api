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
  let chars = "qwertyupasdfghjkzxcvbnm";

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
  dbConn.query("INSERT INTO teacher_facts SET ?", newEmp, function (err, res) {
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
  dbConn.query("SELECT * FROM teacher_facts WHERE id = ? ", id, function (err, res) {
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
    "SELECT * FROM teacher_facts WHERE teacher_id = ? ",
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
    "SELECT * FROM teacher_facts WHERE user_id = ? ",
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
    `SELECT
      f.id AS fact_id,
      f.uid,
      f.ok AS fact_ok,
      f.checked AS fact_checked,
      f.table,
      f.content,
      f.edit_points,
      f.date_add AS fact_date_add,
      f.user_id,
      u.nick,
      f.teacher_id,
      t.ok AS teacher_ok,
      t.checked AS teacher_checked,
      t.name_first,
      t.name_last,
      t.school_id,
      s.name_full,
      s.ok AS school_ok,
      s.checked AS school_checked
    FROM teacher_facts f 
    JOIN teacher t ON t.id = f.teacher_id
    JOIN users u ON u.id = f.user_id
    JOIN school s ON t.school_id = s.id
    WHERE f.uid = ?`,
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
/*Data.findAll = function (result) {
  dbConn.query("Select * from teacher", function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
    } else {
      //console.log('templates : ', res);
      result(null, res);
    }
  });
};*/
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
