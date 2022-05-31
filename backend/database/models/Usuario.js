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

        apellidoPaterno: {
            type: DataTypes.STRING( 100 ),
            allowNull: false
        },

        apellidoMaterno: {
            type: DataTypes.STRING( 100 ),
            allowNull: false
        },

        correo: {
            type: DataTypes.STRING( 250 ),
            allowNull: false
        },

        matricula: {
            type: DataTypes.STRING( 50 ),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING( 250 )
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
        tableName: 'Usuario',
        timestamps: true
    }

    const Usuario = sequelize.define( 'Usuario', cols, config );
    Usuario.associate = modelos => {
        Usuario.hasOne( modelos.Alumno, {
            as: 'alumno_usuario',

            foreignKey: {
                name: 'id_usuario',
                allowNull: false
            },
            onDelete: 'CASCADE'
        } )
    }
    return Usuario;
}