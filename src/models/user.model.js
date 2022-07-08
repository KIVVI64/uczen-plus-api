"user strict";
var dbConn = require("../../config/db.config");

//Data object create
var Data = function (data) {
  this.firebase_uid = data.firebase_uid;
  this.nick = data.nick;
  this.email = data.email;
  this.type = data.type ? data.type : "user";
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO user SET ?", newEmp, function (err, res) {
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
    "SELECT * FROM user WHERE id = ? ",
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
Data.findByUid = function (uid, result) {
  dbConn.query(
    "SELECT * FROM user WHERE firebase_uid = ? ",
    uid,
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
  dbConn.query("SELECT id, firebase_uid, nick, email, closed, date_add FROM user", function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
    } else {
      //console.log("templates : ", res);
      result(null, res);
    }
  });
};
Data.update = function (id, data, result) {
  dbConn.query(
    "UPDATE user SET nick=?,type=? WHERE id = ?",
    [
      data.nick,
      data.type,
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
  dbConn.query("UPDATE user SET closed = 1 WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Data;
