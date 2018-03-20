'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let schema = new Schema({
  count: {type: Number, required: true, default: 0}
});

schema.methods.increment = function (callback) {
  this.count ++;
  this.save(callback);
};

module.exports = mongoose.model('Counter', schema);
