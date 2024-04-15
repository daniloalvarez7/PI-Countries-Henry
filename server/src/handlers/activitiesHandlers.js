const { createActivity } = require("../controllers/createActivity");
const { findActivities } = require("../controllers/findActivities");

const getAllActivitiesHandler = async (req, res) => {
  try {
    const response = await findActivities();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createActivityHandler = async (req, res) => {
  // se extrae la info necesaria desde body //
  const { name, countryIDs, difficulty, duration, season } = req.body;

  try {
    // checkeamos si hay algún campo que falte. En tal caso, lanzamos error //
    if (!countryIDs || !name || !difficulty || !season) {
      throw new Error("Se requieren todos los campos para crear una actividad");
    }

    // creamos la nueva actividad con el controller //
    const response = await createActivity(
      name,
      countryIDs,
      difficulty,
      duration,
      season
    );

    // Si no hay errores, devolvemos la respuesta json //
    res.status(200).json(response);
  } catch (error) {
    // Devolvemos error si es el caso //
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllActivitiesHandler,
  createActivityHandler,
};
