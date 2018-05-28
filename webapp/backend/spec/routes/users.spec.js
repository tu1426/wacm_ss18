
let request = require('request'),
    urls = require('../../../config/urls'),
    CONFIG,
    fs = require("fs"),
    User = require('../../models/user');

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

