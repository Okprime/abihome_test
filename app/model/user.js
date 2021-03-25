import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone_number: {
        type: String,
    },
    password: {
        type: String,
    },
    },
    {
        timestamps: true,
    });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
