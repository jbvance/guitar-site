const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const { User } = require('./models/user');

//======================================
//             USERS 
//======================================
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(doc => {
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
    .catch(err => res.json({ success: false, err }));
});

app.post('/api/users/login', (req, res) => {
   User.findOne({ 'email': req.body.email}, (err, user) => {  
    if (!user) return res.json({ loginSuccess: false, message: 'Auth failed, email not found'});
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess: false, message: "Invalid Credentials"});

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                });
            })
        })
   })
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});