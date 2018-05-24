const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middleware  bypasses all other handler methods, can be used when updating website.
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     // next();no need to use next
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    // fs.appendFile('server.log', log + '\n', (err) => {
    //     if(err){
    //         console.log('Unable to append to server log.');
    //     }
    // });
    next();
});


hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs. registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Welcome to Phoenix's website"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Page Does'nt Exist. Error 404."
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
