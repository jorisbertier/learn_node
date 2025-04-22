require('dotenv').config()
const mongoose = require('mongoose')

main().catch(err => console.log(err))
//add data
async function main() {
    
    await mongoose.connect(process.env.MONGO_URL)
    const User = mongoose.model('User', {
        name: String,
        age: Number
    })

    const Alex = new User({
        name: 'Alex',
        age: 30
    })

    const Justine = new User({
        name: 'Justine',
        age: 30
    })

    console.log(Alex, Justine)
    await Alex.save()
    await Justine.save()
}
