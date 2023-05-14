import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    img: [{
        type: String,
        required: false
    }],
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    }
});

export default mongoose.model('Product', ProductSchema);