// Here models are not required because home page does not query the database.

const showHomePage = (req, res) => {
    const title = 'Home';
    res.render('home', { title });
    
    
};

export { showHomePage };
