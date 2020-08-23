import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    imgId: String,
    userId: String,
    like: {
        default: false,
        type: Boolean
    }
});

module.exports = mongoose.model('Like', likeSchema);