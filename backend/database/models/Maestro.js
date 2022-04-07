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
        tableName: 'Maestro',
        timestamps: true
    }

    const Maestro = sequelize.define( 'Maestro', cols, config );
    return Maestro;
}