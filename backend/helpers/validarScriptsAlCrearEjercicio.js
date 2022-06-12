const path = require('path');
const fs = require('fs');
const util = require( 'util' );
const exec = util.promisify(require('child_process').exec);

const validarScriptsAlCrearEjercicio = async ( id_ejercicio ) => {
    const listaErrores = [];
    const path_ejercicio = path.join( __dirname + '/../' + 'files/ejercicios/' + id_ejercicio );
    if (fs.existsSync( `${ path_ejercicio }/testing` )) {
        fs.rmSync( `${ path_ejercicio }/testing`, { recursive: true, force: true } );
    }
    fs.mkdirSync( `${ path_ejercicio }/testing` );

    // Copiar los Scrips que se van a ejecutar para comprobar que no son ciclos u inyección
    fs.copyFileSync( `${ path_ejercicio }/script_comprobacion_final.sh`, `${ path_ejercicio }/testing/script_comprobacion_final.sh` );
    fs.copyFileSync( `${ path_ejercicio }/script_inicializacion.sh`, `${ path_ejercicio }/testing/script_inicializacion.sh` );

    // Damos permisos a la carpeta de testing
    try {
        const { stdout, stderr } = await exec( `chmod -R 777 ${ path_ejercicio }/testing/*`, { cwd: `${ path_ejercicio }/testing`, timeout: 5000 }, )
    }
    catch( err ) {
        listaErrores.push( 'Error, contacte al administrador' );
    }
    // Ejecutar script de inicializacion
    try {
        const { stdout, stderr } = await exec( `"${ path_ejercicio }/testing/script_inicializacion.sh"`, { cwd: `${ path_ejercicio }/testing`, timeout: 5000 }, )
    }
    catch( err ) {
        listaErrores.push( 'Error al ejecutar el Script de inicialización, tiempo de ejecución excedido' );
    }

    // Ejecutar script de estado final
    try {
        const { stdout, stderr } = await exec( `"${ path_ejercicio }/testing/script_comprobacion_final.sh"`, { cwd: `${ path_ejercicio }/testing`, timeout: 5000 }, )
    }
    catch( err ) {
        listaErrores.push( 'Error al ejecutar el Script de inicialización, tiempo de ejecución excedido' );
    }

    fs.rmSync( `${ path_ejercicio }/testing`, { recursive: true, force: true } );
    // console.log( `${ path_ejercicio }`.blue );
    return listaErrores;
}

module.exports = validarScriptsAlCrearEjercicio;