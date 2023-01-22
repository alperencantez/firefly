const bcrypt = require('bcrypt');
import mongoose from 'mongoose';
const { Schema } = mongoose;

interface IUser {
    name: String;
    handle: String;
    email: String;
    password: String;
}

const schemaUser = new Schema<IUser>(
    {
        name: String,
        handle: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: String,
    },
    { timestamps: true }
);

schemaUser.pre<IUser>('save', function (next) {
    bcrypt.hash(this.password, 10, (err: Error, hash: String) => {
        if (err) {
            throw err;
        } else {
            this.password = hash;
            next();
        }
    });
});

const User = mongoose.model<IUser>('user', schemaUser, 'user');
export default User;
