import db from './db.js'

export async function getAllCategories() {
    try {
        const result = await db.query('SELECT * FROM public.categories');
        return result.rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}