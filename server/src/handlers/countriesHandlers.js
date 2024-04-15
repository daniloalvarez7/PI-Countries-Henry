const getCountriesById = require("../controllers/getCountriesById");
const getAllCountries = require("../controllers/getAllCountries");
const getCountryByName = require("../controllers/getCountryByName");

const getAllCountriesHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const countryByName = await getCountryByName(name);
      res.status(200).json(countryByName);
    } else {
      const response = await getAllCountries();
      console.log(response);
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCountriesByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getCountriesById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCountriesHandler,
  getCountriesByIdHandler,
};
