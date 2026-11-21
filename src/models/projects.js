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

    const createProject = async(name, description, location, date, organization_id) => {
        const query = `
        INSERT INTO projects(name, description, location, date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
        `;

        const queryParams = [name, description, location, date, organization_id];
        const result = await db.query(query, queryParams);

        if (result.rows.length === 0) {
            throw new Error('Failed to create project');
        }

        if (process.env.ENABLE_SQL_LOGGING === 'true') {
            console.log('Created new project with ID:', result.rows[0].project_id);
        }
        
        return result.rows[0].project_id;

    };

    const assignCategoryToProject = async(categoryId, projectId) => {
        const query = `
        INSERT INTO project_category(category_id, project_id)
        VALUES ($1, $2);
        `;

        await db.query(query, [categoryId, projectId]);
    }

    const updateCategoryAssignments = async(projectId, categoryIds) => {
        // First, remove existing category  assignments for the project
        const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
        `;

        await db.query(deleteQuery, [projectId])

        // Next, add the new category assignments
        for (const categoryId of categoryIds) {
            await assignCategoryToProject(categoryId, projectId);
        }


    }

    // Export the model functions
    export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjectsList, getProjectDetails, createProject, updateCategoryAssignments };