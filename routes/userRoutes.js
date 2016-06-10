var router = require("express").Router();
var user = require("../controllers/userControllers");

module.exports = router;

router.route("/signup").get(user.renderSignup).post(user.signup);