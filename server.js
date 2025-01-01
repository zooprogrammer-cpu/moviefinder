const express = require('express');
const app = express(); 

const PORT = process.env.PORT || 4001;
//This means that when you navigate to the root URL
// of the server (e.g., http://localhost:4001),
//  the server will serve the index.html file from 
//  the public directory by default

app.use(express.static('public')); 
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})

// get genres
app.get('/api/get_genres', (req, res, next) =>{
    res.send('Genres');
})