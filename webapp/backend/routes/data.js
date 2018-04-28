'use strict';

/** Express router providing user related routes
 * @module users
 */
let _ = require('lodash'),
  striptags = require('striptags'),
  sanitizer = require('sanitizer'),
  fs = require("fs"),
  URLS = JSON.parse(fs.readFileSync('./config/urls.json')),
  CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE'])),
  NodeRequestParser = require('node-request-parser'),
  jwt = require('jsonwebtoken'),
  validator = require('validator'),
  User = require('../models/User'),
  passport = require('passport');

const express = require('express'),
      router = express.Router();

//initialize request parser
let requestParserOptions = {
  disableRegex: true,
  sanitizeFunction: (property) => sanitizer.sanitize(striptags(property)),
  authFunction: (headers, callback) => {
    let token = getToken(headers);
    jwt.verify(token, CONFIG.secret, function(err, decoded) {
      if(err || !decoded) return callback(err, null);
      User.findOne({_id: decoded.id}, function (err, user) {
        if (err || !user) return callback(err, null);
        callback(null, user);
      });
    });
  }
};
let requestParser = new NodeRequestParser(requestParserOptions);

router.get('/', (req, res, next) => {
  requestParser.parse(req, ['A'], (err, data) => {
    if(!data) return next(new Error('login_required_data_missing_error'));
    console.log('user with state ' + data.authorization.state + ' called get /data.');
    if(data.authorization.state === 'RF') return res.status(403).json({success: false, message: 'only users can get data for now'});
    // TODO: implement getting of user specific data here, look up data for user with id data.authorization._id
    res.json({success: true, data: []});
  });
});

router.post('/', (req, res, next) => {
  requestParser.parse(req, ['A'], (err, data) => {
    if(!data) return next(new Error('login_required_data_missing_error'));
    console.log('user with state ' + data.authorization.state + ' called post /data.');
    if(data.authorization.state === 'RF') return res.status(403).json({success: false, message: 'only users can save new data for now'});
    // TODO: implement saving of user specific data here, user id is data.authorization._id
    res.json({success: true, data: []});
  });
});


const getToken = (headers) => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
