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

router.post(URLS.user_login, (req, res, next) => {
  let data = requestParser.parseSync(req, ['B*username', 'B*password']);
  if(!data) return next(new Error('login_required_data_missing_error'));
  if(data.body.password === 'password' && data.body.username === 'user'){
    let token = jwt.sign({id: 'admin'}, CONFIG.secret, { expiresIn: CONFIG.jwt_expiry_sec });
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
            res.json({success: true, jwt: user.toAuthJSON().token, email: user.email});
          }
        })
      }
    });
  }
});

router.post(URLS.user_register, (req, res, next) => {
  console.log(req.body);
  let data = requestParser.parseSync(req, ['B*email', 'B*password', 'B*name', 'Bbirthdate', 'B*gender']);
  if(!data) return next(new Error('register_required_data_missing_error'));
  if(!validator.isEmail(data.body.email)) return res.json({success: false, message: 'email_no_email_error'});
  if(validator.isBefore(new Date().toString(), data.body.birthdate)) return res.json({success: false, message: 'birthday_after_today_error'});
  if(data.body.gender === 'männlich') data.body.gender = 'male';
  if(data.body.gender === 'weiblich') data.body.gender = 'female';
  if(data.body.gender !== 'male' && data.body.gender !== 'female') return res.json({success: false, message: 'gender_select_error'});
  User.findOne({email: data.body.email}, function(err, user){
    if(err || !user){
      let newUser = new User({
        email: data.body.email,
        password: data.body.password,
        name: data.body.name,
        birthdate: data.body.birthdate,
        gender: data.body.gender
      });
      newUser.save(function (err, savedUser) {
        if(err || !savedUser) return next(new Error('user_creation_problem_error'));
        res.json({success: true, jwt: savedUser.toAuthJSON().token, email: savedUser.email});
      });
    } else{
      res.json({success: false, message: 'user_already_registered_error'});
    }
  });
});

module.exports = router;
