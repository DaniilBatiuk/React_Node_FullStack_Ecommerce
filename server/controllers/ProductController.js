import { validationResult } from 'express-validator'

import ProductModel from '../models/Product.js'


export const create = async (req, res) => {
    try {
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
            characteristic: req.body.characteristic,
            type: req.typeId,
            user: req.userId,
        });

        const product = await doc.save();

        res.json(product);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not create product',
        });
    }
};