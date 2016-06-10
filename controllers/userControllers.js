var User = require("../models/user");
var passport = require("passport");
var passportConf = require("../config/passport");
var async = require("async");

exports.renderSignup = function (req, res, next) {
   if(req.user) return res.redirect("/");
    res.render("user/signup", {
        signupErrors: req.flash("signupError")
    });
};

exports.signup = function (req, res, next) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.profileImage = user.gravatar();
    User.findOne({email: req.body.email}, function (err, foundUser) {
        if(err) return next(err);
        
        if(foundUser){
            req.flash("signupError", "User with this email is already registered");
            return res.redirect("/signup");
        } else {

            user.save(function (err) {
                if(err) return next(err);
                req.logIn(user, function (err) {
                    if(err) return next(err);
                    return res.redirect("/");
                });
            })
        }
    });
};