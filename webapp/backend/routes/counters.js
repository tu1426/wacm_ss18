'use strict';

/** Express router providing counter related routes
 * @module counter
 */

let mongoose = require('mongoose'),
  _ = require('lodash'),
  striptags = require('striptags'),
  sanitizer = require('sanitizer'),
  fs = require("fs"),
  URLS = JSON.parse(fs.readFileSync('./config/urls.json')),
  CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE'])),
  NodeRequestParser = require('node-request-parser'),
  jwt = require('jsonwebtoken'),
  Counter = require('../models/Counter'),
  passport = require('passport');

require('../utils/passport')(passport);

const express = require('express'),
  router = express.Router();

//initialize request parser
let requestParserOptions = {disableRegex: true, sanitizeFunction: (property) => sanitizer.sanitize(striptags(property))};
let requestParser = new NodeRequestParser(requestParserOptions);

/**
 * @typedef {Object} CounterResponse
 * @property {Number} count The actual count
 * @property {Boolean} success Indicates if the requested action was successful
 */

/**
 * Increment and get the current counter value.
 * @function
 * @name IncrementCounter
 * @route {POST} /api/counter/
 * @authentication This route requires JWT authentication
 * @headerparam {String} Authorization The jwt token for authorizing the user
 * @returns {CounterResponse}
 */
router.post('/', passport.authenticate('jwt', { session: false}), (req, res, next) => {
  Counter.findOne({}, function(err, counter){
    if(err || !counter) return next(new Error('counter_not_found_error'));
    counter.increment(function (err, newCounter) {
      if(err || !counter) return next(new Error('counter_increment_error'));
      res.json({success: true, count: newCounter.count});
    });
  });
});

/**
 * Get the current counter value.
 * @function
 * @name GetCounter
 * @route {GET} /api/counter/
 * @authentication This route requires JWT authentication
 * @headerparam {String} Authorization The jwt token for authorizing the user
 * @returns {CounterResponse}
 */
router.get('/', passport.authenticate('jwt', { session: false}), (req, res, next) => {
  Counter.findOne({}, function(err, counter){
    if(err || !counter){
      let newCounter = new Counter();
      newCounter.save(function (err, savedCounter) {
        if(err || !savedCounter) return next(new Error('counter_creation_problem_error'));
        res.json({success: true, count: savedCounter.count});
      });
    } else{
      res.json({success: true, count: counter.count});
    }
  });
});

module.exports = router;
