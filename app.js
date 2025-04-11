const fs = require("fs");
const data = fs.writeFile("fichier.txt", "utf8", (err, data) => {
    if(err) {
        console.log('Erreur')
        return
    }
    console.log(data)
});
console.log(data);