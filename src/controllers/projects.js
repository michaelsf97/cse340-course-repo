import { getAllProjects, getUpcomingProjectsList, getProjectDetails } from '../models/projects.js';

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
        
        res.render('project', { title: project.name, project });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};



export { showProjectsPage, showUpcomingProjectsListPage, showProjectDetailsPage };

