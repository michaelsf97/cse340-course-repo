import express from 'express';

// Import all controllers here from controllers folders.
import { showHomePage } from './controllers/home.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectDetailsPage, showProjectsPage, showUpcomingProjectsListPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showCategoryDetailsPage } from './controllers/categories.js';

const router = express.Router();

// Here we define routes using this router object instead of app.
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// Route for organizations details page, project details page and category details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// test-route to errors
router.get('/test-error', testErrorPage);

export default router;


