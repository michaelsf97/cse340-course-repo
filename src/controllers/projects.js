import { getAllProjects, getUpcomingProjectsList } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
};

const showUpcomingProjectsListPage = async (req, res) => {
    try {
    const projects = await getUpcomingProjectsList();
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
        const project = await getProjectById(projectId); 
        
        res.render('project-detail', { title: project.name, project });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};



export { showProjectsPage, showUpcomingProjectsListPage, showProjectDetailsPage };

