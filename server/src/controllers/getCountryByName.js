const { Country } = require('../db')
const { Op } = require('sequelize');

const getCountryByName = async(name) => {
    const country = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    return country;
};

module.exports = getCountryByName;