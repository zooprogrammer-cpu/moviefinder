const tmdbKey = '12345';
const tmdbBaseUrl = 'https://www.tmdbbaseurl.com';
const playBtn = document.getElementById('playBtn');

const getGenres = () => {
  const genreRequestEndpoint = 'https://api.themoviedb.org/3/genre/movie/list';
};

const getMovies = () => {
  const selectedGenre = getSelectedGenre();

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