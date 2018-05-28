'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require("fs"),
    CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE']));

let schema = new Schema({
    user_id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: false},
    image: { type: String, required: false},
    tags: {type: [String], required: true}
});
module.exports = mongoose.model('Data', schema);
