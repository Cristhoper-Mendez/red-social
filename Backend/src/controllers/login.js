import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

const ctrl = {}

ctrl.login = async (req, res) => {
    const body = req.body;
    try {
        const userDB = await User.findOne({email: body.email});
        if(!userDB){
            return res.status(400).json({
                message: 'User or password incorrect'
            });
        }

        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                message: 'User or password incorrect'
            });
        }

        let token = jwt.sign({
            data: userDB,
        }, 'secret', {expiresIn: 60*60*24*30} )

        return res.json({
            userDB,
            token: token
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Ocurrio un error',
            error
        });
    }
}

ctrl.s = (req, res) => {
    res.json({
        message: 'hola'
    })
}

module.exports = ctrl