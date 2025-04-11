const { readFileSync, writeFileSync, writeFile} = require('fs')

// const { name, age, legal } = JSON.parse(readFileSync('./data.json'))

// console.log(name)

// const myData = {
//     name:'Justine',
//     age: 27,
//     legal: true
// }

// const objectToJson = JSON.stringify(myData)

// console.log(objectToJson)

// writeFileSync('./myData.json', objectToJson)

const myData = JSON.parse(readFileSync('./data.json'))

myData.name = 'Pierre'

const objectToJson = JSON.stringify(myData)
writeFileSync('./myData.json', objectToJson)