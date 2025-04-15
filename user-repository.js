import dbLocal from "db-local";
import crypto from "node:crypto";
import bcrypt from "bcrypt";

const {Schema} = new dbLocal({path: './db'});

const User = Schema('User', {
    _id: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
})

export class UserRepository {

    static async create ({username, password}) {
        validaciones.username(username);
        validaciones.password(password);

        const user = User.findOne({username});
        if(user) throw new Error('username already exists');

        const passwordCrypted = await bcrypt.hash(password, 10);
        if(!passwordCrypted) throw new Error('password could not be encrypted');

        const userId = crypto.randomUUID();

        User.create({
            _id: userId, 
            username, 
            password: passwordCrypted}).save()
        return userId;
    }
    static async login ({username, password}) {
        validaciones.username(username);
        validaciones.password(password);

        const user = User.findOne({username});
        if(!user) throw new Error('username does not exist');
        
        const esValiodo = await bcrypt.compare(password, user.password);
        if(!esValiodo) throw new Error('password is incorrect');

        const {password: _, ...userData} = user;

        return userData;

    }
}

class validaciones {
    static username(username){
        if(typeof username !== 'string') throw new Error('username must be a string');
        if(username.length < 3) throw new Error('username must be at least 3 characters long');
    }

    static password(password){
        if(typeof password !== 'string') throw new Error('password must be a string');
        if(password.length < 6) throw new Error('password must be at least 6 characters long');
    }
}
