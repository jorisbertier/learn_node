const express = require('express')

const { User } = require('../models/user')
const router = new express.Router()


router.post('/users', async (req, res, next) => {
    const user = new User(req.body)

    try {
        const authToken = await user.generateAuthTokenAndSaveUser()

        res.status(201).send({user, authToken})
        
    }catch(e) {
        res.status(400).send(e)
    }
})

router.post('/login', async(req, res) => {
    console.log("Body reçu:", req.body);
    try {
        const user = await User.findUser(req.body.email, req.body.password);
        const authToken = await user.generateAuthTokenAndSaveUser();
        res.send({ user, authToken });
    } catch (e) {
        console.error("Erreur de connexion:", e.message);
        res.status(400).send({ error: e.message });
    }
});


router.get('/users', async(req, res, next) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/user/:id', async(req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(400).send('user not fount')
        res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/user/:id', async(req, res, next) => {
    const updatedInfo = Object.keys(req.body)
    const userId = req.params.id;
    try {
        const user = await User.findById(userId)
        updatedInfo.forEach(update => user[update] = req.body[update])
        await user.save()
        if(!user) return res.status(400).send('user not fount')
        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/user/:id', async(req, res, next) => {
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
module.exports = router