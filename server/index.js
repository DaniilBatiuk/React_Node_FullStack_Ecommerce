import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator'
import dotenv from 'dotenv';
dotenv.config();

import { productValidation, typeValidation, productInfoValidation, registerValidation } from './validations.js';

import TypeModel from './models/Type.js'
import ProductModel from './models/Product.js'
import ProductInfoModel from './models/ProductInfo.js'
import UserModel from './models/User.js'

import checkAuth from './utils/checkAuth.js'
import User from './models/User.js';

import * as UserController from './controllers/UserController.js'

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGOOSE_CONNECTION)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());


app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);


app.post('/product/type', typeValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json(errors.array());
    }

    const doc = new TypeModel({
        name: req.body.name,
    });

    const type = await doc.save();

    res.json(type);
});

app.post('/product/product', productValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json(errors.array());
    }

    const doc = new ProductModel({
        title: req.body.title,
        price: req.body.price,
        rating: req.body.rating,
        img: req.body.img,
        type: req.body.type,
    });

    const type = await doc.save();

    res.json(type);
});


app.post('/product/productInfo', productInfoValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json(errors.array());
    }

    const doc = new ProductInfoModel({
        product_id: req.body.product_id,
        title: req.body.title,
        description: req.body.description,
    });

    const type = await doc.save();

    res.json(type);
});




const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
    }
    catch (err) {
        console.log(err);
    }
}

start();
