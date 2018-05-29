jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

//let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
//jasmine.getEnv().addReporter(new SpecReporter());
//jasmine.getEnv().addReporter(new jasmine.TapReporter());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env['CONFIG_FILE'] = './config/test_config.json';

let User = require('../../models/User'),
    Data = require('../../models/Data'),
    request = require('request'),
    mongoose = require('mongoose'),
    fs = require("fs"),
    urls = require('../../../config/urls');

mongoose.Promise = global.Promise;
CONFIG = JSON.parse(fs.readFileSync('./config/test_config.json'));

//beforeEach with global scope
beforeEach(function (done) {
  mongoose.connect('mongodb://' + CONFIG.mongo_host + ':' + CONFIG.mongo_port + '/' + CONFIG.mongo_db_name_test);

	//setup dev db before each test
	setupTestData(function(err, isOkay){
    if(err) return done(err);
    if(!isOkay) return done('data insert was not okay!');
		done();
	});
});

//afterEach with global scope
afterEach(function (done) {

	//drop all collections after every tests
	User.remove({}, function(err){
    if(err){
      done(err);
    }
    Data.remove({}, function (err) {
      if(err){
        done(err);
      }
      //close connection to mongoDB
      mongoose.connection.close(function () {
        done();
      });
    });
	});
});

setupTestData = function(callback){
	//insert entities here
	let newUser = new User({
      email: 'max.mustermann@gmx.at',
      name: 'max88',
      password: 'maxmax',
      birthdate: new Date(),
      gender: 'male',
      state: 'USER',
    isEnabled: true
  });
  let newResearchFacility = new User({
    email: 'markus.mustermann@gmx.at',
    name: 'markus',
    password: 'markusmarkus',
    birthdate: new Date(),
    gender: 'male',
    state: 'RF',
    isEnabled: true
  });
  let newUser3 = new User({
    email: 'martina.mustermann@gmx.at',
    name: 'martina',
    password: 'martina',
    birthdate: new Date(),
    gender: 'female',
    state: 'USER',
    isEnabled: true
  });

	newUser.save(function(err, user) {
		if (err || !user) {
			callback(err, false);
		} else{
      newResearchFacility.save(function (err, rf2) {
        if (err || !rf2) {
          callback(err, false);
        } else{
          newUser3.save(function (err, user3) {
            if (err || !user3) {
              callback(err, false);
            } else{
                let data = new Data({
                  user_id: user3._id,
                  title: 'TestData1',
                  description: 'Test-Description1',
                  image: 'www.image.com',
                  tags: ['test', 'description', 'one']
                });
                data.save(function(err, dataSaved) {
                  if(err || !dataSaved){
                    callback(err, false);
                  } else{
                    callback(null, true);
                  }
                });
            }
          });
        }
      });
		}
  });
};

login = function(username, password, callback){
  let body = JSON.stringify({ 'username': username, 'password' : getEncodedPassword(password)});
  let options = {
    url: urls.base_url + urls.user_url + '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  };

  request(options, function(err, response, body) {
    if(err){
      callback(err, null);
    } else{
      let info = JSON.parse(body);
      if(!info.user) console.log(info);
      callback(null, info.user.token, info.user);
    }
  });
};

loginAndGetTokenAndUser = function(username, password, callback){
  login(username, password, function (err, token, userAuth) {
    if(err) callback(err);
    User.findOne({'username': userAuth.username}, function (err, user) {
      if(err) callback(err);
      callback(null, token, user);
    });
  });
};
