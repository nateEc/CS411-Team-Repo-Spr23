const API_KEY = "api_key=b9ab825c6c7df22351f2927746188d59";
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?'+API_KEY;
import {getTrailerUrl} from './youtube.js';
import { createCardElement, userFavorites, fetchUserFavorites } from './card-funcs.js';


const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

const userId = document.getElementById('userId') ? document.getElementById('userId').value : null;
await fetchUserFavorites(userId);

async function makeUrl(title) {
  console.log('button clicked');
  const url = await getTrailerUrl(title)
  console.log('the url is: '+ url);
  window.open(url)
}

function searchMovies(url) {
    const resultsList = document.querySelector(".result");
    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        main.innerHTML = '';
        for (const result of data.results.slice(0, 8)) {
          const { title, poster_path, vote_average, overview, id } = result;
          const card = createCardElement(title, IMG_URL + poster_path, vote_average, overview, id, false);
          main.appendChild(card);
        }
      })
      .catch((error) => console.error(error));
  }
  

function getColor(vote) {
    if(vote>= 8){
        return 'green';
    } else if(vote >= 5){
        return "orange";
    } else{
        return 'red';
    }
}

    let searchButton = document.querySelector("input[type='submit']");
    searchButton.addEventListener("click", (event) => {
      event.preventDefault();
      let searchInput = document.querySelector("#usrinput");
      const query = searchInput.value;
      console.log(API_KEY);
      console.log(SEARCH_URL);
      const url = SEARCH_URL+'&query='+query;
      searchMovies(url);
});
