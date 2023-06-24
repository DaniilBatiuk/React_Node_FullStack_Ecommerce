import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js'


export const register = async (req, res) => {
    try {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
        });

        const user = await doc.save();


        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );


        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json([{ msg: "Error : email is already registered" }]);
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email }).populate('basket.product').exec();

        if (!user) {
            return res.status(404).json([{ msg: "Error : error in password or email" }]);
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);


        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json([{ msg: "Error : can not login" }]);
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).populate('basket.product').exec();

        if (!user) {
            return res.status(404).json({
                message: "User is not found",
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {
        return res.status(500).json({
            message: "No access",
        });
    }
};


export const addToBasket = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.basket.push({ product: req.body.id, quantity: req.body.quantity });
        await user.save();
        const userRes = await UserModel.findById(req.userId).populate('basket.product').exec();

        res.json(userRes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error adding basket",
        });
    }
};


export const updateBasket = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.basket.pull({ product: req.body.id });
        await user.save();
        const userRes = await UserModel.findById(req.userId).populate('basket.product').exec();

        res.json(userRes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating basket",
        });
    }
};

