const {Activity} = require('../db')

const createActivity = async (name, countryIDs, difficulty, duration, season) => {
    try {
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });

        let countriesSelect = [];

        if (countryIDs && countryIDs.length > 0) {
            countriesSelect = await Country.findAll({
                where: {
                    id: {
                        [Op.in]: countryIDs,
                    },
                },
            });
        }

        await newActivity.addCountries(countriesSelect);

        return newActivity;
    } catch (error) {
        console.error("Error en el handler createActivityHandler:", error);
        throw error;
    }
};

module.exports = {createActivity}