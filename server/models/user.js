const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password)
    .then(isMatch => {
        cb(null, isMatch);
    })
    .catch(err => cb(err));
};

userSchema.methods.generateToken = function(cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
    user.token = token;
    user.save()
        .then(user => {
            cb(null, user);
        })
        .catch(err => cb(err))
};

userSchema.statics.findByToken = function(token, cb) {
    const user = this;
    jwt.verify(token, process.env.SECRET, function(err, decode) {
        user.findOne({ "_id": decode, "token": token })
            .then(user => {
                cb(null, user);
            })
            .catch(err => cb(err));
    })
}

const User = mongoose.model('User', userSchema);
module.exports = {
    User
};