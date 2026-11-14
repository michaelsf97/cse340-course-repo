import express from 'express';

// Import all controllers here from controllers folders.
import { showHomePage } from './controllers/home.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';

const router = express.Router();

// Here we define routes using this router object instead of app.
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// Route for organizations details page
router.get('/organization/:id', showOrganizationDetailsPage);

// test-route to errors
router.get('/test-error', testErrorPage);

export default router;


