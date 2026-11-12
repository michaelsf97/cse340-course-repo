import { getAllCategories } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories - CSE 340';
    res.render('categories', { title, categories });


};

export { showCategoriesPage };