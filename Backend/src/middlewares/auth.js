import jwt, { decode } from "jsonwebtoken";

const auth = (req, res, next) => {
    let token = req.get('token');
    
    if(token){
        jwt.verify(token, 'secret', (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message: 'Error de token',
                    err
                  })
            }
            req.user = decoded.data;
            next();
        });
    } else {
        req.user = null;
        next();
    }
}

module.exports = { auth };