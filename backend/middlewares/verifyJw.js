const verifyJwt = ( req, res, next ) => {
    const token = req.headers[ 'x-access-token' ];
    console.log( token );
    next();
}

module.exports = verifyJwt;