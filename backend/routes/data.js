'use strict';

/** Express router providing data related routes
 * @module data
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
    Data = require('../models/Data'),
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

/**
 * @typedef {Object} NewDataResponse
 * @property {String} message The success message
 * @property {Boolean} success Indicates if the requested action was successful
 */

/**
 * @typedef {Object} DataResponse
 * @property {Object[]} data A list of available data
 * @property {Boolean} success Indicates if the requested action was successful
 */

/**
 * Save new data for a user.
 * @function
 * @name NewData
 * @route {POST} /api/data/newData
 * @authentication This route requires JWT authentication
 * @headerparam {String} Authorization The jwt token for authorizing the user
 * @bodyparam {String} title Title of the new data
 * @bodyparam {String} description Description of the new data
 * @bodyparam {String} Image Url of image of the new data
 * @bodyparam {String[]} tags List of strings for tags of the new data
 * @returns {NewDataResponse}
 */
router.post('/newData',passport.authenticate('jwt', { session: false}), (req, res, next) => {
    requestParser.parse(req, ['B*title', 'B*description?', 'B*image?', 'B*tags', 'A'], (err, data) => {
    if(!data) return next(new Error('login_required_data_missing_error'));
    console.log('user with id ' + data.authorization._id + ' called post /data.');
    if(data.authorization.state === 'RF') return res.status(403).json({success: false, message: 'only users can save new data for now'});

    let newData = new Data({
        user_id: data.authorization._id,
        title: data.body.title,
        description: data.body.description,
        tags: data.body.tags,
        image: data.body.image
    });
    newData.save(function (err, savedData) {
        if (err || !savedData){
            return next(new Error('data_creation_problem_error'));
        }
        res.json({success: true, message: 'data_saved_successfully'});
    });

});

});

/**
 * Get data belonging to the requesting user.
 * @function
 * @name GetData
 * @route {GET} /api/data/data
 * @authentication This route requires JWT authentication
 * @headerparam {String} Authorization The jwt token for authorizing the user
 * @returns {DataResponse}
 */
router.get('/data', passport.authenticate('jwt', { session: false}),(req, res, next) => {
        requestParser.parse(req, ['A'], (err, data) => {
        if(!data) return next(new Error('login_required_data_missing_error'));
        console.log('user with id ' + data.authorization._id + ' called get /data.');
        if(data.authorization.state === 'RF') return res.status(403).json({success: false, message: 'only users can get data for now'});

        Data.find({user_id: data.authorization._id}, function(err, data){
            if(err || !data){
                return res.json({success: false, message: 'Invalid credentials!'});
            } else{
                res.json({success: true, data: data});

            }
        });
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
