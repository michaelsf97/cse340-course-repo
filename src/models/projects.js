import db from './db.js';

export const getAllProjects = async() => {
    try {
        const result = await db.query('SELECT * FROM projects');
        return result.rows;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
    }