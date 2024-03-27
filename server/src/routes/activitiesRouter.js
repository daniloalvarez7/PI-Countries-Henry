const { Router } = require("express");
const { getAllActivitiesHandler, createActivityHandler } = require("../handlers/activitiesHandlers");

const activitiesRouter = Router();

activitiesRouter.get('/', getAllActivitiesHandler)

activitiesRouter.post('/', createActivityHandler)

module.exports = activitiesRouter