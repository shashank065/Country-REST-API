// countryRoutes.js
import { Router } from 'express';
import { findCountryByName,getCountryNames } from '../controllers/countryController.js';
const countryRoutes = Router();
// Find a country by name route
countryRoutes.get('/country/:name', findCountryByName);

// List all countries filter route
countryRoutes.get('/countries', getCountryNames);

export default countryRoutes;
