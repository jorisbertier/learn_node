const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { engine} = require("express-handlebars")

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, "views"))


app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    const { location, query} = req.query;
    if(!location) {
        return res.send("Une erreur s'est produite, il manque la localisation")
    }

    console.log()
    res.render('home', {
        title: 'Home',
        age: 30
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})
app.get('/{*any}', (req, res) => {
    res.render('404', {
        title: '404'
    })
})


app.listen(port, ()=> {
    console.log('Listening port ', port)
})
