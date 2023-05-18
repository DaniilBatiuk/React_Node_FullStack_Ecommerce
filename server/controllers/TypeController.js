import TypeModel from '../models/Type.js'


export const create = async (req, res) => {
    try {
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

export const getIdByName = async (req, res, next) => {
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

export const getAll = async (req, res) => {
    try {
        const types = await TypeModel.find();

        res.json(types);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not get types',
        });
    }
};


export const getOne = async (req, res) => {
    try {
        const typeId = req.params.id;
        const type = await TypeModel.findOne({ _id: typeId });
        if (!type) {
            return res.status(404).json({
                message: 'Can find type',
            });
        }
        res.json(type);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not get type',
        });
    }
};


export const remove = async (req, res) => {
    try {
        const typeId = req.params.id;
        const type = await TypeModel.findOneAndRemove({ _id: typeId });
        if (!type) {
            return res.status(404).json({
                message: 'Can find type',
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
            message: 'Can not remove type',
        });
    }
};


export const update = async (req, res) => {
    try {
        const typeId = req.params.id;
        const type = await TypeModel.updateOne(
            {
                _id: typeId
            },
            {
                name: req.body.name,
            }
        );
        if (!type) {
            return res.status(404).json({
                message: 'Can find type',
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
            message: 'Can not update type',
        });
    }
};
