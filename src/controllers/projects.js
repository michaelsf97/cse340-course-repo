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
        
    }






export { showProjectsPage, showUpcomingProjectsListPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm };

