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

    try {
        const saveUser = await user.save();
        res.send(saveUser)
        res.status(201).send(saveUser)
        
    }catch(e) {
        res.status(400).send(e)
    }
})

app.get('/users', async(req, res, next) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

app.get('/user/:id', async(req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(400).send('user not fount')
        res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }
})

app.patch('/user/:id', async(req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true
        })
        if(!user) return res.status(400).send('user not fount')
        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.delete('/user/:id', async(req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId, req.body, {
            new: true,
            runValidators: true
        })
        if(!user) return res.status(400).send('user not fount')
        res.send(`${user} deleted`)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log('Serveur est lancé localhost/', port)
})