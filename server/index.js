import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator'
import dotenv from 'dotenv';
dotenv.config();

import { productCreateValidation, typeCreateValidation, registerValidation, loginValidation } from './validations.js';

import TypeModel from './models/Type.js'
import ProductModel from './models/Product.js'
import UserModel from './models/User.js'

import checkAuthMiddleware from './middleware/checkAuthMiddleware.js'

import User from './models/User.js';

import * as UserController from './controllers/UserController.js'
import * as ProductController from './controllers/ProductController.js'
import * as TypeController from './controllers/TypeController.js'

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGOOSE_CONNECTION)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());


app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuthMiddleware, UserController.getMe);


//app.get('/type', TypeController.getAll);
//app.get('/type/:id', TypeController.getOne);
app.post('/type', checkAuthMiddleware, typeCreateValidation, TypeController.create);
//app.delete('/type/:id', TypeController.remove);
//app.patch('/type', TypeController.update);


//app.get('/product', productCreateValidation,ProductController.getAll);
//app.get('/product/:id', productCreateValidation,ProductController.getOne);
app.post('/product', checkAuthMiddleware, TypeController.getIdByName, productCreateValidation, ProductController.create);
//app.delete('/product:id', productCreateValidation,ProductController.remove);
//app.patch('/product', productCreateValidation,ProductController.update);










const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
    }
    catch (err) {
        console.log(err);
    }
}

start();
