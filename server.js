require('dotenv').config(); // Add this line at the top of your server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const fs = require('fs'); // fs module is used to save the file
const path = require('path');

app.use(bodyParser.json());

const moviesArray = require('./data.js');
// let moviesArray = [];

const PORT = process.env.PORT || 4001;
//This means that when you navigate to the root URL
// of the server (e.g., http://localhost:4001),
//  the server will serve the index.html file from 
//  the public directory by default

app.use(express.static('public')); 

app.post('/add-movie',(req, res, next) =>{
    try {
        console.log('req.body:', req.body);
        const {movieId, movieTitle} = req.body;
        const newMovie = {movieId: movieId, movieTitle: movieTitle};
        moviesArray.push(newMovie);
        res.status(201).send('Movie added to the array!');
        console.log('Updated moviesArray:', moviesArray);
        console.log('Testing!'); 
    
        //Write the updated moviesArray back to data.js
        const dataPath = path.join(__dirname, 'data.js');
        const fileContent = `let moviesArray = ${JSON.stringify(moviesArray, null, 2)};\n\nmodule.exports = moviesArray;`;
        fs.writeFileSync(dataPath, fileContent, 'utf8');
    }
    catch (error) {
        console.error('Erroradding movie: ', error);
        res.status(500).send('Internal server error');
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})

// get genres
// app.get('/api/get_genres', (req, res, next) =>{
//     res.send('Genres');
// })

