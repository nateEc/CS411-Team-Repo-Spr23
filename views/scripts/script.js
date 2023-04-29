import {TMDB_API} from "../../config/config.js";
export const API_KEY = "api_key="+TMDB_API;
export const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?'+API_KEY;
const POP_URL = BASE_URL + '/movie/popular?'+API_KEY;
import { createCardElement, fetchUserFavorites } from './card-funcs.js';

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

const userId = document.getElementById('userId') ? document.getElementById('userId').value : null;
await fetchUserFavorites(userId);

function searchMovies(url) {
    const resultsList = document.querySelector(".result");
    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        main.innerHTML = '';
        for (const result of data.results.slice(0, 8)) {
          const { title, poster_path, vote_average, overview, id } = result;
          const card = createCardElement(title, IMG_URL + poster_path, vote_average, overview, id, false, null);
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
