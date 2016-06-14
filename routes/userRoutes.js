var router = require("express").Router();
var user = require("../controllers/userControllers");

module.exports = router;

router.route("/signup").get(user.renderSignup).post(user.signup);
router.route("/login").get(user.renderLogin).post(user.login);
router.route("/profile").get(user.renderProfile);
router.route("/logout").get(user.logout);