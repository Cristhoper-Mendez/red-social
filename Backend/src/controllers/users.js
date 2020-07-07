import User from "../models/user";
import { Image } from "../models";
import bcrypt from "bcrypt";
const saltRounds = 10;
import { verifyAuth } from "../middlewares/authenticate";

const ctrl = {}

ctrl.createUsers = async (req, res) => {
    const body = req.body
    body.password = bcrypt.hashSync(req.body.password, saltRounds);
  
    try {
        const userDB = await User.create(body);
        res.json(userDB);
      
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      });
    }
}

ctrl.s = async (req, res) => {
    let a = 'asd'
    try {
        const usersDB = await User.find();
        res.json(usersDB);
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error',
            error
        })
    }
}

ctrl.profile = async (req, res) => {
    const userId = req.user._id;
    try {
        const postDB = await Image.find({userId})
        res.json(postDB)
    } catch (error) {
        return res.status(400).json({
                message: 'error',
                error
        })
    }
}


module.exports = ctrl