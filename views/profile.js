import { createCardElement, handleFavoriteButtonClick, userFavorites, fetchUserFavorites, fetchMovieDetailsById } from './card-funcs.js';

const mainElement = document.querySelector("main");
const favoritesContainer = document.getElementById("favorite-movies");
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


async function displayFavoriteMovies(favoriteMovies) {
  const favoritesContainer = document.getElementById("favorites");

  console.log("Favorite movies:", favoriteMovies); // Debugging statement

  for (const movieId of favoriteMovies) {
    console.log("Fetching movie with ID:", movieId); // Debugging statement

    const movieData = await fetchMovieDetailsById(movieId);

    console.log("Movie data:", movieData); // Debugging statement

    const { title, poster_path, vote_average, overview } = movieData;
    const card = createCardElement(title, IMG_URL + poster_path, vote_average, overview, movieId, true);
    favoritesContainer.appendChild(card);

    const favoriteButton = card.querySelector(".favorite-button-profile");
    favoriteButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const userIdElement = document.getElementById("userId");
      if (userIdElement) {
        const userId = userIdElement.value;
        // await handleFavoriteButtonClick(card, favoriteButton, movieId, title);

        try {
            const response = await fetch(`/api/favorites/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movieId: id, isFavorite: false })
            });


            if (response.ok) {
                console.log(`The movie ${title} has a favorite status of ${card.isFavorite}`);
            } else {
                console.error('Error updating user favorites');
            }
        } catch (error) {
            console.error('Error making request to update user favorites:', error);
        }
        await fetchUserFavorites(userId);
        card.remove();
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", async function call() {
  const userIdElement = document.getElementById("userId");
  if (userIdElement) {
    const userId = userIdElement.value;
    await fetchUserFavorites(userId);
    console.log("Displaying favorite movies:", userFavorites); // Debugging statement
    displayFavoriteMovies(userFavorites);
  }
});
