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
    res.render('home', {
        title: 'Home'
    })
})

app.listen(port, ()=> {
    console.log('Listening port ', port)
})
