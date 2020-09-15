import jwt, { decode } from "jsonwebtoken";

const verifyAuth = (req, res, next) => {
    //read headers
    let token = req.header('token');
    
    //revisar si hay token
    if(!token ){
        return res.status(401).json({
            mensaje: 'No hay token, permiso denegado'
        })
    }

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

}

module.exports = {verifyAuth}