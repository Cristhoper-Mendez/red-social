import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema ({
    title: {type: String},
    description: {type: String},
    fileName: {type: String},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    timeStamp: {type: Date, default: Date.now},
    userId: String
});

module.exports = mongoose.model('Image', imageSchema)