const { Country, Activity } = require("../db");

const getAllCountries = async () => {
  try {
    const countries = await Country.findAll({
      include: [
        {
          model: Activity,
          attributes: ["id", "name", "difficulty", "season", "duration"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return countries;
  } catch (error) {
    console.error("Error en findAllCountriesController:", error);
    throw error;
  }
};

module.exports = getAllCountries;
