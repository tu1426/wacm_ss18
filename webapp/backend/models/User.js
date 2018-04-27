'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  fs = require("fs"),
  CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE']));

let schema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String},
  name: {type: String, required: true},
  birthdate: {type: Date, required: true},
  gender: {type: String, required: true},
});

schema.pre('save', function(next){
  let user = this;
  try{
    if(this.isModified('password') || this.isNew){
      if(this.isNew){
        if(!this.password) return next(new Error('user_password_error'));
        bcrypt.genSalt(10, function (err, salt) {
          if (err || !salt) return next(new Error('user_password_error'));
          bcrypt.hash(user.password, salt, function (err, hash) {
            if (err || !hash) return next(new Error('user_password_error'));
            user.password = hash;
            return next();
          });
        });
      } else{
        if(this.password) {
          bcrypt.genSalt(10, function (err, salt) {
            if (err || !salt) return next(new Error('user_password_error'));
            bcrypt.hash(user.password, salt, function (err, hash) {
              if (err || !hash) return next(new Error('user_password_error'));
              user.password = hash;
              return next();
            });
          });
        } else{
          return next();
        }
      }
    } else{
      return next();
    }
  } catch(err){
    console.log(err);
    return next(new Error('json_error'));
  }
});

schema.methods.generateJWT = function(){
  return jwt.sign({id: this._id}, CONFIG.secret, { expiresIn: CONFIG.jwt_expiry_sec });
};

schema.methods.toAuthJSON = function(){
  return {
    email: this.email,
    token: 'BEARER ' + this.generateJWT()
  };
};

schema.methods.comparePassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if(err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', schema);
