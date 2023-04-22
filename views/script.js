const API_KEY = "api_key=b9ab825c6c7df22351f2927746188d59";
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?'+API_KEY;
import {getTrailerUrl} from './youtube.js';


const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

function createCardElement(title, posterUrl, rating, overview, trailerUrl, id) {
    const card = document.createElement("div");
    card.className = "card";
  
    const poster = document.createElement("img");
    poster.src = posterUrl;
    poster.alt = `${title} poster`;
    poster.className = "card-img-top";
    card.appendChild(poster);
  
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);
  
    const cardTitle = document.createElement("h2");
    cardTitle.textContent = title;
    cardTitle.className = "card-title";
    cardBody.appendChild(cardTitle);
  
    const cardText = document.createElement("p");
    cardText.textContent = `Rating: ${rating}\nSummary: ${overview}`;
    cardText.className = "card-summary";
    cardBody.appendChild(cardText);
  
    const knowMoreButton = document.createElement("button");
    knowMoreButton.textContent = "Know More";
    knowMoreButton.className = "know-more";
    knowMoreButton.id = id;
    knowMoreButton.onclick = () => window.open(trailerUrl);
    cardBody.appendChild(knowMoreButton);
  
    return card;
  }
  

function searchMovies(url) {
    const resultsList = document.querySelector(".result");
    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        main.innerHTML = '';
        for (const result of data.results.slice(0, 8)) {
          const { title, poster_path, vote_average, overview, id } = result;
          const trailerUrl = await getTrailerUrl(title);
          const card = createCardElement(title, IMG_URL + poster_path, vote_average, overview, trailerUrl, id);
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
    searchButton.addEventListener("click", (event) => { //searchButton.addEventListener("submit", async (event) => {
    event.preventDefault();
    let searchInput = document.querySelector("#usrinput");
    const query = searchInput.value;
    console.log(API_KEY);
    console.log(SEARCH_URL);
    const url = SEARCH_URL+'&query='+query;
    searchMovies(url);
});