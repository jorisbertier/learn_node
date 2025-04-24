const mongoose = require('mongoose')
const validator =require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
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

userSchema.statics.findUser = async(email, password) {
    const user = await User.findOne({ email });
    if(!user) throw new Error('Error, not possible connect ')
    const isPasswordValid = await bcrypt.compare(password, user.password)
console.log(password)
console.log(user.password)
    if(!isPasswordValid) throw new Error('Error durantly the connexion')
    return user;
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
    next();
})

const User = mongoose.model('User', userSchema)



module.exports = {
    User
}