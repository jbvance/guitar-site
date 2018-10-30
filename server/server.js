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
const { Brand } = require('./models/brand');
const { Wood } = require ('./models/wood');
const { Product } = require ('./models/product');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//======================================
//             PRODUCTS
//======================================

// BY ARRIVAL
app.get('/api/product/articles', (req, res) => {
    let order = req.query.order || 'asc';
    let sortBy = req.query.sortBy || '_id';
    let limit = parseInt(req.query.limit) || 100;
    
    Product.find()
    .populate('brand')
    .populate('wood')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec()
    .then(docs => res.status(200).send(docs))
    .catch(err => res.status(400).send(err));
});

// BY NUMBER SOLD

app.get('/api/product/articles_by_id', (req, res) => {
    let type = req.query.type;
    let items = req.query.id;
    if(type === "array") {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item =>  mongoose.Types.ObjectId(item));
    }

    Product.find({ _id: {$in:items}})
    .populate('brand')
    .populate('wood')
    .exec()
    .then(docs => res.status(200).send(docs))
    .catch(err => res.json({ success: false, err }));
});

app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);
    product.save()
    .then(article => {
        return res.status(200).json({
            success: true,
            article
        })
    })
    .catch(err => res.json({ success: false, err }))
});

//======================================
//             WOODS
//======================================
app.post('/api/product/wood', auth, admin, (req, res) => {
    const wood = new Wood(req.body);
    wood.save()
    .then(wood => {
        res.status(200).json({
            success: true,
            wood           
        })
    })
    .catch(err => res.json({success: false, err }));
})

app.get('/api/product/woods', (req, res) => {
    Wood.find()
    .then(woods => res.status(200).send(woods))
    .catch(err => res.status(400).send(err));
});

//======================================
//             BRANDS
//======================================

app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);
    brand.save()
    .then(doc => {
        return res.status(200).json(
            {success: true, 
                brand: doc
        })
    })
    .catch(err => res.json({success: false, err }));
});

app.get('/api/product/brands', (req, res) => {
    Brand.find()
    .then(brands => res.status(200).send(brands))
    .catch(err => res.status(400).send(err));
})

//======================================
//             USERS 
//======================================

app.get('/api/users/auth',auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
});

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(doc => {
        res.status(200).json({
            success: true,            
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

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user.id}, 
        {token: '' })
    .then(doc => {
        return res.status(200).send({ success: true});
    })
    .catch(err => {
        return res.json({ success: false, err });
    })
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});