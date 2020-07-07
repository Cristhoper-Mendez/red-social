import { Image, Comment } from "../models";
const ctrl = {};

ctrl.index = async (req, res) => {
    const _id = req.params.image_id;
    try {
        const postDB = await Image.findOne({_id})

        postDB.views = postDB.views + 1;
        await postDB.save();

        const commentDB = await Comment.find({imageId: _id})
        res.json({postDB, commentDB})
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error',
            error
        })
    }
}

ctrl.createPost =  async  (req, res) => {
    const body = req.body;
    body.userId = req.user._id

    try {
        const postDB = await Image.create(body);
        res.status(200).json(postDB);
        // console.log(postDB);
        
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error',
            error
        })
    }
}

ctrl.like = async (req, res) => {
    const _id = req.params.image_id;

    const postDB = await Image.findOne({_id})
    try {
        postDB.likes = postDB.likes + 1;
        await postDB.save();
        res.json(postDB.likes)
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error',
            error
        })
    }
}

ctrl.comment =  async (req, res) => {
    const _id = req.params.image_id;
    
    const body = req.body
    
    body.userId = req.user._id
    body.email = req.user.email
    body.name = req.user.name
    body.avatar = req.user.avatar
    body.imageId = _id
    
    try {
        const postDB = await Image.findOne({_id});
        
        if(postDB){
            const commentDB = await Comment.create(body)
            res.json(commentDB)
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error',
            error
        })
    }
    
}

ctrl.deleteImg = async (req, res) => {
    const _id = req.params.image_id

    try {
        const postDB = await Image.findOne({_id});
        await Comment.deleteOne({imageId: postDB._id});
        await postDB.remove();
        res.json({message: 'deleted!'})
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error',
            error
        })
    }
    
}

module.exports = ctrl;