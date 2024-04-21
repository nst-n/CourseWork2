const path = require('path');
const pantryNetworkDAO = require('../model/pantryNetworkModel');
const userDao = require('../model/userModel');

// initialise db object
const db = new pantryNetworkDAO();

//run seed data
db.init();

// gets db entries for pantry items
exports.display_pantries = (req, res) =>{
    db.getAllEntries()
        .then((list) => {
            const currentDate = new Date();
            const usableItem = list.filter(item => new Date(item.useByDate) > currentDate);
            res.render('items', {
                'title': 'Available Items',
                'entries': usableItem
            });
            console.log('promise resolved');
        })
        .catch((err)=>{
            console.log('promise rejected', err);
        })
}

// handles user sign in functionality
exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    
    if (!user || !password) {
        res.status(401).send('No user or no password');
        return;
    }
    
    userDao.lookup(user, function(err, u) {
        if (u) {
            res.status(401).send("User exists: " + user);
            return;
        }
        
        userDao.create(user, password);
        console.log("Register user:", user, "Password:", password);
        res.redirect('/login');
    });
}

// renders about page
exports.landing_page = (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/about.html'));
    //res.send('<h1>Welcome to the Scottish Pantry application.</h1>');
}

// renders registration form
exports.register = (req, res) =>{
    res.render("user/register");
}

// renders login page
exports.login = (req, res) =>{
    res.render("user/login");
}

// renders form for logged in users to enter new pantry items
exports.new_items = function(req, res){
    res.render('newItem');
}

//only logged in users should see the form to add new pantry items
exports.handle_login = function (req, res) {
    res.render("newItem", {

    user: "user"
    });
};

// handles logout functionality
exports.logout = function(req, res){
    res.clearCookie('jwt');
    res.status(200);
    res.redirect('/');
};

// allows logged in users to add new items to pantry
exports.addNewItem = function(req, res){
    const itemName = req.body.itemName;
    const itemDescription = req.body.itemDescription;
    const useByDate = req.body.useByDate;

    if (!itemName || !itemDescription || !useByDate) {
        return res.status(400).send("Missing required fields");
    }

  

    db.addItem(itemName, itemDescription, useByDate)
        .then(() => {
            res.redirect('/view_items'); // Redirect to the items page after successful insertion
        })
        .catch((err) => {
            console.error("Error adding item:", err);
            res.status(500).send("Internal Server Error");
        })
}