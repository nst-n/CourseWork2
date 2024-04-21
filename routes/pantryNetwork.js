const express = require('express');
const router = express.Router();
const controller = require('../controller/pantryNetworkController');
const {login} = require('../auth/auth');
const {verify} = require('../auth/auth');

//might change the landing page to about page
router.get("/", controller.landing_page);

router.get('/view_items', controller.display_pantries);

router.get('/register', controller.register);

router.post('/register', controller.post_new_user);

router.get('/login', controller.login);

router.post('/login', login,controller.handle_login);

router.post('/new', controller.addNewItem);



router.get('/about', (req, res)=>{
    res.redirect('/about.html');
})

router.get('/contact',(req, res)=>{
    res.redirect('/contact.html');
})

router.get('/new', controller.new_items);

router.get('/logout', controller.logout);



router.use((req, res) => {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found.');
});

router.use((err, req, res, next) => {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

module.exports = router;