import jwt, { decode } from "jsonwebtoken";

const verifyAuth = (req, res, next) => {
    //read headers
    let token = req.get('token');
    
    jwt.verify(token, 'secret', (err, decoded) => {
        if(err){
            return res.status(401).json({
                message: 'Error de token',
                err
              })
        }
        req.user = decoded.data;
        next();
    })

}

module.exports = {verifyAuth}