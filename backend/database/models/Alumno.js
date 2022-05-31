module.exports = ( sequelize, DataTypes ) => {
    const cols = {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false
        },

        id_usuario: {
            type: DataTypes.UUID,
            references: {
                model: 'Usuario',
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
        tableName: 'Alumno',
        timestamps: true
    }

    const Alumno = sequelize.define( 'Alumno', cols, config );
    // Alumno.associate = modelos => {
    //     Alumno.hasOne( modelos.Usuario, {
    //         as: 'alumno_usuario',
    //         foreignKey: {
    //             allowNull: false,
    //             name: 'id'
    //         }
    //     } );
    // }
    return Alumno;
}