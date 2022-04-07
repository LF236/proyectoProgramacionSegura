require('dotenv').config()
const sequelize = require('sequelize');
const generateDB = async() => {


        try {

            console.log('Generando Base de datos');
            // require('../database/models');
            // require('../database/models/IncProblematica').sequelize.sync();
            // require('../database/models/IncProblematica').sequelize.sync({ force: true });
            // require('../database/models/IncIncidencia').sequelize.sync({ force: true });               
            // require('../database/models/IncAsignacion').sequelize.sync({ force: true });
            // require('../database/models/IncIncidenciaHistorial').sequelize.sync({ force: true });
            // require('../database/models/IncArchivo').sequelize.sync({ force: true });
            // require('../database/models/IncComentario').sequelize.sync({ force: true });
            await require('./database/models').sequelize.sync({ force: true });
            console.log(true);


        }
        catch (err) {
            console.log( err );
            console.log(false);
        }


};

generateDB()
