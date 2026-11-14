# W03 Coaching Session: Model-View-Controller
**Student Name:** Michael Smith Saavedra  
**Course:** CSE 340 - Web Backend Development  

---

## 1. Models
**Discussion Summary:**  
We discussed the model layer responsible for interacting with the PostgreSQL database. Specifically, we reviewed how dynamic parameters are passed safely into SQL queries to fetch specific records without risking SQL injection using parameterized queries (`$1`).

**Code Snippet:**
```javascript
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

2. Views
Discussion Summary:

We reviewed the EJS view templates used to render data dynamically on the frontend. The focus was on how EJS tags are utilized to insert database IDs and properties directly into HTML anchor tags (href) to enable dynamic navigation between pages.

<ul>
    <% categories.forEach(category => { %>
        <li>
            <a href="/category/<%= category.category_id %>"><%= category.name %></a>
        </li>
    <% }) %>
</ul>

3. Controllers
Discussion Summary:

We discussed the controller layer, which handles incoming HTTP requests, interacts with the model functions, and renders the corresponding views. We examined route handlers utilizing Express route parameters (:id) to capture dynamic segments from the URL and route them correctly through the MVC pattern.

// Route for organizations details page, project details page and category details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

4. Error Handling
Discussion Summary:

We examined the application's error-handling strategy, which incorporates try...catch blocks within asynchronous controller functions to gracefully catch database or runtime errors and respond with appropriate status codes like a 500 error page.

const showCategoryDetailsPage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        const projects = await getProjectsByCategoryId(categoryId);
        const title = 'Category Details';

        res.render('category', { title, projects, category });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Server Error: ${error.message}`);
    }
};
