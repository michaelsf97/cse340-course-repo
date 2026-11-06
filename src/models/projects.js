import db from './db.js';

export async function getAllProjects() {
    try {
        const result = await db.query('SELECT project_id, name, description, image_filename AS image, link FROM projects');
        return result.rows;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
    }