const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());

const moviesArray = require('./data');
// let moviesArray = [];

const PORT = process.env.PORT || 4001;
//This means that when you navigate to the root URL
// of the server (e.g., http://localhost:4001),
//  the server will serve the index.html file from 
//  the public directory by default

app.use(express.static('public')); 

app.post('/add-movie',(req, res, next) =>{
    console.log('req.body:', req.body);
    const {movieId, movieTitle} = req.body;
    const newMovie = {id: movieId, name: movieTitle};
    moviesArray.push(newMovie);
    res.status(201).send('Movie added to the array!');
    console.log('Updated moviesArray:', moviesArray); // TODO: moviesArray updating here but not saiving to the data.js
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})

// get genres
// app.get('/api/get_genres', (req, res, next) =>{
//     res.send('Genres');
// })

