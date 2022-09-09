"use strict";

const Data = require("../models/clicks.model");

exports.countAll = function (req, res) {
  Data.countAll(function (err, data) {
    //console.log('controller')
    if (err) res.send(err);
    //console.log('res', data);
    res.send(data);
  });
};

exports.create = function (req, res) {
  const new_data = new Data(req.body);

  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Data.create(new_data, function (err, data) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Data added successfully!",
        data: data,
      });
    });
  }
};

exports.findByTeacherId = function (req, res) {
  Data.findByTeacherId(req.params.teacher_id, function (err, data) {
    if (err) res.send(err);
    res.json(data);
  });
};

exports.findBySchoolId = function (req, res) {
  Data.findBySchoolId(req.params.school_id, function (err, data) {
    if (err) res.send(err);
    res.json(data);
  });
};

exports.findByUserId = function (req, res) {
  Data.findByUserId(req.params.user_id, function (err, data) {
    if (err) res.send(err);
    res.json(data);
  });
};