import { Comment, Image } from "../models";

async function imagesCounter(){
    return await Image.countDocuments();
}

async function commentsCounter(){
    return await Comment.countDocuments();
}

async function viewsCounter(){
    const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}]);
    return result[0].viewsTotal;
}

async function totalLikes(){
    const result = await Image.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}]);
    return result[0].likesTotal;
}

module.exports = async () => {

    const results = await Promise.all([
        imagesCounter(),
        commentsCounter(),
        viewsCounter(),
        totalLikes()
    ])

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}