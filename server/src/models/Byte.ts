import mongoose from 'mongoose';
const { Schema } = mongoose;

const schemaByte = new Schema(
    {
        content: String,
        author: String,
        authorDisplayName: String,
        replyingTo: mongoose.Types.ObjectId,
        media: { type: String, default: null },
        comments: { type: Array, default: [] },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        createdAt: String,
    },
    { timestamps: true }
);

export const Byte = mongoose.model('post', schemaByte, 'post');
