const express = require('express');
const app = express();
const port = 3000;
const path = require('path')


app.use(express.static(path.join(__dirname, "views")))
app.use(express.static(path.join(__dirname, "public")))
// app.get('/', (req, res) => {
//     res.send('Hellow orld')
// })

app.get('/about', (req, res) => {
    res.send('About')
})

app.listen(port, ()=> {
    console.log('App listening on port ', port)
})