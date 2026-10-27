import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Config __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public folder for static files (CSS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {title: 'Home - CSE 340'});
});

app.get('/organizations', (req, res) => {
    res.render('organizations', {title: 'Organizations - CSE 340'});
});

app.get('/projects', (req, res) => {
    res.render('projects', {title: 'Projects - CSE 340'});
});

app.get('/categories', (req, res) => {
    res.render('categories', {title: 'Categories - CSE 340'});
});

/// Start the server
app.listen(PORT, () => {
    console.log('Server is running at http://localhost:${PORT}');
});