var mongoose = require("mongoose");
var config = require("./appConfig");

module.exports = function () {
   var db = mongoose.connect(config.database, function (err) {
       if(err) console.log("database connection error");

       console.log("database connected successfully");
   });

    return db;
};
