const { v4: uuid } = require( 'uuid' );

const generateIdEjercicio = ( req, res, next ) => {
    req.id_ejercicio = uuid();
    next();
}

module.exports = generateIdEjercicio;