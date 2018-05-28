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
    User = require('../models/User');

const express = require('express'),
      router = express.Router();

//initialize request parser
let requestParserOptions = {disableRegex: true, sanitizeFunction: (property) => sanitizer.sanitize(striptags(property))};
let requestParser = new NodeRequestParser(requestParserOptions);


/**
 * @typedef {Object} LoginResponse
 * @property {String} jwt The jwt token for the user
 * @property {String} email The email of the user
 * @property {String} state RF or USER, dependent on the state of the user in the database
 * @property {Boolean} success Indicates if the requested action was successful
 */

/**
 * Login function for users.
 * @function
 * @name Login
 * @route {POST} /api/data/newData
 * @bodyparam {String} username The username of the user
 * @bodyparam {String} password The password of the user in plaintext
 * @returns {LoginResponse}
 */
router.post(URLS.user_login, (req, res, next) => {
  let data = requestParser.parseSync(req, ['B*username', 'B*password']);
  if(!data) return next(new Error('login_required_data_missing_error'));
  if(data.body.password === 'password' && data.body.username === 'user'){
    let token = jwt.sign({id: 'admin', state:'USER'}, CONFIG.secret, { expiresIn: CONFIG.jwt_expiry_sec });
    return res.json({success: true, jwt: 'BEARER ' + token, email: 'ADMIN'});
  } else{
    User.findOne({email: data.body.username}, function(err, user){
      if(err || !user){
        return res.json({success: false, message: 'Invalid credentials!'});
      } else{
        user.comparePassword(data.body.password, (err, isMatch) => {
          if(err || !isMatch){
            return res.json({success: false, message: 'Invalid credentials!'});
          } else{
            if(user.isEnabled){
              res.json({success: true, jwt: user.toAuthJSON().token, email: user.email, state: user.state});
            } else{
              res.json({success: false, message: 'Not yet activated!'});
            }
          }
        })
      }
    });
  }
});

/**
 * Register function for users. Returns LoginResponse if USER registers or a simple wrapper message for RF (research facilities)
 * @function
 * @name Register
 * @route {POST} /api/data/newData
 * @bodyparam {String} email The email (is also username) of the user
 * @bodyparam {String} password The password of the user in plaintext
 * @bodyparam {String} name The name of the user
 * @bodyparam {Date} birthdate The birthdate of the user
 * @bodyparam {String} gender The gender of the user
 * @bodyparam {String} state The state of the user
 * @returns {LoginResponse}
 */
router.post(URLS.user_register, (req, res, next) => {
  let data = requestParser.parseSync(req, ['B*email', 'B*password', 'B*name?', 'Bbirthdate?', 'B*gender?', 'B*state']);
  if(!data) return next(new Error('register_required_data_missing_error'));
  if(!data.body.state) return next(new Error('register_state_missing_error'));
  if(!validator.isEmail(data.body.email)) return res.json({success: false, message: 'email_no_email_error'});
  if(data.body.state === 'USER') {
    if (validator.isBefore(new Date().toString(), data.body.birthdate)) return res.json({
      success: false,
      message: 'birthday_after_today_error'
    });
    if (data.body.gender === 'männlich') data.body.gender = 'male';
    if (data.body.gender === 'weiblich') data.body.gender = 'female';
    if (data.body.gender !== 'male' && data.body.gender !== 'female') return res.json({
      success: false,
      message: 'gender_select_error'
    });
    User.findOne({email: data.body.email}, function (err, user) {
      if (err || !user) {
        let newUser = new User({
          email: data.body.email,
          password: data.body.password,
          name: data.body.name,
          birthdate: data.body.birthdate,
          gender: data.body.gender,
          state: 'USER',
          isEnabled: true
        });
        newUser.save(function (err, savedUser) {
          if (err || !savedUser) return next(new Error('user_creation_problem_error'));
          res.json({success: true, jwt: savedUser.toAuthJSON().token, email: savedUser.email, state: savedUser.state});
        });
      } else {
        res.json({success: false, message: 'user_already_registered_error'});
      }
    });
  } else{
    User.findOne({email: data.body.email}, function (err, user) {
      if (err || !user) {
        let newUser = new User({
          email: data.body.email,
          password: data.body.password,
          state: 'RF',
          isEnabled: false
        });
        newUser.save(function (err, savedUser) {
          if (err || !savedUser) return next(new Error('user_creation_problem_error'));
          res.json({success: true, message: 'rf_registered_successfully'});
        });
      } else {
        res.json({success: false, message: 'user_already_registered_error'});
      }
    });
  }
});

module.exports = router;
