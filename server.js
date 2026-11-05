import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './src/views/models/db.js';
import { getAllOrganizations } from './src/views/models/organizations.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Config __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Public folder for static files (CSS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    const title = 'Home - CSE 340';
    res.render('home', {title});
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', {title, organizations});
});

app.get('/projects', (req, res) => {
    const title = 'Projects - CSE 340';
    res.render('projects', {title});
});

app.get('/categories', (req, res) => {
    const title = 'Categories - CSE 340';
    res.render('categories', {title});
});

/// Start the server
app.listen(PORT, async () => {
    try
    {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error(`Error connecting to the database:`, error);
    }
});