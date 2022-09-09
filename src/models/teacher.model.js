"user strict";
var dbConn = require("../../config/db.config");

//Generowanie kodu
function randomCode(length = 10) {
  // Declare all characters
  let chars = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

//Tworzenie obiektu nauczyciela
var Data = function (data) {
  this.ok = data.ok ? data.ok : 0; //domyslnie ukryty
  this.checked = data.checked ? data.checked : 0; //domyslnie ukryty
  this.school_id = data.school_id;
  this.name_first = data.name_first;
  this.name_last = data.name_last;
  this.verification_code = randomCode();
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO teacher SET ?", newEmp, function (err, res) {
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
  dbConn.query("SELECT * FROM teacher WHERE id = ? ", id, function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Data.findBySchoolId = function (school_id, result) {
  dbConn.query(
    `SELECT
      t.id,
      t.ok,
      t.checked,
      t.school_id,
      t.name_first,
      t.name_last,
      t.date_add,
      t.date_edit,
      COUNT(CASE WHEN f.date_add >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 14 DAY) THEN 1 END) AS new_info
    FROM teacher t
    INNER JOIN teacher_facts f ON t.id = f.teacher_id
    WHERE t.school_id = ?
    GROUP BY t.id`,
    school_id,
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
  dbConn.query(
    `SELECT
      t.id,
      t.ok,
      t.checked,
      t.school_id,
      t.name_first,
      t.name_last,
      COUNT(CASE WHEN f.date_add >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 14 DAY) THEN 1 END) AS new_info,
      COUNT(CASE WHEN c.date_add >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 14 DAY) THEN 1 END) AS trending,
      COUNT(c.id)
    FROM teacher t
    INNER JOIN teacher_facts f ON t.id = f.teacher_id
    INNER JOIN clicks c ON t.id = c.teacher_id
    GROUP BY t.id`,
    function (err, res) {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
      } else {
        //console.log('templates : ', res);
        result(null, res);
      }
    }
  );
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
Data.delete = function (id, result) {
  dbConn.query(
    "UPDATE teacher SET ok=0, checked=1 WHERE id = ?",
    [id],
    function (err, res) {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Data;
