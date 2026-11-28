import express from 'express';

// Import all controllers here from controllers folders.
import { showHomePage } from './controllers/home.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { processEditProjectForm, showEditProjectForm, showProjectDetailsPage, showProjectsPage, showUpcomingProjectsListPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showCategoryDetailsPage } from './controllers/categories.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';
import { organizationValidation } from './controllers/organizations.js';
import { showEditOrganizationForm } from './controllers/organizations.js';
import { processEditOrganizationForm } from './controllers/organizations.js';
import { showNewProjectForm } from './controllers/projects.js';
import { processNewProjectForm } from './controllers/projects.js';
import { projectValidation } from './controllers/projects.js';
import { showAssignCategoriesForm } from './controllers/categories.js';
import { processAssignCategoriesForm } from './controllers/categories.js';
import { showNewCategoryForm } from './controllers/categories.js';
import { processNewCategoryForm } from './controllers/categories.js';
import { validateCategory } from './controllers/categories.js';
import { showEditCategoryForm } from './controllers/categories.js';
import { processEditCategoryForm } from './controllers/categories.js';
import { showUserRegistrationForm } from './controllers/users.js';
import { processUserRegistrationForm } from './controllers/users.js';
import { showLoginForm } from './controllers/users.js';
import { processLoginForm } from './controllers/users.js';
import { processLogout } from './controllers/users.js';
import { requireLogin } from './controllers/users.js';
import { showDashboard } from './controllers/users.js';
import { requireRole } from './controllers/users.js';


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
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Router GET for new-project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Router to handle new organization form submission for POST requests
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route to display Edit Organization Form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to display and handle the processEditOrganizationForm submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm );

// Route to display and handle the processNewProjectForm submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Route to display showAssignCategoriesForm
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);

// Route to display and handle processAssignCategoriesForm controller function
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Route for creating showEditProjectForm
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm );

// Route to display and handle processEditProjectForm
router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);

// Routes for creating a new category
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
// Routes to display and handle processNewCategoryForm
router.post('/new-category', requireRole('admin'), validateCategory, processNewCategoryForm);

// Routes for editing a category
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
// Routes to display and handle processEditCategoryForm
router.post('/edit-category/:id', requireRole('admin'), validateCategory, processEditCategoryForm);

// W05 admin-only users list route
router.get('/users', requireRole('admin'), showUsersPage);

// USER REGISTRATION ROUTES.
router.get('/register/', showUserRegistrationForm);
router.post('/register/', processUserRegistrationForm);

// ROUTES TO LOGIN.

router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected Dashboard Route
router.get('/dashboard', requireLogin, showDashboard);

// test-route to errors
router.get('/test-error', testErrorPage);

export default router;


