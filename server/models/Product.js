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
        required: false,
        default: 0
    },
    img: [{
        type: String,
        required: false
    }],
    characteristic: [{
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }],
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
});

export default mongoose.model('Product', ProductSchema);