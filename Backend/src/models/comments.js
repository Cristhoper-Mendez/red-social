import mongoose from "mongoose";
const { Schema } = mongoose;


const commentSchema = new Schema({
    email: String,
    name: String,
    avatar: {type: String, default: ''},
    comment: String,
    timeStamp: {type: Date, default: Date.now},
    imageId: String,
    fileName: String
});

module.exports = mongoose.model('Comment', commentSchema)