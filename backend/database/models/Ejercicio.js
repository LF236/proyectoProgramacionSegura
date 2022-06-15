module.exports = ( sequelize, DataTypes ) => {
    const cols = {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false            
        },

        nombre: {
            type: DataTypes.STRING( 100 ),
            allowNull: false
        },

        descripcion: {
            type: DataTypes.STRING( 500 ),
            allowNull: false
        },

        directorio_archivos: {
            type: DataTypes.STRING( 500 ),
            allowNull: false
        },

        entradas_prueba: {
            type: DataTypes.JSON,
            allowNull: false
        },

        entradas_salida: {
            type: DataTypes.JSON,
            allowNull: false
        },

        id_curso: {
            type: DataTypes.UUID,
            references: {
                model: 'Curso',
                key: 'id'
            },
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
        tableName: 'Ejercicio',
        timestamps: true
    }
    
    const Ejercicio = sequelize.define( 'Ejercicio', cols, config );

    Ejercicio.associate= modelos => {
        Ejercicio.hasMany( modelos.Respuesta, {
            as: 'RespuestaAlumno',
            foreignKey: 'id_ejercicio'
        });
    }

    return Ejercicio;
}