import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    uuid: String,
    username: String,
    hashedPassword: String,
    email: String,
    roles: Array,
    fullName: String
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
