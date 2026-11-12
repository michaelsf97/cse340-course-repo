import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

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

// Middleware to log incoming requests
app.use ((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route handler
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    next();
});

// Routes
app.use(router);

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler 
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error ocurred:', err.message);
    console.error('Stack trace:', err.stack);

    // Determine the status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    // Prepare Data For The Template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
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