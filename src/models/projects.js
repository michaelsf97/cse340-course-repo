import db from './db.js';

export async function getAllProjects() {
    try {
        const result = await db.query('SELECT * FROM public.projects');
        return result.rows;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
    }