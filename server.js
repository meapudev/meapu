var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var ejs = require("ejs");
var ejsMate = require("ejs-mate");
var flash = require("express-flash");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");

var config = require("./config/appConfig");
var mongoose = require("./config/mongoose");

var db = mongoose();
var app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: new MongoStore({url: config.database, autoReconnect: true})
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
   res.render("main/home");
});

app.use(require("./routes/userRoutes"));


app.use(express.static(__dirname + "/public"));

app.listen(config.port, function (err) {
    if(err) console.log("server connection error");

    console.log("server successfully connected");
});

