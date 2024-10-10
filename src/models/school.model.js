"user strict";
var dbConn = require("../../config/db.config");

//Data object create
var Data = function (data) {
  this.ok = data.ok ? data.ok : 0;
  this.checked = data.checked ? data.checked : 0;
  this.name_full = data.name_full;
  this.name_colloquial = data.name_colloquial;
  this.type = data.type;
  this.address = data.address;
  this.woj = data.woj;
  this.city = data.city;
  this.website = data.website;
  this.contact = data.contact;
};
Data.create = function (newEmp, result) {
  dbConn.query("INSERT INTO school SET ?", newEmp, function (err, res) {
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
  dbConn.query("SELECT * FROM school WHERE id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Data.findAll = function (result) {
  dbConn.query(
    `SELECT
      s.id,
      s.ok,
      s.checked,
      s.name_full,
      s.name_colloquial,
      s.woj,
      s.city,
      s.date_add,
      s.date_edit,
      COUNT(t.id) AS total_teachers
    FROM school s
    LEFT JOIN teacher t ON s.id = t.school_id
    GROUP BY s.id`,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        //console.log("templates: ", res);
        result(null, res);
      }
    }
  );
};
Data.update = function (id, data, result) {
  dbConn.query(
    "UPDATE school SET ok=?, checked=?, name_full=?, name_colloquial=?, type=?, address=?, woj=?, city=?, website=?, contact=? WHERE id = ?",
    [
      data.ok,
      data.checked,
      data.name_full,
      data.name_colloquial,
      data.type,
      data.address,
      data.woj,
      data.city,
      data.website,
      data.contact,
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

module.exports = Data;
