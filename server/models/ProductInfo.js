import mongoose from 'mongoose';

const ProductInfoSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }
);

export default mongoose.model('ProductInfo', ProductInfoSchema);