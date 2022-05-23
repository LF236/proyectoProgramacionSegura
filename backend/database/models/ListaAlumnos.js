module.exports = ( sequelize, DataTypes ) => {
    const cols = {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
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

        id_alumno: {
            type: DataTypes.UUID,
            references: {
                model: 'Alumno',
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
        tableName: 'ListaAlumnos',
        timestamps: true
    }

    const ListaAlumnos = sequelize.define( 'ListaAlumnos', cols, config );
    return ListaAlumnos;
}