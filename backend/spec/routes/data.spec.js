
let request = require('request'),
    urls = require('../../../config/urls'),
    CONFIG,
    fs = require("fs");

CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE']));


describe('wacm backend data routes', function() {

  //beforeEach with local scope
  beforeEach(function (done) {
    done();
  });

  describe('GET /data', function() {
    it('check if getting data works', function(done) {

      login('max.mustermann@gmx.at', 'maxmax', (err, jwt, email) => {

        let options = {
          url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.data + '/data',
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
              expect(info.data).toBeDefined();
              done();
            }
          }
        });

      });
    });

    it('check if getting data fails without jwt', function(done) {
      let options = {
        url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.data + '/data',
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

  describe('POST /newData', function() {
    it('check if creating data works', function (done) {

      login('max.mustermann@gmx.at', 'maxmax', (err, jwt, email) => {

        let dataCount = 0;

        let options = {
          url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.data + '/data',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
          }
        };

        request(options, function (err, response, body) {
          if (err) {
            done(err);
          } else {
            let info = JSON.parse(body);
            if (!info.success) {
              done('success = false');
            } else {
              expect(info.success).toBe(true);
              expect(info.data).toBeDefined();
              dataCount = info.data.length;


              let body = JSON.stringify({
                'title': 'TestData',
                'description': 'This is a data sample for testing',
                'image': 'www.image.com/goodImage',
                'tags': ['testtag1', 'testtag2']
              });
              let options = {
                url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.data + '/newData',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': jwt
                },
                body: body
              };

              request(options, function (err, response, body) {
                if (err) {
                  done(err);
                } else {
                  let info = JSON.parse(body);
                  if (!info.success) {
                    done('success = false');
                  } else {
                    expect(info.success).toBe(true);
                    expect(info.message).toBe('data_saved_successfully');

                    let options = {
                      url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.data + '/data',
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt
                      }
                    };

                    request(options, function (err, response, body) {
                      if (err) {
                        done(err);
                      } else {
                        let info = JSON.parse(body);
                        if (!info.success) {
                          done('success = false');
                        } else {
                          expect(info.success).toBe(true);
                          expect(info.data).toBeDefined();
                          expect(info.data.length).toBe(dataCount + 1);
                          done();
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });

      });
    });



    it('check if creating data fails without jwt', function (done) {
      let body = JSON.stringify({
        'title': 'TestData',
        'description': 'This is a data sample for testing',
        'image': 'www.image.com/goodImage',
        'tags': ['testtag1', 'testtag2']
      });
      let options = {
        url: 'https://' + CONFIG.test_host + ':' + CONFIG.secure_port + urls.api + urls.data + '/newData',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      };

      request(options, function (err, response, body) {
        expect(response.statusCode).toBe(401);
        done();
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

