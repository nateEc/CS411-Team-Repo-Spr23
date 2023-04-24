import { createCardElement, userFavorites, fetchUserFavorites } from './card-funcs.js';

const userId = '<%= user.googleId %>';
const favoritesContainer = document.getElementById("favorite-movies");

function call() {
    await fetchUserFavorites();
    displayFavoriteMovies();
}

function displayFavoriteMovies() {
    for (const movie of userFavorites) {
        const { title, posterUrl, rating, overview, id, isFavorite } = movie;
        const card = createCardElement(title, posterUrl, rating, overview, id, isFavorite);
        favoritesList.appendChild(card);
    }
}


document.addEventListener('DOMContentLoaded', call);
