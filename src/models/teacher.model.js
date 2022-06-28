"user strict";
var dbConn = require("../../config/db.config");

//Generowanie kodu
function randomCode(length = 10) {
    // Declare all characters
    let chars = 'ABCDEFGHJKMNPQRSTUVWXYZ123456789';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
}

//Tworzenie obiektu nauczyciela
var Data = function (data) {
  this.ok = data.ok ? data.ok : 0; //domyslnie ukryty
  this.school_id = data.school_id;
  this.name_first = data.name_first;
  this.name_last = data.name_last;
  this.verification_code = randomCode();
  //this.status         = data.status ? data.status : 1;
  //this.updated_at     = new Date();
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO teacher set ?", newEmp, function (err, res) {
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
  dbConn.query("Select * from teacher where id = ? ", id, function (err, res) {
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
    "Select * from teacher where school_id = ? ",
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
        //console.log("error: ", err);
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
      //console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Data;
