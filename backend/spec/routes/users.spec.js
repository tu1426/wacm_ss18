
let request = require('request'),
    urls = require('../../../config/urls'),
    CONFIG,
    fs = require("fs"),
    User = require('../../models/User');

CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE']));


describe('wacm backend user & authentication routes', function() {

  //beforeEach with local scope
  beforeEach(function (done) {
    done();
  });

  describe('POST /user/login', function() {
    it('check if login possible with existing users', function(done) {
      let body = JSON.stringify({ 'username': 'markus.mustermann@gmx.at', 'password' : 'markusmarkus'});

      let options = {
        url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.user + urls.user_login,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      };

      request(options, function(err, response, body) {
      	if(err){
          done(err);
      	} else{
          let info = JSON.parse(body);
          if(!info.success){
            done('success = false');
          } else{
            expect(info.email).toBe('markus.mustermann@gmx.at');
            expect(info.state).toBe('RF');
            expect(info.jwt).toBeDefined();
            done();
          }
        }
      });
    });
  });

  describe('POST /user/register', function() {
    it('check if login registration for user possible', function(done) {
      let body = JSON.stringify({ 'email': 'maxima.mustermann@mail.com', 'password' : 'maximamaxima', 'name': 'Max Mustermann', 'birthdate': new Date(10000000), 'gender': 'female', 'state': 'USER'});

      let options = {
        url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.user + urls.user_register,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      };

      request(options, function(err, response, body) {
        if(err){
          done(err);
        } else{
          let info = JSON.parse(body);
          if(!info.success){
            done('success = false');
          } else{
            expect(info.email).toBe('maxima.mustermann@mail.com');
            expect(info.state).toBe('USER');
            expect(info.jwt).toBeDefined();
            done();
          }
        }
      });
    });

    it('check if login registration for RF possible', function(done) {
      let body = JSON.stringify({ 'email': 'facility1@rf.com', 'password' : 'facility1', 'state': 'RF'});

      let options = {
        url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.user + urls.user_register,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      };

      request(options, function(err, response, body) {
        if(err){
          done(err);
        } else{
          let info = JSON.parse(body);
          if(!info.success){
            done('success = false');
          } else{
            expect(info.success).toBe(true);
            expect(info.message).toBe('rf_registered_successfully');
            done();
          }
        }
      });
    });
  });

  //afterEach with local scope
  afterEach(function (done) {
    done();
  });

});

