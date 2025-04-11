const { chain } = require('mathjs')


const fs = require("fs");
// const data = fs.writeFile("fichier.txt", "utf8", (err, data) => {
//     if(err) {
//         console.log('Erreur')
//         return
//     }
//     console.log(data)
// });
console.log( chain(5).add(5).multiply(2));