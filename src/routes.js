import express from 'express';

// Import all controllers here from controllers folders.
import { showHomePage } from './controllers/home.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectDetailsPage, showProjectsPage, showUpcomingProjectsListPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showCategoryDetailsPage } from './controllers/categories.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';
import { organizationValidation } from './controllers/organizations.js';
import { showEditOrganizationForm } from './controllers/organizations.js';

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

// Router GET for new-organization page
router.get('/new-organization', showNewOrganizationForm);

// Router to handle new organization form submission for POST requests
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display Edit Organization Form
router.get('/edit-organization/:id', showEditOrganizationForm);

// test-route to errors
router.get('/test-error', testErrorPage);

export default router;


