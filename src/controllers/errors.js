// // Import any needed model functions

// // But in this part we do not need any model function, because of error page does not query the database.

// // Define any controller function 
// // Test route for 500 errors

const testErrorPage = async (req, res) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
}


// // Export any controller functions
export { testErrorPage };