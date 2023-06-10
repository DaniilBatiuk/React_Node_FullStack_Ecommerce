import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    basket: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }],
        default: [],
        required: true
    },
},
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);