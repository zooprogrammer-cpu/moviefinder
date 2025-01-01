const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());

const { moviesArray } = require('./data');

const PORT = process.env.PORT || 4001;
//This means that when you navigate to the root URL
// of the server (e.g., http://localhost:4001),
//  the server will serve the index.html file from 
//  the public directory by default

app.use(express.static('public')); 

app.post('/add-movie',(req, res, next) =>{
    const newMovie = req.body;
    moviesArray.push(newMovie);
    res.status(201).send('Movie added to the array');
    console.log('Updatetd moviesArray:', moviesArray);
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})

// get genres
// app.get('/api/get_genres', (req, res, next) =>{
//     res.send('Genres');
// })

