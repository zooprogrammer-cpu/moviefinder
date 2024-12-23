// import API_KEY from '/scripts.js';

const tmdbKey = '12345';
const tmdbBaseUrl = 'https://api.themoviedb.org';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/3/genre/movie/list';

  const requestParams = `?api_key=${tmdbKey}`;

  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);

    if(response.ok) {
      const jsonResponse = await response.json(); 
      // console.log(jsonResponse);
      const genres = jsonResponse.genres; 
      console.log(genres);
      return genres; 
    }
  } 
  catch(error) {
    console.log(error);
  }



};

const getMovies = async() => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/3/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json(); 
      // console.log('getMovies', jsonResponse);
      const movies = jsonResponse.results;
      // console.log(movies);
      return movies; 
    }
  }
  catch (error) {
    console.log(error);
  }

};

const getMovieInfo = () => {

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;