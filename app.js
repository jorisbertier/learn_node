require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')

main().catch(err => console.log(err))
//add data
async function main() {
    
    await mongoose.connect(process.env.MONGO_URL)
    const User = mongoose.model('User', {
        email: {
            type: String,
            required: true,
            validate(v) {
                if(!validator.isEmail(v)) throw new Error('Email non valide !')
            }

        },
        password: {
            type: String,
            required: true,
            validate(v) {
                if(!validator.isLength(v, {min: 4, max: 20})) throw new Error('Le mot de passe doit etre entre 4 et 20 caractères')
            }
        }
    })

    const firstPerson = new User({
        email: 'test@exemple.com',
        password: 'password'
    })

    const secondPerson = new User({
        email: 'Justine@test.com',
        password: 'shdkdk'
    })

    console.log(firstPerson, secondPerson)
    await firstPerson.save()
    await secondPerson.save()
}
