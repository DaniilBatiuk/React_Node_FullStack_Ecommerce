import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator'
import dotenv from 'dotenv';
dotenv.config();

import { productValidation, typeValidation, productInfoValidation } from './validations.js';

import TypeModel from './models/Type.js'




const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGOOSE_CONNECTION)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

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

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
    }
    catch (err) {
        console.log(err);
    }
}

start();
