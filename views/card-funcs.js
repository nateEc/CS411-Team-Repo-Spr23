export { createCardElement, handleFavoriteButtonClick, userFavorites, fetchUserFavorites, fetchMovieDetailsById };

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
    favoriteButton.textContent = card.isFavorite ? "Remove from Favorites" : "Add to Favorites";
    favoriteButton.className = "favorite";
    favoriteButton.id = id;
    favoriteButton.onclick = () => {
      handleFavoriteButtonClick(card, favoriteButton, id, title);
    };
    favoriteButton.classList.add("favorite-button");
    if (isFavorite) {
        favoriteButton.classList.add("favorite-button-profile");
    }

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

//will need to change the api key to somewhere protected !!!!!!!!!!!!!!!!!!!!!!
const API_KEY = "api_key=b9ab825c6c7df22351f2927746188d59";
const BASE_URL = 'https://api.themoviedb.org/3';
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
