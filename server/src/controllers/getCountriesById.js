const { Country } = require('../db')

const getCountriesById = async(id) =>{
    const countryById = await Country.findOne({
        where: {id: id}
    });
    
    console.log(id);

    if(!countryById) throw new Error('No se encuentra un país con ese ID')

    return countryById;
}


module.exports = getCountriesById;