const { v4: uuid } = require( 'uuid' );
const db = require( '../database/models' );
const obtenerListaDeCursos = idUsuario => {
    return new Promise( async ( resolve, reject ) => {
        try {
            // Obtener id_maestro
            let id_maestro = await db.Maestro.findOne( { raw: true, where: { id_usuario: idUsuario }, attributes: [ 'id' ] } );
            id_maestro = id_maestro.id;
            // Obtener la lista de cursos con base al id del maestro
            let lista_cursos = await db.Curso.findAll( { raw: true, where: { id_profesor: id_maestro } } );
            resolve( lista_cursos );
        }
        catch {
            reject( false );
        }
    } );
}

const obtenerIdMaestro = id_usuario => {
    return new Promise( async ( resolve, reject ) => {
        try{
            // Obtener id_maestro
            let id_maestro = await db.Maestro.findOne( { raw: true, where: { id_usuario: id_usuario }, attributes: [ 'id' ] } );
            id_maestro = id_maestro.id;
            resolve( id_maestro );
        }
        catch {
            reject( false );
        }
    });
}

const storageCursoDB = ( id_maestro, data ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            // Guardamos la info en la base de datos
            await db.Curso.create({
                id: uuid(),
                nombre: `${ data.nombre }`.toUpperCase(),
                descripcion: `${ data.descripcion }`.toUpperCase(),
                id_profesor: id_maestro,
                nrc: `${ data.nrc }`.toUpperCase(),
            });
            resolve( true );
        }
        catch {
            reject( false );
        }
    } );
}

const listaAlumnos = () => {
    return new Promise(  async ( resolve, reject ) => {
        try {
            let listaUsuarios = await db.Usuario.findAll({
                raw: true,
                include: [ 'alumno_usuario' ]
            });
            listaUsuarios = listaUsuarios.filter( user => user[ 'alumno_usuario.id' ] != null );
            resolve( listaUsuarios );
        }
        catch(err) {
            console.log( err );
            reject( false );
        }
    });
}

const updateCursoDb = ( id_curso, data ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            console.log( data );
            await db.Curso.update(
                data,
                { where: { id: id_curso } },
            );
            resolve( true );
        }
        catch( err ) {
            reject( err );
        }
    } );
}

const inscribirAlumnos = ( id_curso, arrIdsListaAlumnos ) => {
    return new Promise( ( resolve, reject ) => {
        try {
            console.log( arrIdsListaAlumnos );
            const arr_promesas_inscribir_alumnos = [];
            arrIdsListaAlumnos.map( id_alumno => {
                arr_promesas_inscribir_alumnos.push(
                    db.ListaAlumnos.create({
                        id: uuid(),
                        id_curso: id_curso,
                        id_alumno:  id_alumno
                    })
                );
            } )
            Promise.all( arrIdsListaAlumnos )
            .then( res => {
                resolve( true );
            } )
            .catch(err => {
                console.log( err );
            })
            
        }
        catch( err ) {
            reject( false );
        }
    } )
}

const obtenerInfoCurso = ( id_curso ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            let cursoInfo = await db.Curso.findByPk( id_curso, {
                raw: true,
                attributes: [ 'descripcion', 'nombre', 'nrc' ]

            } );
            resolve( cursoInfo );
        }
        catch( err  ){
            reject( false );
        }
    })
}

const listaAlumnosInscritos = ( id_curso ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            let listaAlumnosInscritos = await db.Alumno.findAll({
                raw: true,
                where: { '$alumnos_inscritos.ListaAlumnos.id_curso$' : id_curso },
                include: [ 'alumnos_inscritos' ],
                attributes: [ 'id_usuario' ]
                // where: { 'alumnos_inscritos.ListaAlumnos.id_curso': id_curso }
            });
            let arrPromesasBuscarInfoUsuario = [];
            listaAlumnosInscritos.forEach( alumno => {
                arrPromesasBuscarInfoUsuario.push(
                    db.Usuario.findOne({
                        where: {
                            id: alumno.id_usuario
                        },
                        raw: true
                    })
                )
            } );
            Promise.all( arrPromesasBuscarInfoUsuario )
            .then( res => {
                resolve( res );
            } )
            
        }
        catch( err ){
            console.log( err );
            reject( false );
        }
    } );
}

module.exports = {
    obtenerListaDeCursos,
    obtenerIdMaestro,
    storageCursoDB,
    listaAlumnos,
    obtenerInfoCurso,
    listaAlumnosInscritos,
    updateCursoDb,
    inscribirAlumnos
}