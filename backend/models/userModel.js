import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    hashedPassword: String,
    email: String,
    roles: Array,
    fullName: String
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
