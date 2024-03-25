const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 24
            }
        },
        season: {
            type: DataTypes.ENUM('Verano','Otoño','Invierno','Primavera'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}