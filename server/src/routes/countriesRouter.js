const { Router } = require("express");

const { getAllCountriesHandler, getCountriesByIdHandler } = require('../handlers/countriesHandlers')

const countriesRouter = Router();

countriesRouter.get('/', getAllCountriesHandler)

countriesRouter.get('/:id', getCountriesByIdHandler)

module.exports = countriesRouter