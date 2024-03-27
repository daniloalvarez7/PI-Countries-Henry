const { countries } = require('../../api/db.json')
const { Country } = require('../db')

module.exports = async () => {
    for (const country of countries) {
      const id = country.cioc ?? country.cca3;
  
      const existingCountry = await Country.findOne({
        where: {
          id,
        }
      })
  
      if(!existingCountry){
      const name = country.name.common;
      const flag_image = country.flags.png;
      const continent = country.continents[0];
      const capital = country.capital?.length ? country.capital[0]: 'null';
      const subregion = country.subregion;
      const area = country.area;
      const population = country.population;
  
        await Country.create({
            id,
            name,
            flag_image,
            continent,
            capital,
            subregion,
            area,
            population,
          });
        };
      };
    }