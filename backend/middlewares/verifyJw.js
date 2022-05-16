const jwt = require( 'jsonwebtoken' );
const verifyJwt = ( req, res, next ) => {
    const token = req.headers[ 'x-access-token' ];
    
    if( !token ) {
        return res.status( 403 ).send({
            auth: false,
            message: 'Token no enviado'
        });
    }
    
    jwt.verify( token, 'jswSecretFirma', ( err, decoded ) => {
        if( err ) {
            return res.status( 401 ).send({
                auth: false,
                message: 'Token invalido'
            });
        }
        req.userId = decoded.id;
        next();
    })
    
}

module.exports = verifyJwt;