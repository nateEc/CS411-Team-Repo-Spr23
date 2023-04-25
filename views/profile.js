import { createCardElement, handleFavoriteButtonClick, userFavorites, fetchUserFavorites, fetchMovieDetailsById } from './card-funcs.js';

const mainElement = document.querySelector("main");
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const userIdElement = document.getElementById("userId");

async function displayFavoriteMovies(favoriteMovies,userId) {
  const favoritesContainer = document.getElementById("favorites");

  for (const movieId of favoriteMovies) {
    const movieData = await fetchMovieDetailsById(movieId);
    const { title, poster_path, vote_average, overview } = movieData;
    const card = createCardElement(title, IMG_URL + poster_path, vote_average, overview, movieId, true, (isFavorite) => {
      if (!isFavorite) {
        card.remove();
      }
    });

    //const favoriteButton = card.getElementsByClassName("favorite-button favorite-button-profile")[0];
    // favoriteButton.addEventListener("click", async (event) => {
    //   // event.preventDefault();

    //   await handleFavoriteButtonClick(event, card, favoriteButton, movieId, title, async (isFavorite) => {
    //     if (!isFavorite) {
    //       card.remove();
    //       await fetchUserFavorites(userId);
    //     }
    //   });
    // });
    favoritesContainer.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", async function call() {
  if (userIdElement) {
    const userId = userIdElement.value;
    await fetchUserFavorites(userId);
    displayFavoriteMovies(userFavorites,userId);
  }
});
