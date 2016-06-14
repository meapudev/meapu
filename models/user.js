var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var crypto = require("crypto");

var UserSchema = new Schema({
    firstName: {type: String, trim:true, required: true},
    lastName: {type: String, trim:true, required: true},
    email: {type: String, unique: true, required: true,
            match:[/.+\@.+\..+/, "please fill a valid email address"]
    },
    password: {type: String, required: true},
    phoneNumber: {type: String},
    gender: {type: String, enum: ["male", "female"]},
    address: {
        postalCode: {type: String},
        city: {type: String},
        country: {type: String}
    },
    dateOfBirth: {type: Date},
    review: {type: Schema.Types.ObjectId, ref: "Review"},
    favorite: {type: Schema.Types.ObjectId, ref: "Favorite"},
    message: {type: Schema.Types.ObjectId, ref: "Message"},
    profileImage: {type: String},
    currentLogin: {type: Date, default: Date.now()},
    lastLogin: {type: Date},
    currentIPAddress: {type: String},
    lastIPAddress: {type: String},
    skills: [{
        title: {type: String},
        desc: {type: String},
        image: [{type: Schema.Types.ObjectId, ref: "Gallery"}]
    }]
});

UserSchema.pre("save", function (next) {
    var user = this;

    if(!user.isModified("password")) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });

});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
}).set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.methods.gravatar = function (size) {
    if(!this.size) size = 200;
    if(!this.email) return "https://gravatar.com/avatar/?s" + size + "&d=retro";
    var md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return "https://gravatar.com/avatar/" + md5 + "?s=" + size + "&d=retro";
};

UserSchema.set("toJSON", {setters: true, virtuals: true});

module.exports = mongoose.model("User", UserSchema);

