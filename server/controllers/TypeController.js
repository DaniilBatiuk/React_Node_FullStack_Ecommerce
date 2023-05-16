import { validationResult } from 'express-validator'

import TypeModel from '../models/Type.js'


export const create = async (req, res) => {
    try {
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

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not create type',
        });
    }
};

export const getIdByName = async (req, res,next) => {
    try {
        const name = req.body.type;
        const type = await TypeModel.findOne({ name });
        if (!type) {
            return res.status(404).json({ message: 'Type not found' });
        }

        req.typeId = type._id;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error finding type by name' });
    }
};