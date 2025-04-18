

const weather = (location, unit) => {

    const searchUrl = `http://api.weatherstack.com/current?access_key=${a49c7c3b7da92a0f06a609ba75ae6528}&query=${location}&units=${unit}`;
    
    fetch(searchUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.error("Erreur :", err));
}


module.exports = { weather}