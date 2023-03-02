import { ObjectId } from 'mongoose';

declare interface IUserBytes {
    _id: ObjectId;
    content: String;
    author: String;
    comments: Array<Object>;
    createdAt: String;
}

declare interface Credentials {
    handleOrEmail: string;
    password: string;
}

declare interface IUser {
    displayName: String;
    handle: String;
    email: String;
    password: String;
}

module.exports = {
    IUserBytes,
    Credentials,
    User,
};
