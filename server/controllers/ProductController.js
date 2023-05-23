import ProductModel from '../models/Product.js'


export const create = async (req, res) => {
    try {
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


export const getAll = async (req, res) => {
    try {
        const products = await ProductModel.find().populate(['user', 'type']).exec();

        res.json(products);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not get all products',
        });
    }
};


export const getAllByType = async (req, res) => {
    try {
        const typeId = req.params.type;
        const product = await ProductModel.find({ type: typeId }).populate(['user', 'type']).exec();
        if (!product || product.length == 0) {
            return res.status(404).json({
                message: 'Can not get products by type',
            });
        }
        res.json(product);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not get products by type',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({
                message: 'Can not get product by id',
            });
        }
        res.json(product);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not get product by id',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findOneAndRemove({ _id: productId });
        console.log(product);
        if (!product) {
            return res.status(404).json({
                message: 'Can find product',
            });
        }
        res.json(
            {
                success: true,
            }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not remove product',
        });
    }
};


export const update = async (req, res) => {
    try {

        const productId = req.params.id;
        const product = await ProductModel.updateOne(
            {
                _id: productId
            },
            {
                title: req.body.title,
                price: req.body.price,
                rating: req.body.rating,
                img: req.body.img,
                characteristic: req.body.characteristic,
                type: req.typeId,
                user: req.userId,
            }
        );
        if (!product) {
            return res.status(404).json({
                message: 'Can find product',
            });
        }
        res.json(
            {
                success: true,
            }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not update product',
        });
    }
};