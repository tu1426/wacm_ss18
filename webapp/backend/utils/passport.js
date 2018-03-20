let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    fs = require("fs"),
    CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE']));

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.secret;
  opts.passReqToCallback = true;
  passport.use(new JwtStrategy(opts, function(req, decoded, done) {
    if(!decoded) return done(null, false);
    if(decoded.id === 'admin'){
      done(null, true);
    } else{
      done(null, false);
    }
  }));
};

getToken = function (headers) {
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