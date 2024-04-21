const express = require('express');
const app = express();
const router = require('./routes/pantryNetwork');
const path = require('path');
const public = path.join(__dirname, 'public');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cookieParser());


app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.static(public));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router);





app.listen(3000, () =>{
    console.log("Server initiated on port 3000, press ctrl ^ c to quit");
})