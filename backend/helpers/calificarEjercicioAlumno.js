const path = require( 'path' );
const fs = require( 'fs' );
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { getInfoEjercicioDb } = require( './consultasAlumnos' );

const limpiarEntornoAlumno = ( ruta_absoluta ) => {
    if (fs.existsSync(`${ruta_absoluta}/tmp`)) {
        fs.rmSync(`${ruta_absoluta}/tmp`, { recursive: true, force: true });
    }
}

const calcularCalificacion = ( resultado, limite ) => {
    let res = ( resultado * 10 ) / limite;
    return res;
}

const crearEntornoDeEjecucionAlumno = (ruta_absoluta) => {
    if (fs.existsSync(`${ruta_absoluta}/execute`)) {
        fs.rmSync(`${ruta_absoluta}/execute`, { recursive: true, force: true });
    }
    fs.mkdirSync(`${ruta_absoluta}/execute`);
}

const darPermisosDeEjecucion = (ruta) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log( ruta );
            await exec(`chmod -R 777 ${ruta}/*`)
            resolve(true);
        }
        catch (err) {
            console.log( err );
            reject(false);
        }
    });
}

const limpiarEntornoDeEjecucion = (ruta_absoluta) => {
    if (fs.existsSync(`${ruta_absoluta}/execute`)) {
        fs.rmSync(`${ruta_absoluta}/execute`, { recursive: true, force: true });
    }
    // Agregar la parte de eliminar el Script del alumno
}

const ejecutarSinEstadoFinal = async ( ruta_absoluta, entradas, salidas ) => {
    let count = 0;
    crearEntornoDeEjecucionAlumno(ruta_absoluta);
    await darPermisosDeEjecucion(ruta_absoluta);

    try {
        await exec(`${ruta_absoluta}/script_comprobacion_parametros.sh ${ruta_absoluta}/tmp/script_alumno_tmp.sh`, {
            cwd: `${ruta_absoluta}/execute`,
            timeout: 5000
        })
        count += 1;
    }
    catch (err) {
        console.log('Error de parámetros')
    }

    try {
        await exec(`${ruta_absoluta}/script_inicializacion.sh`, {
            cwd: `${ruta_absoluta}/execute`,
            timeout: 5000
        })
    }
    catch (err) {
        console.log(err);
        console.log('Error al ejecutar el script de inicialización')
    }

    let entradasLimpias = entradas.join(' ');
    try {
        let { stdout, stderr } = await exec(`${ruta_absoluta}/tmp/script_alumno_tmp.sh ${entradasLimpias}`, {
            cwd: `${ruta_absoluta}/execute`,
            timeout: 5000
        });
        stdout = stdout.replace(/(\r\n|\n|\r)/gm, '');
        // Si la salida es igual a la esperada, le damos el punto
        let salidaLimpia = salidas.join(' ');
        if (stdout == salidaLimpia) count += 1;
    }
    catch (err) {
        console.log(err);
        console.log('Error al ejecutar el script del alumno')
    }

    limpiarEntornoDeEjecucion(ruta_absoluta);
    return count;
}

const ejecutarConEstadoFinal = async ( ruta_absoluta, entradas, salidas ) => {
    let count = 0;
    crearEntornoDeEjecucionAlumno(ruta_absoluta);
    await darPermisosDeEjecucion(ruta_absoluta);
    try {
        await exec(`${ruta_absoluta}/script_comprobacion_parametros.sh ${ruta_absoluta}/tmp/script_alumno_tmp.sh`, {
            cwd: `${ruta_absoluta}/execute`,
            timeout: 5000
        })
        count += 1;
    }
    catch( err ) {
        console.log( 'Error de parámetros' );
    }

    crearEntornoDeEjecucionAlumno( ruta_absoluta );
    try {
        await exec(`${ruta_absoluta}/script_inicializacion.sh`, {
            cwd: `${ruta_absoluta}/execute`,
            timeout: 5000
        })
    }
    catch (err) {
        console.log(err);
        console.log('Error al ejecutar el script de inicialización')
    }

    let entradasLimpias = entradas.join(' ');
    try {
        let { stdout, stderr } = await exec(`${ruta_absoluta}/tmp/script_alumno_tmp.sh ${entradasLimpias}`, {
            cwd: `${ruta_absoluta}/execute`,
            timeout: 5000
        });
        count += 1;
    }
    catch (err) {
        console.log(err);
        console.log('Error al ejecutar el script del alumno')
    }

    // Ejecutamos el script de comprobación final
    try {
        let { stdout, stderr } = await exec( `${ ruta_absoluta }/script_comprobacion_final.sh`, {
            cwd: `${ruta_absoluta}/execute`,
            timeout: 5000
        } );
        stdout = stdout.replace(/(\r\n|\n|\r)/gm, '');
        let salidaLimpia = salidas.join(' ');
        if (stdout == salidaLimpia) count += 1;
    }
    catch( err ) {
        console.log( 'Fallo Todo :/' );
    }

    limpiarEntornoDeEjecucion( ruta_absoluta );
    return count;

}
const calificarEjercicioAlumno = ( id_ejercicio ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            let infoEjercicio = await getInfoEjercicioDb( id_ejercicio );
            let entradas = JSON.parse( infoEjercicio.entradas_prueba );
            entradas = entradas[ 0 ];
            let salidas = JSON.parse( infoEjercicio.entradas_salida );
            
            const ruta_absoluta = path.resolve( __dirname, `../files/ejercicios/${ id_ejercicio }` );
            if ( fs.existsSync( `${ruta_absoluta}/script_comprobacion_final.sh` ) ) {
                let res = await ejecutarConEstadoFinal( ruta_absoluta, entradas, salidas );
                let calificacion = calcularCalificacion( res, 3 );
                limpiarEntornoAlumno( ruta_absoluta );
                resolve( calificacion );
            } else {
                let res = await ejecutarSinEstadoFinal( ruta_absoluta, entradas, salidas );
                let calificacion = calcularCalificacion( res, 2 );
                limpiarEntornoAlumno( ruta_absoluta );
                resolve( calificacion );
            }
            
        }   
        catch( err ) {
            console.log( err );
            reject( false );
        }
    } )
}

module.exports = calificarEjercicioAlumno;