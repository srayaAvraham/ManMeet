const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

// Our schema definition
const UserSchema = new Schema({
        username: {
            type: String, 
            lowercase: true, 
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            index: true
        },
        email: {
            type: String, 
            lowercase: true, 
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'], 
            index: true
        },
        password: {
            type: String, 
            required: true 
        }
});

UserSchema.statics.findByName = function(name, cb) {
    return this.find({ username: new RegExp(username, 'i') }, cb);
};

UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// We export the schema to use it anywhere else
module.exports = mongoose.model('User', UserSchema);