require('dotenv').config()
const { connectDb } = require('./src/services/mongoose.js')
const { User } = require('./src/models/user')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

connectDb().catch(err => console.log(err))

app.use(express.json())

app.post('/todos', async (req, res, next) => {
    const user = new User(req.body)
    const saveUser = await user.save();
    res.send(saveUser)
})

app.listen(port, () => {
    console.log('Serveur est lancé localhost/', port)
})