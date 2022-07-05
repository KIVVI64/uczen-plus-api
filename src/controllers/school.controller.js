'use strict';

const Data = require('../models/school.model');

exports.findAll = function(req, res) {
  Data.findAll(function(err, data) {
    //console.log('controller')
    if (err)
    res.send(err);
    //console.log('res', data);
    res.send(data);
  });
};


exports.create = function(req, res) {
    const new_data = new Data(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Data.create(new_data, function(err, data) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Data added successfully!",data:data});
        });
    }
};


exports.findById = function(req, res) {
    Data.findById(req.params.id, function(err, data) {
        if (err)
        res.send(err);
        res.json(data);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Data.update(req.params.id, new Data(req.body), function(err, data) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Data successfully updated' });
        });
    }
  
};