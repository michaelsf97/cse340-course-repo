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

const getCategoriesByProjectId = async (projectId) => {
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

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId };



