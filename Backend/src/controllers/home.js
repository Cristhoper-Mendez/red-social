import { Image } from "../models";
import sidebar from "../helpers/sidebar";
const ctrl = {};

ctrl.index = async (req, res) => {
  try {
    const imagesDB = await Image.find().sort({ timeStamp: -1 });
    res.json(imagesDB);
  } catch (error) {
    return res.status(400).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

ctrl.stats = async (req, res) => {
  try {
    let stats = await sidebar();
    res.json(stats);
  } catch (error) {
    return res.status(400).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

module.exports = ctrl;
