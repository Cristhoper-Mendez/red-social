import { Image } from "../models";

module.exports = {
    async popular(){
        const Images = await Image.find()
            .limit(3)
            .sort({likes: -1});
        return Images;
    }
};