import { body, validationResult } from 'express-validator';
import { getAllProjects, getUpcomingProjectsList, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { createProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
};

const showUpcomingProjectsListPage = async (req, res) => {
    try {
    const projects = await getUpcomingProjectsList(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Projects';
    res.render('projects', { title, projects });
    } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
    }
};

const showProjectDetailsPage = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);
        
        if (!project) {
            return res.status(404).send('Project not found');
        }

        const categories = await getCategoriesByProjectId(projectId);
        
        res.render('project', { title: project.name || 'Project Details', project, categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const showNewProjectForm = async (req, res) => {
        const organizations = await getAllOrganizations();
        const title = 'Add New Service Project';

        res.render('new-project', { title, organizations });
    }

    const processNewProjectForm = async(req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.array().forEach(error => {
                req.flash('error', error.msg);
            });
            return res.redirect('/new-project');
        }
        // Extract form data from req.body
        const { title, description, location, date, organizationId } = req.body;

        try {
            // Create the new project in the database
            const newProjectId = await createProject(title, description, location, date, organizationId);

            req.flash('success', 'New Service Project Created Successfully!');
            res.redirect(`/project/${newProjectId}`);
        } catch(error) {
            console.error('Error creating new project:', error);
            req.flash('error', 'There was an error creating the service project.');
            res.redirect('/new-project');
        }
        
    };

    const projectValidation = [
        body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is not required')
        .isLength({ min: 3, max: 200})
        .withMessage('Project title must be between 3 to 200 characters.'),
        body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 1000 })
        .withMessage('Project Description must be less than 1000 characters.'),
        body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required')
        .isLength({ max: 200 })
        .withMessage('Project location must be less than 200 characters.'),
        body('date')
        .trim()
        .notEmpty()
        .withMessage('date is required')
        .isISO8601()
        .withMessage('Please enter a valid date'),
        body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Please enter a valid organization')
    ];






export { showProjectsPage, showUpcomingProjectsListPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation };

