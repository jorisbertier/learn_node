require('dotenv').config()
const { connectDb } = require('./src/services/mongoose.js')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const userRoute = require('./src/routes/user')

connectDb().catch(err => console.log(err))

app.use(express.json())
app.use(userRoute)


app.listen(port, () => {
    console.log('Serveur est lancé localhost/', port)
})