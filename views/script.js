const API_KEY = "api_key=b9ab825c6c7df22351f2927746188d59";
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?'+API_KEY;
import {getTrailerUrl} from './youtube.js';


const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const userId = document.getElementById('userId') ? document.getElementById('userId').value : null;

let userFavorites = [];
async function fetchUserFavorites() {
  try {
    const response = await fetch(`/api/favorites/${userId}`);
    const data = await response.json();
    userFavorites = data.favoriteMovies;
  } catch (error) {
    console.error('Error fetching user favorites:', error);
  }
}
fetchUserFavorites();

async function makeUrl(title) {
  console.log('button clicked');
  const url = await getTrailerUrl(title)
  console.log('the url is: '+ url);
  window.open(url)
}

async function handleFavoriteButtonClick(card, favoriteButton, id, title) {
  card.isFavorite = !card.isFavorite;
  favoriteButton.textContent = card.isFavorite ? "Remove from Favorites" : "Add to Favorites";

  try {
    const response = await fetch(`/api/favorites/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId: id, isFavorite: card.isFavorite })
    });

    if (response.ok) {
      console.log(`The movie ${title} has a favorite status of ${card.isFavorite}`);
    } else {
      console.error('Error updating user favorites');
    }
  } catch (error) {
    console.error('Error making request to update user favorites:', error);
  }
}

function createCardElement(title, posterUrl, rating, overview, id, isFavorite) {
    const movieIsFavorite = userFavorites.includes(id.toString());

    const card = document.createElement("div");
    card.className = "card";
    card.isFavorite = movieIsFavorite;//uses the db info to check if the movie is already favorited

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

    const knowMoreButton = document.createElement("button");
    knowMoreButton.textContent = "Know More";
    knowMoreButton.className = "know-more";
    knowMoreButton.id = id;
    knowMoreButton.onclick = () => makeUrl(title);
    cardBody.appendChild(knowMoreButton);

    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = card.isFavorite ? "Remove from Favorites" : "Add to Favorites";
    favoriteButton.className = "favorite";
    favoriteButton.id = id;
    favoriteButton.onclick = () => {
      handleFavoriteButtonClick(card, favoriteButton, id, title);
    };
    cardBody.appendChild(favoriteButton);
  
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
          // const trailerUrl = await getTrailerUrl(title);
          // console.log(trailerUrl);
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
    searchButton.addEventListener("click", (event) => { //searchButton.addEventListener("submit", async (event) => {
    event.preventDefault();
    let searchInput = document.querySelector("#usrinput");
    const query = searchInput.value;
    console.log(API_KEY);
    console.log(SEARCH_URL);
    const url = SEARCH_URL+'&query='+query;
    searchMovies(url);
});
