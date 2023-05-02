import {BASE_URL, API_KEY} from './script.js';
export { createCardElement, handleFavoriteButtonClick, userFavorites, fetchUserFavorites, fetchMovieDetailsById };
import {getTrailerUrl} from './youtube.js';


async function handleFavoriteButtonClick(event, card, favoriteButton, id, title, callback) {
  if (callback) {
    event.preventDefault();
  }
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
  if (callback) {
    callback(card.isFavorite);
    console.log('callback');
  } else {
    console.log('null callback');
  }
}

async function makeUrl(title) {
  console.log('button clicked');
  const url = await getTrailerUrl(title)
  console.log('the url is: '+ url);
  window.open(url)
}

function createCardElement(title, posterUrl, rating, overview, id, isFavorite, handleClick) {
    if (id === undefined) {
        console.error('Undefined movie ID:', id);
        return;
    }
    const movieIsFavorite = userFavorites
          .filter(favorite => favorite !== undefined)
          .map(String)
          .includes(id.toString());

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
    favoriteButton.classList.add("favorite-button");
    if (isFavorite) {
        favoriteButton.classList.add("favorite-button-profile");
    }
    favoriteButton.textContent = card.isFavorite ? "Remove from Favorites" : "Add to Favorites";
    favoriteButton.id = id;

    favoriteButton.onclick = (event) => {
      handleFavoriteButtonClick(event, card, favoriteButton, id, title, handleClick);
    };
    cardBody.appendChild(favoriteButton);

    return card;
  }

let userFavorites = [];
async function fetchUserFavorites(userId) {
  try {
    const response = await fetch(`/api/favorites/${userId}`);
    const data = await response.json();
    userFavorites = data.favoriteMovies;
  } catch (error) {
    console.error('Error fetching user favorites:', error);
  }
}

//fetch unique movie by id
async function fetchMovieDetailsById(movieId) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?${API_KEY}&language=en-US`);
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error('Error fetching movie details by ID:', error);
    return null;
  }
}
