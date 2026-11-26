import { getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignments, getCategoriesByServiceProjectId, createCategory, updateCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';


const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });


};



const showCategoryDetailsPage = async (req, res) => {
    try {

    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, category, projects });
} catch (error) {
    console.error(error);
    res.status(500).send(`Server Error: ${error.message}`);
}

};

const showAssignCategoriesForm = async (req, res, next) => {
    try {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedRows = await getCategoriesByServiceProjectId(projectId);
    const assignedCategoryIds = assignedRows.map((row) => Number(row.category_id));
    
    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategoryIds });
    } catch (error) {
        next(error);
    }


};

const processAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const rawCategoryIds = req.body.categoryIds;

        const categoryIdsArray = !rawCategoryIds
            ? []
            : Array.isArray(rawCategoryIds)
                ? rawCategoryIds.map(Number)
                : [Number(rawCategoryIds)];

        await updateCategoryAssignments(projectId, categoryIdsArray);
        req.flash('success', 'Categories updated successfully');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

const validateCategory = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters.')
];

const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'Create Category',
        name: '',
        errors: []
    });
};

const processNewCategoryForm = async (req, res, next) => {
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('new-category', {
                title: 'Create Category',
                name: name || '',
                errors: errors.array()
            });
        }

        const created = await createCategory(name);
        req.flash('success', 'Category created successfully.');
        res.redirect(`/category/${created.category_id}`);
    } catch (error) {
        next(error);
    }
};

const showEditCategoryForm = async (req, res, next) => {
    const categoryId = req.params.id;

    try {
        const category = await getCategoryById(categoryId);
        if (!category) {
            req.flash('error', 'Category not found.');
            return res.redirect('/categories');
        }

        res.render('edit-category', {
            title: 'Edit Category',
            category,
            errors: []
        });
    } catch (error) {
        next(error);
    }
};

const processEditCategoryForm = async (req, res, next) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('edit-category', {
                title: 'Edit Category',
                category: {
                    category_id: categoryId,
                    name: name || ''
                },
                errors: errors.array()
            });
        }

        const updated = await updateCategory(name, categoryId);
        if (!updated) {
            req.flash('error', 'Category not found.');
            return res.redirect('/categories');
        }

        req.flash('success', 'Category updated successfully.');
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
};




export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, validateCategory,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm };