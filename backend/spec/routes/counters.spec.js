
let request = require('request'),
    urls = require('../../../config/urls'),
    CONFIG,
    fs = require("fs");

CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE']));


describe('wacm backend counter routes', function() {

  //beforeEach with local scope
  beforeEach(function (done) {
    done();
  });

  describe('GET /counter', function() {
    it('check if getting counter value works', function(done) {

      login('max.mustermann@gmx.at', 'maxmax', (err, jwt, email) => {

        let options = {
          url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.counter,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
          }
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
              expect(info.count).toBeDefined();
              done();
            }
          }
        });

      });
    });


    it('check if getting counter value fails without jwt', function(done) {
      let options = {
        url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.counter,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request(options, function(err, response, body) {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
  });

  describe('POST /counter', function() {
    it('check if incrementing counter value works', function(done) {

      login('max.mustermann@gmx.at', 'maxmax', (err, jwt, email) => {

        let count = 0;

        let options = {
          url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.counter,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
          }
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
              expect(info.count).toBeDefined();
              count = info.count;

              let options = {
                url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.counter,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': jwt
                }
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
                    expect(info.count).toBeDefined();
                    expect(info.count).toBe(count + 1);
                    done();
                  }
                }
              });
            }
          }
        });

      });
    });
  });

  //afterEach with local scope
  afterEach(function (done) {
    done();
  });

  let login = function(username, password, callback){
    let body = JSON.stringify({ 'username': username, 'password' : password});
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
        callback(err, null);
      } else{
        let info = JSON.parse(body);
        if(!info.jwt) console.error(info);
        callback(null, info.jwt, info.email);
      }
    });
  };

});

