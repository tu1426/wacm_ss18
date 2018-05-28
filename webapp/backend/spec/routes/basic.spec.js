let request = require('request'),
    urls = require('../../../config/urls'),
    CONFIG,
    fs = require("fs");

CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE']));

describe('basic tests', function() {
  describe('simple', function() {
    it('should simply pass', function(done) {
      expect(1).toBe(1);
      done();
    });
  });
});
