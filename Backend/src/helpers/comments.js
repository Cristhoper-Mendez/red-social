import { Comment, Image } from "../models";

module.exports = {
    async newest(){
        const comments = await Comment.find()
            .limit(4)
            .sort({timeStamp: -1})
        for (const comment of comments){
            const image = await Image.findOne({_id: comment.imageId});
            comment.image = image;
        }
        return comments
    }
}