var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/user");

passport.serializeUser(function (user, done) {
   done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById({_id: id}, function (err, user) {
     done(err, user);
  });
});

