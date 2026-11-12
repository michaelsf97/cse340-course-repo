// Here models are not required because home page does not query the database.

showHomePage = (req, res) => {
    const title = 'Home - CSE 340';
    res.render('home', { title });
    
    
};

export { showHomePage };
