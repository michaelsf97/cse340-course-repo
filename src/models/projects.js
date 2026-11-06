import db from './db.js';

async function initTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS projects (
            project_id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
            image_filename VARCHAR(255) NOT NULL DEFAULT 'default_project_image.png',
            link VARCHAR(320) NOT NULL DEFAULT 'https://www.example.com'
        );
    `;
    try {
        await db.query(createTableQuery);
    } catch (err) {
        console.error('Error al inicializar la tabla projects:', err);
    }
}

initTable();

export async function getAllProjects() {
    try {
        const result = await db.query('SELECT project_id, name, description, image_filename AS image, link FROM projects');
        return result.rows;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}