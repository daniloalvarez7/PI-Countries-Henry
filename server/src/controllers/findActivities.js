const { Activity } = require('../db')

const findActivities = async () => {
    try {
        const activities = await Activity.findAll();
        return activities;
    } catch (error) {
        console.error("Error en getAllActivities:", error);
        throw error;
    }
}

module.exports = {
    findActivities
}