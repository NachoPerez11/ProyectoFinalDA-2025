import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: String,
        hashedPassword: String,
        email: String,
        roles: Array,
        fullName: String
    });

export default mongoose.model('users', userSchema);