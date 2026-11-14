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

    const getUpcomingProjectsLimit = async (organizationId) => {
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

    // Export the model functions
    export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjectsLimit };