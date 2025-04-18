require('dotenv').config()
const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGO_URL)

async function main() {
    await client.connect();
    const db = client.db('mytask');
    const collection = db.collection('documents');

    // try {
    //     const insertData = await collection.insertMany([
    //         {
    //             name: 'Alex',
    //             age: 30,
    //             sexe: 'Masculin',
    //             hobby: 'Coding'
    //         },
    //         {
    //             name: 'Justine',
    //             age: 30,
    //             sexe: 'Féminin',
    //             hobby: 'Coding'
    //         },
    //         {
    //             name: 'Pierre',
    //             age: 35,
    //             sexe: 'Masculin',
    //             hobby: 'Escalade'
    //         },
    //     ])
    //     console.log('Document inserted')
    // } catch(e) { throw e; };

    // try {
    //     const findData = await collection.find({age: 30})
    //     console.log('Document trouvé: ', await findData.toArray())
    // } catch(e) { throw e;}

    // try {
    //     const update = await collection.updateMany({ age: 30},{ 
    //         $set: { age: 31}
    //     })
    //     console.log(await update)
    // } catch(e) { throw e;}
    try {
        const deletePierre = await collection.deleteMany({ age: 31})
        console.log('Delete evereyone')

    } catch(e) { throw e;}
    return 'Connexion DATABASE ok !';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())