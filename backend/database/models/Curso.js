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

        id_profesor: {
            type: DataTypes.UUID,
            references: {
                model: 'Maestro',
                key: 'id'
            },
            allowNull: false
        },

        nrc: {
            type: DataTypes.STRING( 5 ),
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
        tableName: 'Curso',
        timestamps: true
    }

    const Curso = sequelize.define( 'Curso', cols, config );
    Curso.associate = modelos => {
        Curso.belongsToMany( modelos.Alumno, {
            as: 'alumnos_inscritos',
            through: 'ListaAlumnos',
            foreignKey: 'id_curso',
            otherKey: 'id_alumno',
            timestamps: false
        } );
    }
    

    return Curso;
}