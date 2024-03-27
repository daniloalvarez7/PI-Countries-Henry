const { createActivity } = require("../controllers/createActivity");

const getAllActivitiesHandler = (req, res) => {
    res.status(200).send('Todas las actividades')
};

const createActivityHandler = async (req, res) => {
    // se extrae la info necesaria desde body //
    const {name, id, difficulty, duration, season} = req.body;

    try {

        // checkeamos si hay algún campo que falte. En tal caso, lanzamos error //
        if (!id || !name || !difficulty || !season) {
            throw new Error("Se requieren todos los campos para crear una actividad");
        }
        
        // creamos la nueva actividad con el controller //
        const response = await createActivity(name, id, difficulty, duration, season)
        
        // Si no hay errores, devolvemos la respuesta json //
        res.status(200).json(response)
    } catch (error) {

        // Devolvemos error si es el caso //
       res.status(400).json({error: error.message}); 
    }

};

module.exports = {
    getAllActivitiesHandler,
    createActivityHandler
};