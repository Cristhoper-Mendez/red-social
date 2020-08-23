import { Image } from "../models";
import sidebar from "../helpers/sidebar";
const ctrl = {};

ctrl.index = async (req, res) => {
    let viewModel = {images: []}
    try {
        const imagesDB = await Image.find().sort({timeStamp: -1});
        viewModel.images = imagesDB;
        viewModel = await sidebar(viewModel)
        res.json(viewModel)
        // console.log(viewModel);
        
    } catch (error) {
        return res.status(400).json({
            message: 'Ocurrio un error',
            error
        })
    }

}

module.exports = ctrl;