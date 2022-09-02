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
  this.ok = data.ok ? data.ok : 1; //domyslnie pokazany
  this.checked = data.checked ? data.checked : 0;
  this.teacher_id = data.teacher_id;
  this.content = data.content;
  this.user_id = data.user_id;
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO teacher_comment SET ?", newEmp, function (err, res) {
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
  dbConn.query("SELECT * FROM teacher_comment WHERE id = ? ", id, function (err, res) {
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
    "SELECT * FROM teacher_comment WHERE teacher_id = ? ",
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
    "SELECT * FROM teacher_comment WHERE user_id = ? ",
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
      c.id AS comment_id,
      c.uid,
      c.ok AS comment_ok,
      c.checked AS comment_checked,
      c.content,
      c.date_add AS comment_date_add,
      c.user_id,
      u.nick,
      c.teacher_id,
      t.ok AS teacher_ok,
      t.checked AS teacher_checked,
      t.name_first,
      t.name_last,
      t.school_id,
      s.name_full,
      s.ok AS school_ok,
      s.checked AS school_checked
    FROM teacher_comment c
    JOIN teacher t ON t.id = c.teacher_id
    JOIN users u ON u.id = c.user_id
    JOIN school s ON t.school_id = s.id
    WHERE c.uid = ?`,
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
