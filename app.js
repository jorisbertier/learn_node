const req = require("postman-request")


req('https://dog.ceo/api/breeds/image/random', function (error, response, body) {
    
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    const { message, status} = JSON.parse(body)
    console.log(message)
});

req('https://api.thecatapi.com/v1/images/search', function (error, response, body) {
    
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    const catsData = JSON.parse(body)
    console.log(catsData)
});