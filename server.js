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
    res.render('index');
});

app.get('/organizations', (req, res) => {
    res.render('organizations');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.get('/categories', (req, res) => {
    res.render('categories');
});

/// Start the server
app.listen(PORT, () => {
    console.log('Server is running at http://localhost:${PORT}');
});