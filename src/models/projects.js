import db from './db.js';

    const getAllProjects = async() => {
    try {
        const result = await db.query('SELECT * FROM projects');
        return result.rows;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
    };

    const getProjectsByOrganizationId = async (organizationId) => {
        const query = `
        SELECT
        project_id,
        organization_id,
        name,
        description,
        location,
        date
        FROM projects
        WHERE organization_id = $1
        ORDER BY date
        `;

        const queryParams = [organizationId];
        const result = await db.query(query, queryParams);

        return result.rows;


    };

    const getUpcomingProjectsList = async (organizationId) => {
        const query = `
        SELECT
        project_id,
        organization_id,
        name,
        description,
        location,
        date
        FROM projects
        ORDER BY date
        LIMIT 5
        `;

        const queryParams = [organizationId];
        const result = await db.query(query, params);

        return result.rows;
    };

    const getProjectDetails = async (id) => {
        const query = `
        SELECT 
            p.project_id,
            p.name AS title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            p.link,
            o.name AS organization_name
        FROM projects p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
    }

    // Export the model functions
    export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjectsList, getProjectDetails };