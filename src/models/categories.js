import db from './db.js'

const getAllCategories = async() => {
    try {
        const result = await db.query('SELECT * FROM public.categories');
        return result.rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

const getCategoryById = async (categoryId) => {
    const query = `
    SELECT 
    category_id,
    name
    FROM categories
    WHERE category_id = $1
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows && result.rows.length > 0 ? result.rows[0]: null;
};

const getCategoriesByServiceProjectId = async (projectId) => {
    const query = `
    SELECT c.category_id, c.name
    FROM categories c
    JOIN projects_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
    SELECT 
    p.project_id,
    p.name AS title,
    p.description,
    p.date,
    p.location
    FROM projects p
    JOIN projects_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows || [];
};

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
    INSERT INTO projects_categories (category_id, project_id)
    VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
    DELETE FROM projects_categories
    WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId, getCategoriesByServiceProjectId, assignCategoryToProject, updateCategoryAssignments };



