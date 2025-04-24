const mongoose = require('mongoose')
const validator =require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

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
            if (!validator.isLength(String(v), { min: 4, max: 20 })) {
              throw new Error('Le mot de passe doit être entre 4 et 20 caractères');
            }
          }
    },
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
    }]
})

userSchema.statics.findUser = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        console.log("Aucun utilisateur trouvé pour :", email);
        throw new Error('Email incorrect');
    }

    console.log("Mot de passe en clair:", password);
    console.log("Mot de passe haché stocké:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Résultat comparaison bcrypt:", isPasswordValid);

    if (!isPasswordValid) throw new Error('Mot de passe incorrect');

    return user;
};

userSchema.methods.generateAuthTokenAndSaveUser = async function() {
    const authToken = jwt.sign({ _id: this._id.toString() }, 'foo');
    this.authTokens.push({ authToken })
    await this.save({ validateBeforeSave: false });
    return authToken;
}

userSchema.pre('save', async function(next) {
    console.log('Pre-save triggered');
    if (this.isModified('password')) {
        console.log('Hashing password:', this.password);
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema)



module.exports = {
    User
}