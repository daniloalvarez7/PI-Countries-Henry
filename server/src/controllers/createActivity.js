const {Activity} = require('../db')

const createActivity = async (name, id, difficulty, duration, season) => {
    return await Activity.create({name, id, difficulty, duration, season})
};

module.exports = {createActivity}