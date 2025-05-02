const jwt = require('jsonwebtoken')
const { User } = require('../models/user')


const authentification = async (req, res, next) => {
    try {
        // Extraction du token depuis l'en-tête Authorization
        const authToken = req.header('Authorization')?.replace(/^Bearer\s+/i, '').trim();
        console.log('Extracted Token:', authToken); // Affiche le token extrait
        // Vérification de l'existence du token
        if (!authToken) {
            return res.status(400).send('Token is missing');
        }
        // Vérification et décodage du token
        const decodedToken = jwt.verify(authToken, 'foo');
        console.log('Decoded Token:', decodedToken); // Affiche le token décodé
    
        // Recherche de l'utilisateur avec l'ID décodé du token et le token dans la base de données
        const user = await User.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
    
        // Si l'utilisateur n'est pas trouvé
        if (!user) {
            console.log('User not found or token mismatch');
            throw new Error();
        }
    
        // Ajout de l'utilisateur dans la requête pour les étapes suivantes
        req.authToken = authToken
        req.user = user;
    
        next();
        } catch (e) {
        // Log de l'erreur complète pour mieux comprendre
        console.error('Authentication error:', e.message);
        res.status(401).send('Merci de vous authentifier');
        }
    };
module.exports = authentification