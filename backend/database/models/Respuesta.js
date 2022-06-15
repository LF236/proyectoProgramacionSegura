module.exports = ( sequelize, DataTypes ) => {
    const cols = {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false            
        },
        
        id_ejercicio: {
            type: DataTypes.UUID,
            references: {
                model: 'Ejercicio',
                key: 'id'
            },
            allowNull: false
        },

        id_alumno: {
            type: DataTypes.UUID,
            references: {
                model: 'Alumno',
                key: 'id'
            },
            allowNull: false
        },

        resultado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }        
    }

    const config = {
        tableName: 'Respuesta',
        timestamps: true
    }

    const Respuesta = sequelize.define( 'Respuesta', cols, config );

    Respuesta.associate = modelos => {
        Respuesta.belongsTo( modelos.Ejercicio, {
            as: 'RespuestaAlumno',
            foreignKey: 'id'
        } )
    }

    return Respuesta;
}