import mongoose from 'mongoose';

const TypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model('Type', TypeSchema);