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
    jwt = require('jsonwebtoken');

const express = require('express'),
      router = express.Router();

//initialize request parser
let requestParserOptions = {disableRegex: true, sanitizeFunction: (property) => sanitizer.sanitize(striptags(property))};
let requestParser = new NodeRequestParser(requestParserOptions);

router.post(URLS.user_login, (req, res, next) => {
  let data = requestParser.parseSync(req, ['B*username', 'B*password']);
  if(!data) return next('login_required_data_missing_error');
  if(data.body.password === 'password' && data.body.username === 'user'){
    let token = jwt.sign({id: 'admin'}, CONFIG.secret, { expiresIn: CONFIG.jwt_expiry_sec });
    return res.json({success: true, jwt: 'BEARER ' + token});
  } else{
    return res.json({success: false, message: 'Invalid credentials!'});
  }
});

module.exports = router;
