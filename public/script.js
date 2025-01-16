// import API_KEY from '/scripts.js';
const apiKey = '';
const tmdbBaseUrl = 'https://api.themoviedb.org';
const playBtn = document.getElementById('playBtn');
const addToWatchlistBtn = document.getElementById('addToWatchlistBtn');

let movieInfo;

document.addEventListener('DOMContentLoaded', () => {
  const addToWatchlistBtn = document.getElementById('addToWatchlistBtn');

  if (addToWatchlistBtn) {
    addToWatchlistBtn.onclick = async () => {
      console.log('Add to Watchlist clicked');
      const info = await movieInfo; 
      console.log('info::', info);
   
      const movie = {
        movieId : info.id,
        movieTitle : info.title 
      };
      console.log('movie in script::', movie);

      try {
        const response = await fetch('/add-movie', { 
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(movie)
        });
        console.log('response::' , response);

        if (!response.ok) {
          console.log('Failed to add movie');
        } 
      } catch (error) {
        console.error('Error: ', error);
      }
    };
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const genresSelect = document.getElementById('genres');

  genresSelect.addEventListener('change', () => {
    const selectedGenre = getSelectedGenre();
    console.log('Selected genre:', selectedGenre);
  });
});


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
      console.log('genres:: ', genres);
      return genres; 
    }
  } 
  catch(error) {
    console.log(error);
  }
};

const getMovies = async() => {
  const selectedGenre = getSelectedGenre();
  console.log('selectegGenre::', selectedGenre);
  const discoverMovieEndpoint = '/3/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json(); 
      // console.log('getMovies', jsonResponse);
      const movies = jsonResponse.results;
      return movies; 
    }
  }
  catch (error) {
    console.log(error);
  }

};

const getMovieInfo = async(movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/3/movie/${movieId}`;

  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  console.log(urlToFetch);

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      // const jsonResponse = response.json();
      movieInfo = response.json();
      return movieInfo; 
    }
  }
  catch (error) {
    console.log(error);
  }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  console.log('In showRandomMovie');
  const movies = await getMovies();
  console.log('movies::', movies);
  const randomMovie = getRandomMovie(movies);
  console.log('randomMovie: ', randomMovie);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};


getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;