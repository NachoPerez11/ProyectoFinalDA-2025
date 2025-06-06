import { getDependency } from '../libs/dependencies.js';

export class UserService {
    static async getSingleOrNullByUsername(username) {
        const UserModel = getDependency('UserModel');
        //console.log("busqueda: ", await UserModel.find({username: username}));
        //return await UserModel.find({username: username});
        return await UserModel.findOne({ username: username });
    }

    static async get(){
        const UserModel = getDependency('UserModel');
        return await UserModel.find();
    }
}